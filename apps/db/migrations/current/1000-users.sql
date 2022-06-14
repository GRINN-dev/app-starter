/*

 * The users table stores (unsurprisingly) the users of our application. You'll
 * notice that it does NOT contain private information such as the user's
 * password or their email address; that's because the users table is seen as
 * public - anyone who can "see" the user can see this information.
 *
 * The author sees `is_admin` and `is_verified` as public information; if you
 * disagree then you should relocate these attributes to another table, such as
 * `user_secrets`.
 */
drop function if exists 
 publ.current_user,
 publ.current_user_is_admin,
 priv.tg_user_secrets__insert_with_user,
 publ.users_has_password
 cascade
;

drop table if exists
  priv.user_secrets,
  publ.users
  cascade; 

create table publ.users (
  id uuid primary key default gen_random_uuid(),
  first_name text not null  check(length(first_name) between 2 and 60 ),
  last_name text not null  check(length(last_name) between 2 and 60),
  avatar_url text check(avatar_url ~ '^https?://[^/]+'),
  is_admin boolean not null default false,
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table publ.users enable row level security;

-- Users are publicly visible, like on GitHub, Twitter, Facebook, Trello, etc.
create policy select_all on publ.users for select to :DATABASE_VISITOR using (true);
-- You can only update yourself.
create policy update_self on publ.users for update using (id = publ.current_user_id());
grant select on publ.users to :DATABASE_VISITOR;
-- NOTE: `insert` is not granted, because we'll handle that separately
grant update(first_name, last_name, avatar_url) on publ.users to :DATABASE_VISITOR;
-- NOTE: `delete` is not granted, because we require confirmation via request_account_deletion/confirm_account_deletion

comment on table publ.users is
  E'A user who can log in to the application.';

comment on column publ.users.id is
  E'Unique identifier for the user.';
comment on column publ.users.first_name is
  E'Public-facing firstname of the user.';
comment on column publ.users.last_name is
  E'Public-facing lastname of the user.';
comment on column publ.users.avatar_url is
  E'Optional avatar URL.';
comment on column publ.users.is_admin is
  E'If true, the user has elevated privileges.';

create trigger _100_timestamps
  before insert or update on publ.users
  for each row
  execute procedure priv.tg__timestamps();

-- Returns the current user; this is a "custom query" function; see:
-- https://www.graphile.org/postgraphile/custom-queries/
-- So this will be queryable via GraphQL as `{ currentUser { ... } }`
create function publ.current_user() returns publ.users as $$
  select users.* from publ.users where id = publ.current_user_id();
$$ language sql stable;
comment on function publ.current_user() is
  E'The currently logged in user (or null if not logged in).';

-- 
create function publ.current_user_is_admin() returns boolean as $$
  select users.is_admin from publ.users where id = publ.current_user_id();
$$ language sql stable;
comment on function publ.current_user() is
  E'The currently logged in user is admin (or null if not logged in).';


-- The users table contains all the public information, but we need somewhere
-- to store private information. In fact, this data is so private that we don't
-- want the user themselves to be able to see it - things like the bcrypted
-- password hash, timestamps of recent login attempts (to allow us to
-- auto-protect user accounts that are under attack), etc.
create table priv.user_secrets (
  user_id uuid not null primary key references publ.users on delete cascade,
  password_hash text,
  last_login_at timestamptz not null default now(),
  failed_password_attempts int not null default 0,
  first_failed_password_attempt timestamptz,
  reset_password_token text,
  reset_password_token_generated timestamptz,
  failed_reset_password_attempts int not null default 0,
  first_failed_reset_password_attempt timestamptz,
  delete_account_token text,
  delete_account_token_generated timestamptz
);

-- user_id : ref utilisateur uuid
-- password_hash : mdp crypté pour ne pas être lu en clair
-- last_login_at : date de dernière connexion
-- failed_password_attempts : nb de tentatives de connexions échouées - temporiser les éventuels users malveillants
-- first_failed_password_attempt : date du premier échec
-- reset_password_token : token pour re-création d'un mdp
-- reset_password_token_generated : date de création du token
-- failed_reset_password_attempts : 
-- first_failed_reset_password_attempt : 
-- delete_account_token : token pour suppression compte
-- delete_account_token_generated : date de création du token. si la date est trop vieille, rien ne se passera.

alter table priv.user_secrets enable row level security;
comment on table priv.user_secrets is
  E'The contents of this table should never be visible to the user. Contains data mostly related to authentication.';

/*
 * When we insert into `users` we _always_ want there to be a matching
 * `user_secrets` entry, so we have a trigger to enforce this:
 */
create function priv.tg_user_secrets__insert_with_user() returns trigger as $$
begin
  insert into priv.user_secrets(user_id) values(NEW.id);
  return NEW;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;

create trigger _500_insert_secrets
  after insert on publ.users
  for each row
  execute procedure priv.tg_user_secrets__insert_with_user();

comment on function priv.tg_user_secrets__insert_with_user() is
  E'Ensures that every user record has an associated user_secret record.';

/*
 * Because you can register with username/password or using OAuth (social
 * login), we need a way to tell the user whether or not they have a
 * password. This is to help the UI display the right interface: change
 * password or set password.
 */
 -- this is a computed column, see doc : https://www.graphile.org/postgraphile/computed-columns/
create function publ.users_has_password(u publ.users) returns boolean as $$
  select (password_hash is not null) from priv.user_secrets where user_secrets.user_id = u.id and u.id = publ.current_user_id();
$$ language sql stable security definer set search_path to pg_catalog, public, pg_temp;