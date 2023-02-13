import { NextFunction, Request, Response, Router } from "express";
import { login, register } from "../controllers/auth";
import path from "path";

const routes = Router();

routes.post("/register", register);
routes.post("/login", login);

routes.get("/healthCheck", (_, res) => res.status(200).end());

routes.get("/ui", (_req, res) =>
  res.sendFile("index.html", {
    root: path.join(__dirname, "../"),
  })
);

routes.get("/", (_, res) =>
  res.status(200).json({
    Message: `Server online! ${Math.round(Math.random() * 100)}`,
  })
);

export { routes as generalRoutes };