import { Express } from "express";
import { ServerResponse, IncomingMessage } from "http";
import postgraphile, { PostGraphileOptions } from "postgraphile";
import PgSimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector";
import { GeneratePresignedUrl, JokeOfDay } from "../plugins";
import { Pool, PoolClient } from "pg";
import { getRootPgPool } from "./installDatabasePools";
import { resolve } from "path";
import ConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
import { NodePlugin } from "graphile-build";
import RefreshTokenPlugin from "../plugins/refreshTokenPlugin.js";

import { makePgSmartTagsFromFilePlugin } from "postgraphile/plugins";

const isDev = process.env.NODE_ENV === "development";

const TagsFilePlugin = makePgSmartTagsFromFilePlugin(
  // We're using JSONC for VSCode compatibility; also using an explicit file
  // path keeps the tests happy.
  resolve(__dirname, "../../postgraphile.tags.jsonc")
);

export interface OurGraphQLContext {
  pgClient: PoolClient;
  rootPgPool: Pool;
  res: ServerResponse;
  req: IncomingMessage;
}

const postgraphileDevelopmentOptions: PostGraphileOptions = {
  watchPg: true,
  showErrorStack: "json",
  extendedErrors: ["hint", "detail", "errcode"],
  exportGqlSchemaPath: "../../data/schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  allowExplain: true,
  enableCors: false,
};

const postgraphileProductionOptions: PostGraphileOptions = {
  retryOnInitFail: true,
  extendedErrors: ["errcode"],
  graphiql: false,
  disableQueryLog: true,
  enableCors: false,
};

const getPostgraphileOptions = (rootPgPool: Pool): PostGraphileOptions => {
  return {
    subscriptions: true,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    ignoreIndexes: false,
    appendPlugins: [
      PgSimplifyInflectorPlugin,
      JokeOfDay,
      GeneratePresignedUrl,
      ConnectionFilterPlugin,
      TagsFilePlugin,
      RefreshTokenPlugin,
    ],
    enableQueryBatching: true,
    legacyRelations: "omit",
    pgDefaultRole: process.env.DATABASE_VISITOR,
    jwtPgTypeIdentifier: "publ.jwt",
    jwtSecret: "gdztrgdskqhfge",
    additionalGraphQLContextFromRequest: async (
      req,
      res
    ): Promise<Partial<OurGraphQLContext>> => {
      return { rootPgPool, res, req };
    },
    ...(isDev ? postgraphileDevelopmentOptions : postgraphileProductionOptions),

    skipPlugins: [NodePlugin],
  };
};

export const installPostgraphile = (app: Express) => {
  const rootPgPool = getRootPgPool(app);
  app.use(
    // 1st param : link to db
    // 2nd param : schema
    // 3rd param (object) : options
    postgraphile(
      process.env.DATABASE_URL,
      "publ",
      getPostgraphileOptions(rootPgPool)
    )
  );
};