import 'express-async-errors'
import cors from 'cors';

import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";

import { routes } from './routes/index';
import { globalErrors } from "./middleware/globalErrors";

createConnection().then(() => {
  const app = express();
  const PORT = process.env.PORT || process.env.LOCAL;

  app.use(cors());
  app.use(express.json());
  app.use(routes);
  app.use(globalErrors);

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
  })
}).catch((error) => {
  console.log("Unable to connect to the database", error)
})
