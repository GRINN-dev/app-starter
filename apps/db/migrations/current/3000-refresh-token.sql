-- CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
-- CREATE TYPE publ.jwt_token AS (
--   role TEXT,
--   sub UUID,
--   exp BIGINT
-- );
-- COMMENT ON TYPE publ.jwt_token IS 'The JWT type PgJWTPlugin will sign when PostGraphile encounters it. sub means user id. Also used by generate_token_plaintext()';
CREATE FUNCTION priv.generate_token_plaintext(email TEXT, password TEXT) RETURNS publ.jwt AS $$
DECLARE var_sec priv.user_secrets;
BEGIN
SELECT sec.* into var_sec
from priv.user_secrets as sec
where sec.user_id = (
    select user_id
    from publ.user_emails as usr
    where usr.email = $1
      and usr.is_verified is true
  );
IF var_sec.password_hash = crypt(password, var_sec.password_hash) THEN RETURN(
  var_sec.user_id,
  extract(
    epoch
    from (now() + interval '2 days')
  )
)::publ.jwt;
ELSE RETURN NULL;
END IF;
END;
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;
COMMENT ON FUNCTION priv.generate_token_plaintext IS '@omit\nModified version of authenticate() as seen in the docs.\n\nDeliberately excluded from GQL and public schema. To login please call authenticate() as defined in `refreshTokenPlugin`.';