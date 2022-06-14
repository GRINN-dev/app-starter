# Server

L'app `server` correspond au serveur API permettant la centralisation et la distribution des données ainsi que l'enregistrement des actions utilisateur et la connexion aux APIs tiers.

## Structure de l'application `server`

Il s'agit d'une application typescript dont les sources sont dans le dossier `src`. Dans ce dossier, on trouve

- un fichier `index.ts` qui est le point d'entrée pour le démarraghe de notre serveur
- un fichier `app.ts` qui exporte une fonction `makeApp`, responsable de la création d'une application ExpressJS et de l'installation des middlewares
- un dossier `middleware` incluant l'ensemble des middlewares installés dans nootre apoplication Express, notamment le middleware postgraphile responsable de la génération de l'API mais aussi un middleware pour la gestion des CORS, l'installation de [GraphQL Voyager](https://github.com/IvanGoncharov/graphql-voyager) pour la representation graphique de notre schéma GraphQL, l'installation de pools de connexion à notre BDD et bientôt des middlewares chergés de l'authentification et de la sécurisation de notre serveur
- un dossier `lib` contenant principalement des helpers utilisés dans notre API
- un dossier `plugins` dans lequel nous créons les plugins qui nous permettent de customiser le comportement de notre application Postgraphile, en permettant par exemple de se connecter à des services tiers comme [BridgeAPI](https://bridgeapi.io/), à Amazon S3 pour l'upload de documents ou encore de débloquer les capacités temps réel de Postgraphile (à venir)

À la racine de cette application, on trouve le fichier `postgraphile.tags.jsonc` qui nous permet de controller le schéma GraphQL généré a1 partir de notre BDD, notamment en bloquant la génération automatique de certaines queries ou mutation, et qui nous permet de documenter notre API en ajoutant une description pour chaque champ

## Présentation de Postgraphile

[Postgraphile](https://postgraphile.org) est une lib NodeJS permettant la génération instantannée d'une API GraphQL à partir d'une base de données PostgreSQL. Le mode de développement API avec Postgraphile est _database first_, c'est à dire que la structure des tables, les fonctions en base, les contraintes et relations sur les différents champs vont être instantannément reflétés.

Dans notre app, nous utilisons Postgraphile comme middleware ExpressJS. Le fichier de configuration se trouve donc à `src/middleware/installPostgraphile.ts`. Le middleware Postgraphile prend trois paramètres:

- une URI de connexion à notre BDD, ou un pool de connection
- le nom du schema exposé par l'API (`publ` dans notre cas)
- les options Postgraphile. C'est ici que se configure finement le comportement de postgraphile. Dans cet object options, nous spécifions une configuration différente selon l'environement, s'il est dev ou prod.

### Liste des options pertinentes:

- `watchPg`: l'API s'adapte directement aux modifications de BDD, sans avoir à redemarrer,
- `exportGqlSchemaPath`: path pour l'export du schema GraphQL généré. Ce schema est utilisé ensuite pour l'autocompletion dans nos requetes graphQL et la génération des hooks et types par GraphQL Code Generator dans `@grinn/graphql-generated`,
- `graphiql`: si l'on crée un environnement graphiQL ou non, à l'adrese `/graphiql` pour tester notre API (equivalent Postman pour GraphQL),
- `enhanceGraphiql`: si l'environnement graphiql est boosté avec des options propres à potgraphile,
- `allowExplain`: donne l'analyse SQL des queries GraphQL faites sur la BDD,
- `enableCors`: si on autorise les CORS,
- `disableQueryLog`: si on log les queries dans notre terminal,
- `subscriptions`: si on active les capacités temps réel de graphQL (marche avec des websockets),
- `dynamicJson`: si le re2sultat est un JSON déjà parsé,
- `ignoreRBAC`: si l'on génère ou non les queries et mutation pour lesquelles on a pas dégini explicitement les RBAC (grants). En gros, si je n'ai pas grant UPDATE et que l'option est à `false`, la mutation `updateXXX` n'est pas générée
- `ignoreIndexes`: si on vérifie la présence d'un index avant de créer une ralation au sein du schema graphQL. Par exemple:

```sql
create table publ.todo_lists (
    id uuid primary key default gen_random_uuid(),
    name text not null
);

create table publ.todo_items (
    id uuid primary key default gen_random_uuid(),
    todo_list_id uuid not null references publ.todo_lists,
    todo text not null
);
```

Avec ce schema, on peut récupérer la todo liste depuis un todo item dans l'API GraphQL, mais pas les todo items depuis la todo list tant qu'on a pas créé un index sur `todo_list_id`:

```sql
create index on publ.todo_items(todo_list_id);
```

de même, on ne peut trier ou filtrer que sur des champs indexés

- `appendPlugins`: les plugins ajoutés à l'API, qu'il soient officiels, de la communauté ou custom (définis dans le dossier `src/plugins`). Plugins classiques:
  - `PgSimplifyInflectorPlugin`, pour simplifier les noms et la pluralisation des champs dans l'API graphQL
  - `TagsFilePlugin`, pour utiliser un fichier de tags, pour mieux controller le schéma autogénéré par l'API et la documentation
  - `ConnectionFilterPlugin`, pour pouvoir filtrer en détail les requêtes sur les `connections` (requetes paginée)
- `pgDefaultRole`: le role utilisé par defaut pour se connecter à l'API
- `jwtPgTypeIdentifier`: le type définit en base de données qui nous donne les infos à encrypter dans un JWT quand on utilise l'option Postgraphile pour gérer les JWT _ex: `publ.jwt`_,
- `jwtSecret`: le pwd à utiliser pour encrypter et décoder nos JWT. Quand on le change, l'ensemble des tokens émins ne sont plus valables,
- `additionalGraphQLContextFromRequest`: une fonction qui vient agrémenter nos `req` et `res`, notamment en rajoutant des infos utilisables par les plugins custom comme un pool de connexion root a1 la BDD
- `skipPlugins`: les plugins dont on ne veut pas. Generalement on ajoute au moins `NodePlugin` dans cette cate2gorie là, qui créé un UUID supplémentaire pour chaque entité. Comme oin utilise déjà des UUID dans nos tables, pas besoin.

### Les plugins

La cre2ation de plugins custom dans postgraphile ressemble de très pres à la création d'une API GraphQL classique, avec en plus quelques helpers pour travailler plus facilement avec la base de donnée. Nous utilisons deux types de plugins principaux: Des extensions du schéma généré à partir de la BDD avec l'utilitaire `makeExtendSchemaPlugin` et des "interceptions" de requetes automatiquement générées avec l'utilitaire `makeWrapResolverPlugin`. On peut associer ces deux opérations à l'aide de l'utilitaire `makePluginByCombiningPlugins`

Nous avons jusqu'ici créé deux plugins principaux, pour générer des URLs pré-signées S3 et pour interragire avec BridgeAPI

#### `makeExtendSchemaPlugin`

exmple d'un plugin simple interrogeant une API de blagues de chuck norris et retournant ces resultsts dans une query: le principe est simple, la pratique est plus compliquée. Ce genre de plugin se fait en deux temps: extension du schema par l'ajout de `typeDefs` puis methode de résolution de ces nouveaux types (le coeur de nos queries et mutation) par la création de `resolvers`

```ts
import { makeExtendSchemaPlugin, gql } from "postgraphile";
import axios from "axios";
import chalk from "chalk";

// source : https://api.chucknorris.io/
// catégories : https://api.chucknorris.io/jokes/categories

export const JokeOfDay = makeExtendSchemaPlugin(() => {
  return {
    typeDefs: gql`
      type ChuckNorrisJoke {
        icon_url: String
        id: String
        url: String
        value: String
      }
      extend type Query {
        getChuckNorrisJoke: ChuckNorrisJoke
      }
      input ChuckNorrisJokeCategory {
        category: String
      }
      extend type Query {
        getChuckNorrisJokeByCategory(
          input: ChuckNorrisJokeCategory
        ): ChuckNorrisJoke
      }
    `,
    resolvers: {
      Query: {
        // a very simple query :
        getChuckNorrisJoke: async (_query, _args, _context, _resolveInfo) => {
          return axios("https://api.chucknorris.io/jokes/random").then(
            response => response.data
          );
        },
        // a query with argument :
        getChuckNorrisJokeByCategory: async (
          _query,
          args,
          _context,
          _resolveInfo
        ) => {
          const { category } = args.input;

          const res = await axios(
            `https://api.chucknorris.io/jokes/random?category=${category}`
          )
            .then(response => response.data)
            .catch(() =>
              console.log(
                chalk.white.bgRed(`Category ${category} does not exists`)
              )
            );
          return res;
        },
      },
    },
  };
});
```
