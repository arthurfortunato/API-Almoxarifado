import 'express-async-errors'
import cors from 'cors';

import express from "express";
import "reflect-metadata";
import createConnection from './database';

import { routes } from './routes/index';
import { globalErrors } from "./middleware/globalErrors";

  createConnection();
  const app = express();
  const PORT = process.env.PORT || process.env.LOCAL;

  app.use(cors());
  app.use(express.json());
  app.use(routes);
  app.use(globalErrors);

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
  })
