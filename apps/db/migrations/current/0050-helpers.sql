create or replace function publ.log(payload json) returns void as $$
begin
  perform graphile_worker.add_job('log', $1);
  return;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;
comment on function publ.log(payload json) is
  E'Function for debugging.';

-- execute procedure publ.log();