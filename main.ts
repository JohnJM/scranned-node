import express, { Express } from "express";
import { constants } from "./constants";
import { PrismaClient } from "@prisma/client";
import { routes } from "./routes";

export const prisma = new PrismaClient();

const createServer = async () => {
  await prisma.$connect();
  return express();
};

const main = (app: Express) => {
  const { SERVER_ONLINE_MESSAGE, SERVER_PORT } = constants;
  app.listen(SERVER_PORT, () => console.log(SERVER_ONLINE_MESSAGE));
  app.use(express.json());
  app.use(routes);
};

createServer()
  .then(main)
  .catch(console.error)
  .finally(() => prisma.$disconnect());
