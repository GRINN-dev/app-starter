import { Express } from "express";
import cors from "cors";

export const installCors = (app: Express) => {
  app.use(
    cors({
      origin: [
        "null",
        // "http://localhost:3000",
        // "http://localhost:3001",
        "http://localhost:6785",
        "http://localhost:3003",
        /\.grinn\.com$/,
        // regexp for grinn + anything + 'vercel.app'
        /grinn.*\.vercel\.app$/,
      ],
      credentials: true,
    })
  );
};

//<project-name>-<unique-hash>-<scope-slug>.vercel.app
