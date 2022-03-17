import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection().then(() => {
  const app = express();
  const PORT = 4000;

  app.use(express.json());

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
  })
}).catch((error) => {
  console.log("Unable to connect to the database", error)
})
