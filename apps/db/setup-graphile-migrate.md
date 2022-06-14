# db-step1-graphile-migrate

📚[Documentation](https://github.com/graphile/migrate)

# Monorepo

### .env

Compléter le **.env** à la racine du monorepo :

```
DATABASE_URL=postgres://db_owner:password@localhost:5432/dbname
SHADOW_DATABASE_URL=postgres://db_owner:password@localhost:5432/shadow_dbname

DATABASE_NAME=dbname
DATABASE_OWNER=db_owner
DATABASE_OWNER_PASSWORD=password
DATABASE_AUTHENTICATOR=db_authenticator
DATABASE_AUTHENTICATOR_PASSWORD=password
DATABASE_VISITOR=db_visitor
ROOT_DATABASE_URL=postgres://<user>:<password?>@localhost:5432/postgres
```

A la racine du monorepo, créer :

### scripts/installdb.js

Dans un dossier **scripts**, on créé le fichier **installdb.js** qui établira la connexion avec la base de données et créera les rôles.
On ajoutera également un processus enfant (module `child_process`) qui permettra à Node d’exécuter le processus principal en parallèle du processus enfant. Ce dernier aura pour but de lancer la commande shell `yarn gm reset --erase` sur laquelle on reviendra un peu plus tard.

### Modifier package.json

Dans les devDependencies, on ajoute `dotenv` et `pg`
Dans les scripts, on ajoute :

```json
"install:db": "yarn && node -r dotenv/config scripts/installdb",
// pour executer installdb.js on lancera la commande yarn install:db
// cette commande installe les packages non installés, va récupérer les variables
// d'environnement puis enfin execute le(s) processus du fichier
"gm": "yarn workspace db gm",
// fait référence au script "gm" que l'on ajoutera dans le package.json du
// workspace db
// pour les commandes de graphile-migrate
```

### Workspace : apps/db

On créé dans **apps** le dossier **db**. Pour l’initialiser : `yarn workspace db init -y`. On créé le **package.json**.

Dépendances :

```json
"dependencies": {
    "graphile-migrate": "^1.2.0"
},
"devDependencies": {
    "dotenv": "^16.0.0"
}
```

Les commandes principales de graphile-migrate :

```
graphile-migrate init : initialise un projet graphile-migrate en créant un
fichier .gmrc et un dossier migrations.

graphile-migrate watch : va executer les fichier du dossier current dans l'ordre.

graphile-migrate commit : déplace les fichiers du dossier current dans le dossier
committed et génère un fichier schema.sql.

graphile-migrate uncommit : annuler le dernier commit.

graphile-migrate reset : supprime et re-créé la base de données.
```

Scripts :

```json
"scripts": {
    "gm": "node -r ../../@grinn/config/env.js ./node_modules/.bin/graphile-migrate",
// ce script va récupérer les variables d'environnement puis graphile-migrate
// il utilise le fichier packages/config/env.js (cf : "Monorepo")
		"dev": "yarn gm watch",
// ce script fait référence au script précédent : "gm"
// depuis le workspace on pourra lancer le script yarn dev
// depuis la racine du monorepo on lancera yarn gm watch - ou yarn run dev (tous
// les workspaces en même temps)
},
```

### Initialiser le projet graphile-migrate

On lance le script `yarn gm init` (depuis la racine du monorepo ou dans le workspace **db**). On créé un fichier **.gmrc** puis un dossier **migrations** dans lequel se trouvent un dossier **current** et un dossier **committed**.

### Fichier .gmrc

_modifier l’affichage : cmd + k, m, puis “jsonc”_

```json
"placeholders": {
    ":DATABASE_VISITOR": "!ENV",
    ":DATABASE_AUTHENTICATOR": "!ENV",
    ":DATABASE_OWNER": "!ENV"
},

"afterReset": [
    "afterReset.sql",
],

"afterAllMigrations": [
    {
      "_": "command",
      "shadow": true,
      "command": "node scripts/dump-db"
    }
],
```

### Fichier migrations/afterReset.sql

Dans le dossier **migrations**, on créé le fichier **afterReset.sql**. Ce fichier est mentionné dans **.gmrc** dans le lifecycle hook “afterReset”. L’execution de ce fichier va créer les droits d’accès à la base de données et les extensions PostgreSQL.

Pour exécuter **afterReset.sql** on lance la commande `yarn gm reset --erase` qui a été mentionnée plus haut et a été intégrée comme processus enfant dans le fichier **installdb.js** à la racine du monorepo. Ce sera donc le script `yarn install:db` qui exécutera cette commande.

### Fichier scripts/dump-db.js

Dans le fichier **.gmrc**, on s’intéresse au troisième lifecycle hook : “afterAllMigrations”. On créé un dossier **scripts** puis un fichier **dump-db.js**. On utilise dans ce fichier à nouveau le module `child_process`. La commande qui est exécutée est la commande `pg_dump`. Elle génère un fichier **schema.sql** qui résulte des migrations. Cette commande sera exécutée avec le script `yarn gm commit -m “message”`.

### Dossier data à la racine du monorepo

On créé un dossier **data** à la racine du monorepo, dans lequel le fichier **schema.sql** qu’aura généré la commande `yarn gm commit -m “message”` viendra s’enregistrer.

### Fichiers dans le dossier current

Il s’agit de toutes les requêtes SQL qui vont permettre de créer les schémas, les droits, les tables, les fonctions, etc. Elles sont rigoureusement regroupées dans des fichiers dont la convention doit commencer par un nombre à 4 chiffres minimum. Ainsi, lorsqu’on lancera la commande `yarn gm watch` - ou `yarn dev` si on se trouve dans le workspace - les fichiers vont s’exécuter les uns après les autres.

### Chronologie des commandes :

Depuis la racine du monorepo

- `yarn install:db` (supprime & re-créé la base de données, les rôles, les droits d’accès à la base de données, les extensions PostgreSQL)
- `yarn gm watch` (exécute toutes les requêtes SQL : création de schémas, droits, tables, fonctions, etc.)
- `yarn gm commit -m “message”` (génère un fichier **schema.sql** et déplace tout le contenu de **current** vers **committed**)
- `yarn gm uncommit` (on annule notre dernier commit)
