import { Express, Request, RequestHandler } from "express";
import { sendRefreshToken, signToken } from "../plugins/refreshTokenPlugin";
const { OAuth2Client } = require("google-auth-library");

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;


export const installGoogleSignIn = (app: Express  ) => {
  app.post("/verify-gsign", async (req:Request, res, next) => {
    console.log("🚀 ~ file: installGoogleSignIn.ts ~ line 8 ~ app.post ~ res", res)
    const rootPgPool = app.get("rootPgPool");
    console.log(
      "🚀 ~ file: installGoogleSignIn.ts ~ line 5 ~ app.post ~ req",
      req.query.token
    );
    const client = new OAuth2Client(
      "128517360182-uqnaqd02h6ab6f65uragsmh0j6no516q.apps.googleusercontent.com"
    );
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: req.query.token,
        audience:
          "128517360182-uqnaqd02h6ab6f65uragsmh0j6no516q.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      console.log(
        "🚀 ~ file: installGoogleSignIn.ts ~ line 14 ~ verify ~ ticket",
        ticket
      );
      const payload = ticket.getPayload();
      console.log("🚀 ~ file: installGoogleSignIn.ts ~ line 32 ~ verify ~ payload", payload)
      const userid = payload["sub"];
      console.log(
        "🚀 ~ file: installGoogleSignIn.ts ~ line 26 ~ verify ~ userid",
        userid
      );

      try {
        const {
          rows: [user],
        } = await rootPgPool.query(
          `select * from priv.link_or_register_user($1, $2, $3, $4, $5)`,
          [
            null,
            'google',
            userid,
            JSON.stringify({
              first_name: payload["given_name"],
              last_name: payload["family_name"],
              avatar_url: payload["picture"],
              email: payload["email"],
            }),
            JSON.stringify({
              iat: payload["iat"],
              exp:  payload["exp"],
              accessToken:req.query.token,
              jti:payload['jti']
            }),
          ]
        );
        console.log("🚀 ~ file: installGoogleSignIn.ts ~ line 38 ~ verify ~ user", user)
        if (!user || !user.id) {
          const e = new Error("Registration failed");
          e["code"] = "FFFFF";
          throw e;
        }else{
          sendRefreshToken(
            res,
            signToken(
              payload["sub"],
              {
                expiresIn: "7 days",
                audience: undefined,
                issuer: undefined,
              },
              REFRESH_TOKEN_SECRET
            )
          );
          console.log("🚀 ~ file: installGoogleSignIn.ts ~ line 94 ~ verify ~ res", res)

          return res.send({
            ok: true,
            access_token: signToken(
              payload["sub"],
              {
                audience: undefined,
                issuer: undefined,
                expiresIn: undefined,
              },
              ACCESS_TOKEN_SECRET
            ),
          });
        }
      } catch (error) {
      console.log("🚀 ~ file: installGoogleSignIn.ts ~ line 61 ~ verify ~ error", error)
        
      }
     

      // If request specified a G Suite domain:
      // const domain = payload['hd'];
    }
    verify().catch(console.error);
  });
};
