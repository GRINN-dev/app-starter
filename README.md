# Grinn Starter

## Vue d'ensemble

Ce monorepo contient l'ensemble des packages et applications constituant la `v1` du starter Grinn. Il s'agit d'un monorepo [yarn](https://classic.yarnpkg.com/lang/en/docs/workspaces/), utilisant [turborepo](https://turborepo.org) pour l'execution en parallèle des différentes application et le build de celles-ci au déploiement.

Le monorepo comprend des workspaces répartis en deux dossiers:

- `apps`: Le dossier `apps` comprend les applications suivantes:
  - [`public-site`](./apps/public-site/README.md), un site next destiné aux utilisateurs non-connectés
  - [`dashboard`](./apps/dashboard/README.md), un site next comprenant les dashboards à l'intention des utilisateurs connectés
  - [`server`](./apps/server/README.md), une API GraphQL [Postgraphile](https://postgraphile.org) centralisant la gestion des données entre les différents sites mis en place
  - [`workers`](./apps/workers/README.md) une job queue [Graphile Worker](https://github.com/graphile/worker) pour la gestion des tâches asynchrones comme l'envoie d'emails ou la génération de PDF
  - [`db`](./apps/db/README.md), un outil de migration de base de données PostgreSQL basé sur [Graphile Migrate](https://github.com/graphile/migrate)

Les packages node dans le dossier `apps` n'ont pas vocation à être utilisés par d'autres packages et constituent en eux-même des application finales

- `packages`: Le dossier `packages` compprend les applications suivantes
  - [`@grinn/components`](./%40grinn/components/README.md), une collection de composants React partagés entre les différentes applications. Le package `components` permet une prévisualisation des composants développés à l'aide de [storybook](https://storybook.js.org/)
  - [`@grinn/config`](./%40grinn/config/README.md), un package exportant les fichiers de configuration et les variables partagées entre les différentes apps et packages
  - [`@grinn/graphql-generated`](./%40grinn/graphql-generated/README.md), un package où sont centralisées les requêtes GraphQL utilisées dans les différentes applications, pour être transformées en hook React et types Typescript à l'aide de [GraphQL Code Generator](https://www.graphql-code-generator.com/)
  - [`@grinn/icons`](./%40grinn/icons/README.md), une collection d'icones disponibles comme composant React et automatiquement générées à partir de fichiers `svg` à l'aide de [SVGR](https://react-svgr.com/)
  - [`@grinn/lib`](./%40grinn/lib/README.md), une collection d'utilitaires et de hooks partagés entre les différents frontend
  - [`@grinn/styles`](./%40grinn/styles/README.md), un packages utilisant [Tailwind CSS](https://tailwindcss.com) en CLI et générant un fichier `css` contenant les classes utilisées dans l'ensemble des frontends

A la racine du monorepo se trouvent aussi:

- un dossier `data` où sont exportés automatiquement le shema GraphQL de notre API ainsi que le schema SQL de notre BDD
- un dossier `scripts` contenant les scripts d'installation du projet
- un dossier `doc` contenant la documentation non classée du projet, ou non-relative à un package particulier
- un dossier `.vscode` contenant principalement des snippets utiles au sein du workspace VSCode
- un fichier `apollo.config.js` permettant l'autocompletion des requêtes GraphQL à l'aide de l'extension VSCode apollo
- des fichiers de configuration Prettier, node, Turborepo, git etc

## installation du projet

L'installation du projet se fait en trois temps:

- création d'un fichier `.env` à la racine, sur le modèle du fichier `.env.exemple` comprenant _a minima_ les clés suivantes:

| Nom de la variable                | Valeur à fournir                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_AUTHENTICATOR_PASSWORD` | le mot de passe qui sera lié au rôle `DATABASE_AUTHENTICATOR`. _ex: `password123`_                                        |
| DATABASE_NAME                     | le nonm de la BDD créée localement pour contenir les infos des apps                                                       |
| DATABASE_OWNER_PASSWORD           | le mdp du `DATABASE_OWNER`                                                                                                |
| ROOT_DATABASE_URL                 | une URI postgres permettant la création d'autres BDD et de rôles, _ex: `postgres://myName:myPwd@localhost:5432/postgres`_ |

- lancement du script `install:db` (`yarn install:db`) à la racine

Si votre environnement est bien configuré, et la BDD root spécifiée dans le `.env` est bien disponible, le projet s'installe correctement et vous pouvez lancer le développement avec `yarn dev`

La comnmande `yarn dev` va lancer l'ensemble des packages et des apps en mode watch.
