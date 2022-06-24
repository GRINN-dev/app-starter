/*
 * In addition to logging in with username/email and password, users may use
 * other authentication methods, such as "social login" (OAuth) with GitHub,
 * Twitter, Facebook, etc. We store details of these logins to the
 * user_authentications and user_authentication_secrets tables.
 *
 * The user is allowed to delete entries in this table (which will unlink them
 * from that service), but adding records to the table requires elevated
 * privileges (it's managed by the `installPassportStrategy.ts` middleware,
 * which calls out to the `priv.link_or_register_user` database
 * function).
 */
drop table if exists publ.user_authentications cascade;
create table publ.user_authentications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references publ.users on delete cascade,
  service text not null,
  identifier text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint uniq_user_authentications unique(service, identifier)
);

-- Make it efficient to find all the authentications for a particular user.
create index on publ.user_authentications(user_id);

-- Keep created_at and updated_at up to date.
create trigger _100_timestamps
  before insert or update on publ.user_authentications
  for each row
  execute procedure priv.tg__timestamps();

comment on table publ.user_authentications is
  E'Contains information about the login providers this user has used, so that they may disconnect them should they wish.';
comment on column publ.user_authentications.service is
  E'The login service used, e.g. `twitter` or `github`.';
comment on column publ.user_authentications.identifier is
  E'A unique identifier for the user within the login service.';
comment on column publ.user_authentications.details is
  E'Additional profile details extracted from this login method';

-- Users may view and delete their social logins.
create policy select_own on publ.user_authentications for select using (user_id = publ.current_user_id());
create policy delete_own on publ.user_authentications for delete using (user_id = publ.current_user_id());
-- TODO: on delete, check this isn't the last one, or that they have a verified
-- email address or password. For now we're not worrying about that since all
-- the OAuth providers we use verify the email address.

grant select on publ.user_authentications to :DATABASE_VISITOR;
grant delete on publ.user_authentications to :DATABASE_VISITOR;

-- This table contains secret information for each user_authentication; could
-- be things like access tokens, refresh tokens, profile information. Whatever
-- the passport strategy deems necessary.
create table priv.user_authentication_secrets (
  user_authentication_id uuid not null primary key references publ.user_authentications on delete cascade,
  details jsonb not null default '{}'::jsonb
);
alter table priv.user_authentication_secrets enable row level security;


/*
 * The `register_user` function is called by `link_or_register_user` when there
 * is no matching user to link the login to, so we want to register the user
 * using OAuth or similar credentials.
 */

create function priv.register_user(
  f_service character varying,
  f_identifier character varying,
  f_profile json,
  f_auth_details json,
  f_email_is_verified boolean default false
) returns publ.users as $$
declare
  v_user publ.users;
  v_email citext;
  v_name text;
  v_username citext;
  v_avatar_url text;
  v_user_authentication_id uuid;
begin
  -- Extract data from the user’s OAuth profile data.
  v_email := f_profile ->> 'email';
  v_name := f_profile ->> 'name';
  v_username := f_profile ->> 'username';
  v_avatar_url := f_profile ->> 'avatar_url';

  -- Sanitise the username, and make it unique if necessary.
  if v_username is null then
    v_username = coalesce(v_name, 'user');
  end if;
  v_username = regexp_replace(v_username, '^[^a-z]+', '', 'gi');
  v_username = regexp_replace(v_username, '[^a-z0-9]+', '_', 'gi');
  if v_username is null or length(v_username) < 3 then
    v_username = 'user';
  end if;
  select (
    case
    when i = 0 then v_username
    else v_username || i::text
    end
  ) into v_username from generate_series(0, 1000) i
  where not exists(
    select 1
    from publ.users
    where users.username = (
      case
      when i = 0 then v_username
      else v_username || i::text
      end
    )
  )
  limit 1;

  -- Create the user account
  v_user = priv.really_create_user(
    username => v_username,
    email => v_email,
    email_is_verified => f_email_is_verified,
    name => v_name,
    avatar_url => v_avatar_url
  );

  -- Insert the user’s private account data (e.g. OAuth tokens)
  insert into publ.user_authentications (user_id, service, identifier, details) values
    (v_user.id, f_service, f_identifier, f_profile) returning id into v_user_authentication_id;
  insert into priv.user_authentication_secrets (user_authentication_id, details) values
    (v_user_authentication_id, f_auth_details);

  return v_user;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

comment on function priv.register_user(f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_email_is_verified boolean) is
  E'Used to register a user from information gleaned from OAuth. Primarily used by link_or_register_user';



