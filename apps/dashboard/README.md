# Dashboard

## Vue d'ensemble

Dans l'app `dashboard` sont regroupés les trois dashboards utilisateur, banque et admin de grinn.

L'architecture de ce dossier est la suivante:

- `pages`, contient toutes nos pages Next
- `components`, contient les composants n'ayant pas besoin d'etre utilisés en dehors du dashboard, comme le `Layout`. Pour les autres composants, ils sont importés depuis [`@grinn/components`](../../%40grinn/components/README.md).
- `public`, contient les assets (images et police principalement) utilisés dans le dashboard
- `utils`, contient des fonction destinées à préparer les props des composants complexes comme les tables
- `styles`, utilisé uniquement pour importer la police. Le CSS est chargé depuis `@grinn/styles` dans `./pages/_app.tsx`

## Gestion des requêtes GraphQL

Pour récupérer des données ou enregistrer des action utilisateur dans l'API, il faut définir des requêtes GraphQL dans `@grinn/graphql-generated`. Les requêtes enregistrées dans ce package sont automatiquement compilées en hooks React et types Typescript, compatibles avec le Client GraphQL utilisé ([Apollo Client](https://www.apollographql.com/docs/react/)), importé depuis [`@grinn/lib`](../../%40grinn/lib/src/ApolloProvider.tsx). Par exemple la requête suivante

```graphql
query Test($id: UUID!) {
  user(id: $id) {
    id
    firstName
    project {
      id
      assetPrice
    }
  }
}
```

Va créer les hooks suivant: `useTestQuery` et `useTestLazyQuery`, qui nous permettrons de fetch les données de manière déclarative avec des paramètres de requête type-safe et d'obtenir un resultat typé.

```tsx
// requete client-side
const { data, loading, error } = useTestQuery({ variables: { id: 123 } });
```

```tsx
// requete server-side pour la création de pages statiques dans Next
import { GetStaticProps, NextPage } from "next";
import { TeamDocument, TestQuery } from "@grinn/graphql-generated";
import { client } from "@grinn/lib";

const TestPage: NextPage<TestQuery> = ({ user }) => {
  const teamMembers = useTeamMemberQuery({});

  return <div> ...</div>;
};

export default TestPage;

export const getStaticProps: GetStaticProps<TestQuery> = async ({}) => {
  const { data, error } = await client.query<TestQuery>({
    query: TestDocument,
  });
  return {
    props: data,
  };
};
```

> Les queries doivent systématiquement demander un id pour chaque entité, si celui-ci est disponible, pour assurer une bonne gestion du cache Apollo

> Apollo propose une gestion intelligente du cache, avec un comportement par défaut `cache-first` qui ne raffraichit pas les données lors de la navigation. Selon les besoins, il convient de modifier la politique de gestion du cache à l'aide de l'option `fetchPolicy` dans nos hooks apollo

## Authentication

Section à completer. Pour l'instant on enregistre simplement un JWT avec une longue date d'expiration dans le localStorage

## Deploy

Le dashboard est automatiquemt déployé sur vercel au git push, quand le git diff n'est pas nul sur le fichier [`deploylog.md`](./deploylog.md)
