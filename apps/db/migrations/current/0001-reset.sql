--! Message: MEP grinnPass

/*
 * Graphile Migrate will run our `current/...` migrations in one batch. Since
 * this is our first migration it's defining the entire database, so we first
 * drop anything that may have previously been created
 * (publ/priv) so that we can start from scratch.
 */
drop schema if exists publ cascade;
drop schema if exists priv cascade;