/*
 * The `link_or_register_user` function is called from
 * `installPassportStrategy.ts` when a user logs in with a social login
 * provider (OAuth), e.g. GitHub, Facebook, etc. If the user is already logged
 * in then the new provider will be linked to the users account, otherwise we
 * will try to retrieve an existing account using these details (matching the
 * service/identifier or the email address), and failing that we will register
 * a new user account linked to this service via the `register_user` function.
 *
 * This function is also responsible for keeping details in sync with the login
 * provider whenever the user logs in; you'll see this in the `update`
 * statemets towards the bottom of the function.
 */

create function priv.link_or_register_user(
  f_user_id uuid,
  f_service character varying,
  f_identifier character varying,
  f_profile json,
  f_auth_details json
) returns publ.users as $$
declare
  v_matched_user_id uuid;
  v_matched_authentication_id uuid;
  v_email citext;
  v_name text;
  v_avatar_url text;
  v_user publ.users;
  v_user_email publ.user_emails;
begin
  -- See if a user account already matches these details
  select id, user_id
    into v_matched_authentication_id, v_matched_user_id
    from publ.user_authentications
    where service = f_service
    and identifier = f_identifier
    limit 1;

  if v_matched_user_id is not null and f_user_id is not null and v_matched_user_id <> f_user_id then
    raise exception 'A different user already has this account linked.' using errcode = 'TAKEN';
  end if;

  v_email = f_profile ->> 'email';
  v_name := f_profile ->> 'name';
  v_avatar_url := f_profile ->> 'avatar_url';

  if v_matched_authentication_id is null then
    if f_user_id is not null then
      -- Link new account to logged in user account
      insert into publ.user_authentications (user_id, service, identifier, details) values
        (f_user_id, f_service, f_identifier, f_profile) returning id, user_id into v_matched_authentication_id, v_matched_user_id;
      insert into priv.user_authentication_secrets (user_authentication_id, details) values
        (v_matched_authentication_id, f_auth_details);
      perform graphile_worker.add_job(
        'user__audit',
        json_build_object(
          'type', 'linked_account',
          'user_id', f_user_id,
          'extra1', f_service,
          'extra2', f_identifier,
          'current_user_id', publ.current_user_id()
        ));
    elsif v_email is not null then
      -- See if the email is registered
      select * into v_user_email from publ.user_emails where email = v_email and is_verified is true;
      if v_user_email is not null then
        -- User exists!
        insert into publ.user_authentications (user_id, service, identifier, details) values
          (v_user_email.user_id, f_service, f_identifier, f_profile) returning id, user_id into v_matched_authentication_id, v_matched_user_id;
        insert into priv.user_authentication_secrets (user_authentication_id, details) values
          (v_matched_authentication_id, f_auth_details);
        perform graphile_worker.add_job(
          'user__audit',
          json_build_object(
            'type', 'linked_account',
            'user_id', f_user_id,
            'extra1', f_service,
            'extra2', f_identifier,
            'current_user_id', publ.current_user_id()
          ));
      end if;
    end if;
  end if;
  if v_matched_user_id is null and f_user_id is null and v_matched_authentication_id is null then
    -- Create and return a new user account
    return priv.register_user(f_service, f_identifier, f_profile, f_auth_details, true);
  else
    if v_matched_authentication_id is not null then
      update publ.user_authentications
        set details = f_profile
        where id = v_matched_authentication_id;
      update priv.user_authentication_secrets
        set details = f_auth_details
        where user_authentication_id = v_matched_authentication_id;
      update publ.users
        set
          name = coalesce(users.name, v_name),
          avatar_url = coalesce(users.avatar_url, v_avatar_url)
        where id = v_matched_user_id
        returning  * into v_user;
      return v_user;
    else
      -- v_matched_authentication_id is null
      -- -> v_matched_user_id is null (they're paired)
      -- -> f_user_id is not null (because the if clause above)
      -- -> v_matched_authentication_id is not null (because of the separate if block above creating a user_authentications)
      -- -> contradiction.
      raise exception 'This should not occur';
    end if;
  end if;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

comment on function priv.link_or_register_user(f_user_id uuid, f_service character varying, f_identifier character varying, f_profile json, f_auth_details json) is
  E'If you''re logged in, this will link an additional OAuth login to your account if necessary. If you''re logged out it may find if an account already exists (based on OAuth details or email address) and return that, or create a new user account if necessary.';
