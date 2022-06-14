insert into publ.users (id, first_name, last_name, avatar_url, is_admin) 
values ('839583d4-9a70-4f77-bd7a-0b8b8d4ac92d', 'Bat', 'Man', null, true);

insert into publ.user_emails (user_id, email, is_verified, is_primary)
values ('839583d4-9a70-4f77-bd7a-0b8b8d4ac92d', 'baptiste@obole.eu', true, true);

update priv.user_secrets
set password_hash = crypt('oboleobole', gen_salt('bf'))
where user_id = '839583d4-9a70-4f77-bd7a-0b8b8d4ac92d';

-- USERS FAKE DATA
select publ.register_with_login_password('Thib', 'DLC', 'test@obole.eu', 'oboleobole');
select publ.register_with_login_password('Luidgy', 'La Panica', 'luidgy@obole.eu', 'oboleobole');
update publ.user_emails set is_verified = true;

insert into publ.tests (user_id, test_string) values
    ('839583d4-9a70-4f77-bd7a-0b8b8d4ac92d', 'test'),
    ((select id from publ.users where first_name = 'Luidgy'), 'test');
