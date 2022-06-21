import Express, { static as staticMiddleware } from "express";
import {
  installPostgraphile,
  installDatabasePools,
  installCors,
  installCookieJWT,
} from "./middlewares";
import { installVoyager } from "./middlewares/installVoyager";

export const makeApp = () => {
  const app = Express();
  app.use(
    "/static",
    staticMiddleware(__dirname + "/../public", {
      setHeaders: res => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Methods",
          "PUT, GET, POST, DELETE, OPTIONS"
        );
        res.header("Access-Control-Allow-Headers", "Content-Type");
      },
    })
  );
  installCors(app);
  installDatabasePools(app);
  installPostgraphile(app);
  installCookieJWT(app);
  installVoyager(app);
  return app;
};
