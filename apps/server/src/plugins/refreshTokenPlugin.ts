import * as graphileUtilsPkg from "graphile-utils";
const { makeExtendSchemaPlugin, gql } = graphileUtilsPkg;
import jwtPkg from "jsonwebtoken";
const { sign } = jwtPkg;
import { Express, Response } from "express";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
export interface Token {
  sub: string;
  role: string;
  iss?: string;
  exp?: string;
  aud?: string;
}
const RefreshTokenPlugin = makeExtendSchemaPlugin(
  (_, { pgJwtSignOptions }) => ({
    typeDefs: gql`
      input AuthenticateForRefreshInput {
        email: String!
        password: String!
      }
      extend type Mutation {
        authenticateForRefresh(input: AuthenticateForRefreshInput!): String
      }
    `,
    resolvers: {
      Mutation: {
        authenticateForRefresh: async (_, args, context) => {
          console.log("🚀 ~ file: refreshTokenPlugin.ts ~ line 28 ~ authenticateForRefresh: ~ context", context)
          const { email, password } = args.input;
          try {
            // Because this is auth, we use rootPgPool, which uses PostGraphile's role
            // We don't use pgClient, b/c that's 'too late' - transaction & role is already
            // set based on the incoming JWT.
            // Note: this means we must manually pass rootPgPool in via resolver context

            const {
              rows: [tokenPlaintext],
            } = await context.rootPgPool.query(
              ` SELECT users.* 
              FROM priv.generate_token_plaintext($1, $2) users 
              WHERE NOT (users is null)
              LIMIT 1
            `,
              [email, password]
            );
            if (!tokenPlaintext) {
              // unable to auth/invalid creds
              throw new Error("not authenticated");
            }
            console.log(">>", tokenPlaintext);
            const { sub } = tokenPlaintext;

            const accessToken = signToken(
              sub,
              pgJwtSignOptions,
              ACCESS_TOKEN_SECRET
            );
            const refreshToken = signToken(
              sub,
              { ...pgJwtSignOptions, expiresIn: "7 days" },
              REFRESH_TOKEN_SECRET
            );

            sendRefreshToken(context.res, refreshToken);
            return accessToken;
          } catch (e) {
            console.error(e);
            throw e;
          }
        },
      },
    },
  })
);

export default RefreshTokenPlugin;

export const signToken = (
  sub: any,
  pgJwtSignOptions: { audience: any; issuer: any; expiresIn: any },
  secret: jwtPkg.Secret | undefined
) => {
  const token: Token = {
    sub, // the sub, aka 'subscriber id', comes from account.person_id
    role: "demo_authenticated", // _must_ match the role in SQL as defined by generate_token_plaintext() function
  };

  return sign(
    token,
    secret!,
    Object.assign(
      {},
      pgJwtSignOptions,
      token.aud || (pgJwtSignOptions && pgJwtSignOptions.audience)
        ? null
        : { audience: "postgraphile" },
      token.iss || (pgJwtSignOptions && pgJwtSignOptions.issuer)
        ? null
        : { issuer: "postgraphile" },
      token.exp || (pgJwtSignOptions && pgJwtSignOptions.expiresIn)
        ? null
        : { expiresIn: "15 mins" }
    )
  );
};

export const sendRefreshToken = (
  res: Response,
  token: string
) => {
  res.cookie("qid", token, {
    httpOnly: true,
    sameSite: true, // if you're on a single origin, this may help prevent CSRF attacks
    path: "/access_token",
  });
};
