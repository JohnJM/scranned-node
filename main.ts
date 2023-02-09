import express, { Express } from "express";
import { constants } from "./constants";

  const main = (app: Express) => {
    const { SERVER_ONLINE_MESSAGE, SERVER_PORT } = constants;
    app.listen(SERVER_PORT, () => console.log(SERVER_ONLINE_MESSAGE));
  };
 
  main(express());