import { makeExtendSchemaPlugin, gql } from 'postgraphile';
import axios from 'axios';
import chalk from 'chalk';

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
          return axios('https://api.chucknorris.io/jokes/random').then(
            (response) => response.data
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
            .then((response) => response.data)
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
