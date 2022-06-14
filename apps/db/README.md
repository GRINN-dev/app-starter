# DB

## Graphile Migrate

L'app `db` n'est pas une app destinée aux end-users, mais aux developpeurs pour faciliter le développement de l'API. EN effet, le choix de `postgraphile` implique de concevoir notre API _database first_ et donc de pouvoir travailler rapidement et souplement avec le SQL, notamment en phase de developpement. La [documentation de Graphile Migrate](https://github.com/graphile/migrate) est bien faite, ce document en rappel les principe de base et les spécificite2s dans notre contexte

### Configuration de Graphile Migrate

Lors du scaffoldind du projet nous avons installé et configuré Graphile migrate: `yarn workspace db add graphile-migrate` puis `yarn workspace db graphile-migrate init`. Il en résulte un fichier de configuration de type `jsonc` et la création d'un dossier `migrations` contenant deux sous-dossiers: `commited` dans lequel on retrouve toutes nos migrations et `current` dans lequel on a le SQL en cours d'élaboration.

Dans `.gmrc` se trouvent les option de connexion à la BDD, ainsi que les placeholders (interpolés par la suite avec les variables d'environnement) et les lifecycle hooks. Notamment le `afterReset` qui vient executer un bout de SQL aprés le reset de la BDD ou le `afterAllMigrations` qui exporte un schema SQL complet de la BDD apres chaque migration.

> **TIP:** pour avoir de la coloration syntaxique dans .gmrc, choisir `jsonc` conmme type de fichier

### Utilisation de Graphile Migrate en developpement

La commande `yarn dev` à la racine du monorepo execute dans ce package la commande `graphile-migrate watch`, qui vérifie si toutes les migration _commited_ ont bien été executées (si certaines ne l'on pas été, elle sont executé avant le démarrage du mode watch), puis lance le mode watch sur les fichiers SQL du dossier `current`. À chaque sauvegarde d'un fichier dans current, l'ensemble des fichiers dans `current` sont réexecutés, par ordre alphanumérique.

Les fichiers étants regulièrement ré-executés, il est imporanmt que deux executions successives donnent le même resultat, _i.e._ le code SQL doit étre indempotent. ex:

```sql
-- 👌
drop table if exists xxx cascade;
create table xxx (
    ...
);

-- 💀
create table xxx (
    ...
);
```

```sql
-- 👌
drop function if exists xxx cascade;
create function xxx (
    ...
);
-- 👌
create or replace function xxx (
    ...
);

-- 💀
create function xxx (
    ...
);
```

```sql
-- 👌
alter table xxx drop column if exists yyy;
alter table xxx create column yyy;


-- 💀 passe à tous les coups sans erreurs mais pas indempotent
alter table xxx create column if not exists yyy;
```

### Commit et migration

Lorsque le SQL dans current est pret pour une mise en production, il faut le commit en lançant à la racine `yarn workspace db graphile-migrate commit -m "mon message de commit". L'ensemble des fichiers de current se trouvent alors rassemblés dans un fichier de migration versionné et déplacé dans le dossier commited. Il est possible de "uncommit" la derniere migration pour la remodifier, mais pas de la rollback. Pour cela il faut creer une nouvelle migration.

Lorsqu'un commit est prét à etre migré, on le migre via `yarn workspace db graphile-migrate migrate`. A ce moment, le fichier est migré sur la base de données correspondant aux variables d'environnement données.

## Particularités de la BDD

### Schémas

On utilise deux schémas principaux pour stocker nos données: `publ` dont les données peuvent être exposées _via_ l'API et `priv` dont les données ne sont pas accessibles directement. C'est ici que nous stockons les données confidentielles ou nécessaires uniquemenbt au bon fonctionnement de l'API. Pour creer, modifier, selectionner un objet dans un schema, on le prefix par le nom du schema:

```sql
 select * from publ.users:
```

D'autres schémas sont présents, générés automatiquemt:

- `public`, le schéma par defaut dans Postgres, on ne pas y toucher
- `graphile-worker`, utilisé par `@grinn/workers` pour scheduler ses jobs
- `graphile-migrate`, qui garde en mémoire les migrations commit pour s'assurer qu'on ne les commits pas deux fois et que la chaine des migrations est intègre,
- `postgraphile-watch`, qui installe des fixtures permettant le mode watch dans `@grinn/server`

### Création d'une nouvelle entité

Le déroulé pour la création d'une nouvelle table est généralement le suivant:

- création de la table (de manière indempotente), à l'aide du snippet `table`
- création des indexes nécessaires
- mise en place du trigger `tg__timestamp` pour assurer l'intégrité des champs date
- création des permissions (RBAC)
  - les grants SELECT et DELETE au niveau de la table
  - les grants INSERT et UPDATE au niveau des colonnes
- Activation des row level securities (RLS)
- création des policies pour gérer l'accès grannulaire aux données
- Enfin, dans `@grinn/server/postgraphile.tags.jsonc`, on complete la documentation et les _smart tags_ liés à l'entité nouvellement créée
