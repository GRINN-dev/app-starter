/*
 * A user account may be created explicitly via the GraphQL `register` mutation
 * (which calls `really_create_user` below), or via OAuth (which, via
 * `installPassportStrategy.ts`, calls link_or_register_user below, which may
 * then call really_create_user). Ultimately `really_create_user` is called in
 * all cases to create a user account within our system, so it must do
 * everything we'd expect in this case including validating username/password,
 * setting the password (if any), storing the email address, etc.
 */

drop function if exists priv.really_create_user;
create function priv.really_create_user(
  first_name text,
  last_name text,
  email text,
  email_is_verified bool,
  password text default null,
  avatar_url text default null
) returns publ.users as $$
declare
  v_user publ.users;
begin
  if password is not null then
    perform priv.assert_valid_password(password);
  end if;
  if email is null then
    raise exception 'Email is required' using errcode = 'MODAT';
  end if;

  -- Insert the new user
  insert into publ.users (first_name, last_name, avatar_url) values
    (first_name, last_name, null)
    returning * into v_user;

	-- Add the user's email
  insert into publ.user_emails (user_id, email, is_verified, is_primary)
  values (v_user.id, email, email_is_verified, email_is_verified);

  -- Store the password
  if password is not null then
    update priv.user_secrets
    set password_hash = crypt(password, gen_salt('bf'))
    where user_id = v_user.id;
  end if;

  -- Refresh the user
  select * into v_user from publ.users where id = v_user.id;

  return v_user;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;

comment on function priv.really_create_user(first_name text, last_name text, email text, email_is_verified bool, password text, avatar_url text) is
  E'Creates a user account. All arguments are optional, it trusts the calling method to perform sanitisation.';

drop function if exists publ.register_with_login_password;
create function publ.register_with_login_password(
  first_name text,
  last_name text,
  email text,
  password text,
  avatar_url text default null
) returns void as $$
declare
  v_user publ.users;
begin
  v_user := priv.really_create_user(first_name, last_name, email, false, password, null);
  return;
end;
$$ language plpgsql security definer volatile set search_path to pg_catalog, public, pg_temp;
-- todo : comment on function
