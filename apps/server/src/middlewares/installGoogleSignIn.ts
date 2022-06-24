import { Express } from "express";
const { OAuth2Client } = require("google-auth-library");

export const installGoogleSignIn = (app: Express) => {
  app.post("/verify-gsign", async (req, res, next) => {
    console.log(
      "🚀 ~ file: installGoogleSignIn.ts ~ line 5 ~ app.post ~ req.body",
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
      const userid = payload["sub"];
      console.log(
        "🚀 ~ file: installGoogleSignIn.ts ~ line 26 ~ verify ~ userid",
        userid
      );
      // If request specified a G Suite domain:
      // const domain = payload['hd'];
    }
    verify().catch(console.error);
  });
};
