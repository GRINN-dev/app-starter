drop table if exists publ.payout cascade;
create table publ.payout (
    id uuid not null default uuid_generate_v4() primary key unique, 
    payout_id text not null,
    total_amount integer not null,
    currency_code VARCHAR not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index on publ.payout(payout_id);
-- create index on publ.payout(total_amount);
-- create index on publ.payout(currency_code);

alter table publ.payout enable row level security;

grant select on publ.payout to :DATABASE_VISITOR;
grant delete on publ.payout to :DATABASE_VISITOR;

-- create policy select_own
-- on publ.payout
-- for select
-- using(true);

create policy insert_own
on publ.payout
for insert;
-- with check (true);

create policy update_own
on publ.payout
for update;
-- using (true)
-- with check (true);

-- create policy admin_all
-- on publ.payout
-- for all
-- using (true)
-- with check (true);


grant insert (payout_id, total_amount, currency_code) on publ.payout to :DATABASE_VISITOR;
grant update (payout_id, total_amount, currency_code) on publ.payout to :DATABASE_VISITOR;

create trigger _100_timestamps
before insert or update on publ.payout
for each row
execute procedure priv.tg__timestamps();