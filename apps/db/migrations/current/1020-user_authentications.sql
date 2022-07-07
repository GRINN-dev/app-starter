drop type if exists publ.jwt cascade;

-- create jwt type
create type publ.jwt as (
  sub uuid,
  exp bigint
);
