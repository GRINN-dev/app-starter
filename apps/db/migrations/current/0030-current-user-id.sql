/*
 * TODO : write description for this function
 */
 drop function if exists publ.current_user_id cascade;
create function publ.current_user_id() returns uuid as $$
    select nullif(current_setting('jwt.claims.sub', true), '')::uuid;
$$ language sql stable;
comment on function publ.current_user_id() is
  E'Handy method to get the current user ID.';


