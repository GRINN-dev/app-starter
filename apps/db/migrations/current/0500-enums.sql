drop table if exists  publ.test_enum;
create table publ.test_enum (
  type text primary key,
  description text
);
comment on table publ.test_enum is E'@enum';

insert into publ.test_enum values
  ('READ', 'Pourra consulter les données'),
  ('EDIT', 'Pourra compléter les informations du dossier'),
  ('ADMIN', 'Pourra compléter les informations du dossier et gérer les accès au dossier');
