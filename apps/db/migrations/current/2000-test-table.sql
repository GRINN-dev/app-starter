drop table if exists publ.tests cascade;
create table publ.tests (
    id uuid not null default uuid_generate_v4() primary key unique, 
    test_string text not null,
    user_id uuid not null references publ.users on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
create index on publ.tests(user_id);
create index on publ.tests(test_string);




alter table publ.tests enable row level security;

create policy select_own
on publ.tests
for select
using(user_id = publ.current_user_id());

create policy insert_own
on publ.tests
for insert
with check (user_id = publ.current_user_id());

create policy update_own
on publ.tests
for update
using (user_id = publ.current_user_id())
with check (user_id = publ.current_user_id());

create policy admin_all
on publ.tests
for all
using (publ.current_user_is_admin())
with check (publ.current_user_is_admin());









grant select on publ.tests to :DATABASE_VISITOR;
grant delete on publ.tests to :DATABASE_VISITOR;

grant insert (test_string, user_id) on publ.tests to :DATABASE_VISITOR;
grant update (test_string, user_id) on publ.tests to :DATABASE_VISITOR;




create trigger _100_timestamps
before insert or update on publ.tests
for each row
execute procedure priv.tg__timestamps();



















drop function if exists publ.create_test cascade;
create function publ.create_test(user_id uuid default publ.current_user_id(), test_string text default 'jojo') returns publ.tests as $$
declare
    v_test publ.tests;
begin
    insert into publ.tests (test_string, user_id) values ($2, $1)
    returning * into v_test;

    perform graphile_worker.add_job('log', row_to_json(v_test));

    perform graphile_worker.add_job('send_test_creation_email', json_build_object(
        'email', (select email from publ.user_emails as ue where ue.user_id = $1 and ue.is_primary = true),
        'test_string', $2
    ) );
    
    return v_test;
end;
$$ language plpgsql volatile security definer;
grant execute on function publ.create_test to :DATABASE_VISITOR;


drop function if exists publ.select_users_named_louis cascade;
create function publ.select_users_named_louis() returns publ.users as $$
    select * from publ.users where first_name = 'Louis';
$$ language sql stable;
grant execute on function publ.select_users_named_louis to :DATABASE_VISITOR;


drop function if exists publ.users_full_name cascade;
create function publ.users_full_name(any_user publ.users) returns text as $$
    select any_user.first_name || ' ' || any_user.last_name;
$$ language sql stable;
grant execute on function publ.users_full_name to :DATABASE_VISITOR;