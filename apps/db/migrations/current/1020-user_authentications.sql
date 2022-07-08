drop type if exists publ.jwt cascade;

-- create jwt type
create type publ.jwt as (
  sub uuid,
  exp bigint
);

drop function if exists publ.authenticate;
create function publ.authenticate(email text, password text) returns publ.jwt as $$
declare
  v_secret priv.user_secrets;
begin
  select sec.* into v_secret
  from priv.user_secrets as sec
  where sec.user_id = (select user_id from publ.user_emails as usr where usr.email = $1 and usr.is_verified is true);
  -- Dans la variable v_secret on vient stocker les infos de l'utilisateur qui souhaite s'authentifier.
  -- Pour stocker les bonnes infos, on cherche à trouver un user_id dans user_secrets
  -- qui correspond au user_id dans user_emails dont l'email correspond et dont ce dernier a été vérifié.

  if v_secret is null then 
    raise exception 'User not found or email not verified' using errcode='NTFND';
  end if;

  if v_secret.password_hash = crypt(password, v_secret.password_hash) then
    return (v_secret.user_id, extract(epoch from (now() + interval '2 days')))::publ.jwt;
  else
  raise exception 'Invalid credentials' using errcode='CREDS';
    return null;
  end if;
end;
$$ language plpgsql security definer volatile set search_path to pg_catalog, public, pg_temp;