import cookieParser from "cookie-parser";
import jwtPkg from "jsonwebtoken";
import { Express } from "express";
const { verify } = jwtPkg;

import { signToken, sendRefreshToken } from "../plugins/refreshTokenPlugin.js";
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const installCookieJWT = (app: Express) => {
  app.use(cookieParser());
  app.post("/refresh_token", async (req, res, next) => {
    const rootPgPool = app.get("rootPgPool");
    const token = req.cookies.qid; // `qid` is arbitrary; must match whatever cookie name we set in sendRefreshToken()
    if (token) {
      try {
        const payload = verify(token, REFRESH_TOKEN_SECRET!, {
          algorithms: ["HS256"],
        });
        // user lookup - if user was deleted, they no longer get a token
        const { rows } = await rootPgPool.query(
          ` SELECT user_id AS sub FROM priv.user_secrets 
            WHERE user_id = $1
            LIMIT 1
          `,
          [payload.sub]
        );
        if (rows.length) {
          const { sub } = rows[0];
          // go ahead and refresh refresh token while we're here
          sendRefreshToken(
            res,
            signToken(
              sub,
              {
                expiresIn: "7 days",
                audience: undefined,
                issuer: undefined,
              },
              REFRESH_TOKEN_SECRET
            )
          );
          return res.send({
            ok: true,
            access_token: signToken(
              sub,
              {
                audience: undefined,
                issuer: undefined,
                expiresIn: undefined,
              },
              ACCESS_TOKEN_SECRET
            ),
          });
        }
      } catch (err) {
        next(err);
      }
    }

    return res.send({ ok: false, accessToken: "" });
  });
};
