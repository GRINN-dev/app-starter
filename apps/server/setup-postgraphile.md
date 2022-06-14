# db-step3-postgraphile

📚[Documentation](https://www.graphile.org/postgraphile/usage-library/)

# Monorepo

Objectif : installer un serveur postgraphile pour générer une API graphQL.

### Workspace : apps/server

On créé dans **apps** le dossier **server**. Ce sera un projet TypeScript. Initialisation du projet : `yarn worspace server init -y`. Création du **package.json**.

### package.json

Dépendances :

```json
"devDependencies": {
    "nodemon": "^2.0.15",
    "typescript": "^4.5.5",
    "@types/express": "^4.17.13"
},
"dependencies": {
    "@graphile-contrib/pg-simplify-inflector": "^6.1.0",
    "express": "^4.17.2",
    "postgraphile": "^4.12.8"
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

### Projet TypeScript

`yarn tsc --init` (dans la racine du workspace) - ou `yarn worspace server tsc --init` (racine du monorepo) : on créé le **tsconfig.json**.

### tsconfig.json

```json
"rootDir": "./src"
"outDir": "./dist"
```

### Arborescence de l’app

```
apps/
├─ server/
│  ├─ src/
│  │  ├─ app.ts
│  │  ├─ index.ts
│  │  ├─ middlewares/
│  │  │  ├─ installPostgraphile.ts
│  │  ├─ plugins/
│  │  ├─ utils/
```

### src/middlewares/installPostgraphile.ts

Les fichiers middlewares sont des fonctions qui prennent une app Express en paramètre et installent un middleware sur cette app :

```tsx
import { Express } from "express";
import postgraphile, { PostGraphileOptions } from "postgraphile";

const postgraphileOptions: PostGraphileOptions = {
  ...
};

export const installPostgraphile = (app: Express) => {
  app.use(
    postgraphile(process.env.DATABASE_URL, "publ", postgraphileOptions)
		// 1st param : link to database
    // 2nd param : schema
    // 3rd param (object) : options
  );
};
```

### .env

On va modifier le **.env** à la racine du monorepo (attention à bien modifier le **.env.example** également). On ajoute une variable d’environnement que l’on nomme `NODE_ENV` et qui prendra la valeur de “development”, “production” ou “test” en fonction du contexte.
En début de projet nous sommes en phase de développement, la valeur de variable cette sera donc “development” (nous l’écrivons manuellement dans le **.env** et le modifierons manuellement au moment de la phase de production ou de test).
Cette variable sera utilisée dans les options du middleware postgraphile.

### Options du middleware postgraphile

Plus haut dans le code, nous avons déclaré un objet “postgraphileOptions” comme options du middleware. Cet objet est de type `PostGraphileOptions`.

```tsx
import PgSimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector";

const isDev = process.env.NODE_ENV === "development";

const postgraphileDevelopmentOptions: PostGraphileOptions = {
  // options propres au développement
};

const postgraphileProductionOptions: PostGraphileOptions = {
  // options propres à la production
};

const postgraphileOptions: PostGraphileOptions = {
  // options génériques
  ...(isDev ? postgraphileDevelopmentOptions : postgraphileProductionOptions),
};
```

En fonction du contexte (développement, production, test), les options appliquées au middleware seront donc différentes.
On retrouve dans la 📚[documentation/API](https://www.graphile.org/postgraphile/usage-library/#api-postgraphilepgconfig-schemaname-options) le descriptif de chaque option.

### src/app.ts

Le fichier **apps.ts** exporte une app Express avec les middlewares installés.

```tsx
import Express from "express";
import { installPostgraphile } from "./middlewares/installPostgraphile";

export const makeApp = () => {
  const app = Express();
  installPostgraphile(app);
  return app;
};
```

### src/index.ts

Le fichier **index.ts** est le fichier d’exécution de l’app (fonction exportée par **app.ts**).

```tsx
import { makeApp } from "./app";

const PORT = process.env.PORT || 8000;

makeApp().listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}/graphiql`);
});
```

### Chronologie des commandes :

- `yarn workspace server build --watch` (génère un fichier **dist/index.js**)
- `yarn workspace server dev` (exécute le fichier généré - lance le serveur postgraphile)
- Se rendre sur l’url : [http://localhost:8000/graphiql](http://localhost:8000/graphiql) (accès à l’API graphQL)
