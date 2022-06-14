# db-step2-graphile-worker

📚[Documentation](https://github.com/graphile/worker)

# Monorepo

A la racine du monorepo :

### Modifier package.json

Dans les scripts :

```json
"gw": "yarn workspace workers"
```

### Workspace : apps/workers

On créé dans **apps** le dossier **workers**. Pour l’initialiser : `yarn gw init -y`. On créé le **package.json**.

### package.json

Dépendances :

```json
"dependencies": {
    "graphile-worker": "^0.12.2"
},
"devDependencies": {
    "nodemon": "^2.0.15",
    "typescript": "^4.5.5"
}
```

Scripts :

```json
"scripts": {
    "build": "tsc",
    "start": "node -r ../../@grinn/config/env.js dist/index.js",
    "dev": "nodemon -r ../../@grinn/config/env.js dist/index.js"
// il utilise le fichier packages/config/env.js (cf : "Monorepo")
},
```

### Projet Typescript

`yarn tsc --init` (dans la racine du workspace) - ou `yarn gw tsc --init` (racine du monorepo) : on créé le **tsconfig.json**.

### tsconfig.json

```json
"rootDir": "./src"
"outDir": "./dist"
```

### src/index.ts

On créé un dossier **src** (= c’est un projet Typescript) dans lequel on créé un fichier **index.ts**.
Lorsqu’on exécutera le script `yarn gw build` un dossier **dist** sera généré avec un fichier **index.js**.

```tsx
import { run } from "graphile-worker";

const main = async () => {
  const runner = await run({
    // mise en place d'un runner
    connectionString: process.env.DATABASE_URL, // connexion à la base de données
    concurrency: 5, // nombre de jobs qui peuvent être exécutés en même temps
    noHandleSignals: false,
    pollInterval: 1000,
    taskList: {}, // liste des jobs à exécuter
  });
  await runner.promise;
};
main().catch(error => {
  console.log(error);
  process.exit(1);
});
```

La fonction `main` est une fonction asynchrone qui retourne une promise.
Elle met en place un "runner" a qui on indique quels sont les jobs qu'il faut écouter.

### src/tasks

Le dossier **tasks** contiendra l’ensemble des jobs à exécuter.

### Création d’un tâche de test

Une tâche de test basique est d’afficher dans la console “Hello <user>”.

**src/tasks/say_hi.ts** (la convention est : lettres minuscules et séparation par “\_”)
Les tâches sont des fonctions qui retournent void.

```tsx
import { Task } from "graphile-worker";

export const sayHi: Task = (payload, helpers) => {
  const { name } = payload as { name?: string };
  console.log(`Hi ${name || "stranger"}`);
};
// sans helpers
```

```tsx
import { Task } from "graphile-worker";

export const sayHi: Task = (payload, { addJob }) => {
  const { name } = payload as { name?: string };
  console.log(`Hi ${name || "Unnamed"}`);
  !name && addJob("say_hi", { name: "stranger" });
};
// avec helpers
```

`addJob()` permet de chainer des jobs : exécuter un job depuis un job en cours d'execution.
`withPgClient()` : pool de connexion a la base de données (ex : pour récupérer des données à partir d'un id)

### Créer un index pour toutes les tâches

**src/tasks/index.ts**

```tsx
import { sayHi } from "./say_hi";

export { sayHi };
```

### Ajouter le job dans src/index.ts

```tsx
import { sayHi } from "./tasks";
...
taskList: { say_hi: sayHi },
```

### Exécuter un job

`yarn gw build --watch` : créé le dossier **dist** et le fichier **index.js**. `--watch` permet de re-build automatiquement si on modifie le fichier **index.ts**.

`yarn gw dev` : exécute le fichier **index.js** généré, et génère à son tour un schéma dans la base de données : **graphile_worker**. On y trouve des tables et des fonctions. Ici la fonction qui nous intéresse est **add_job**.

Du côté de PostgreSQL

On se connecte au serveur PostgreSQL. On exécute une nouvelle requête :

```sql
select graphile_worker.add_job('say_hi');

-- le premier argument est un idendifiant. la fonction add_job va utiliser
-- le deuxième exemple de notre fichier tasks/say_hi avec le helper. dans un
-- premier temps il va afficher "unnamed" et ensuite il va afficher "stranger"
-- car il n'y a pas de nom renseigné et car la fonction addJob est appelée.

select graphile_worker.add_job('say_hi', json_build_object('name', 'Louis'));

-- on utilise le deuxième argument qui consiste à créer un objet avec comme clé
-- le nom de la queue et comme valeur la valeur libre que l'on veut lui donner.

-- { name?: string }
-- console.log(`Hi ${name || "Unnamed"}`)

-- c'est le nom que l'on a renseigné qui va donc s'afficher : "louis"
```

### Workspace apps/db

On souhaite que le setup de graphile-worker soit installé après chaque reset. (après chaque exécution de la commande `yarn gm reset --erase` cf : “db-step1-graphile-migrate”).

Dans le **package.json** du workspace **db**, on ajoute :

```json
"dependencies": {
    "graphile-worker": "^0.12.2"
}
```

Dans le dossier **db/scripts**, on ajoute un fichier que l’on nomme **migrate-graphile-worker.js**. Ce fichier aura pour but de générer le schéma **graphile-worker** dans la base de données car nous aurons besoin d’accéder à certaines tables et fonctions avant d’avoir besoin de créer des tâches.

Enfin, dans le fichier **.gmrc**, on ajoute :

```json
"afterReset": [
    "afterReset.sql",
    {
      "_": "command",
      "command": "node scripts/migrate-graphile-worker.js"
    }
],
```

Quand on exécutera la commande `yarn gm reset --erase` via la commande `yarn install:db`, la machine va supprimer et re-créer la base de données et les rôles (**installdb.js**), va créer les droits d’accès à la base de données et les extensions PostgreSQL (**afterReset.sql**), et désormais va également générer le schéma de graphile-worker (**migrate-graphile-worker.js**).

### Chronologie des commandes :

- `yarn install:db`
- `yarn gw build --watch`
- `yarn gw dev`
