# Monorepo

- `npx create-turbo@latest`

  ```
  npx create-turbo@latest
  Need to install the following packages:
    create-turbo@latest
  Ok to proceed? (y)

  >>> TURBOREPO

  >>> Welcome to Turborepo! Let's get you set up with a new codebase.

  ? Where would you like to create your turborepo? ./my-turborepo
  ? Which package manager do you want to use? yarn

  >>> Bootstrapping a new turborepo with the following:

   - apps/web: Next.js with TypeScript
   - apps/docs: Next.js with TypeScript
   - packages/ui: Shared React component library
   - packages/config: Shared configuration (ESLint)
   - packages/tsconfig: Shared TypeScript `tsconfig.json`
  ```

- Let’s code !

  ```
  >>> Success! Created a new Turborepo at "my-turborepo".
  Inside that directory, you can run several commands:

    yarn run build
       Build all apps and packages

    yarn run dev
       Develop all apps and packages

  Turborepo will cache locally by default. For an additional
  speed boost, enable Remote Caching (beta) with Vercel by
  entering the following command:

    npx turbo login

  We suggest that you begin by typing:

    cd my-turborepo
    npx turbo login
  ```

Un monorepo contient deux workspaces : **apps** et **packages**

A la racine du monorepo, créer :

### .env & .env.example

**.env.example** doit toujours être semblable au **.env** mais sans aucune valeur renseignée.
On ajoute **.env** au fichier **.gitignore**.

### packages/config/env.js

Nous aurons besoin d’utiliser le **.env** dans plusieurs workspaces.

Dans le workspace existant **packages/config**, on créé un fichier **env.js** dans lequel on indique le chemin de config. Il faudra installer dans ce workspace la devDependence `dotenv`.

```jsx
require("dotenv").config({ path: `${__dirname}/../../.env` });
```

### Nouveau workspace

Lorsqu’on créé un nouveau workspace, après avoir créé le dossier dans **apps** ou **packages**, il faut l’initialiser avec la commande `yarn workspace <workspace> init -y` depuis la racine du monorepo - ou `yarn init -y` depuis le workspace.
Un **package.json** sera créé. Il faudra toujours que le **package.json** de chaque workspace ait un script `build` et un script `dev`, afin de pouvoir exécuter les commandes `yarn run build` et `yarn run dev` du monorepo.

### Scripts & workspaces

Depuis la racine du monorepo :

Pour lancer un script dans un workspace en particulier : `yarn workspace <workspace> build`.
Pour ajouter une dépendance dans un workspace : `yarn workspace <workspace> add <dependence>`.
