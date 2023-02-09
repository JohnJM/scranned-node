import { NextFunction, Request, Response, Router } from "express";
import { login, register } from "../controllers/auth";
import path from "path";
import getAuthMiddleware from "../getAuthMiddleware";
import { UserRole } from "@prisma/client";

const routes = Router();

const requireDefaultRoleAccount = getAuthMiddleware([UserRole.DEFAULT]);

routes.get("/testAuth", [
  (_req: Request, _res: Response, next: NextFunction) => {
    console.log("hit");
    next();
  },
  requireDefaultRoleAccount,
  (req: Request, res: Response) => {
    console.log("body", req.body);
    return res.status(200).json({ Success: true, username: req.body.username });
  },
]);

routes.get("/healthCheck", (_, res) => res.status(200).end());
routes.get("/", (_, res) =>
  res.status(200).json({
    Message: `Server online! ${Math.round(Math.random() * 100)}`,
  })
);
routes.get("/ui", (_req, res) =>
  res.sendFile("index.html", {
    root: path.join(__dirname, "../"),
  })
);

routes.post("/register", register);
routes.post("/login", login);

export { routes };
