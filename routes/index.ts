import { NextFunction, Request, Response, Router } from "express";
import { login, register } from "../controllers/auth";
import path from "path";

const routes = Router();

routes.get("/healthCheck", (_, res) => res.status(200).end());
routes.get("/", (_, res) =>
  res.status(200).json({
    Message: `Server online! ${Math.round(Math.random() * 100)}`,
  })
);

routes.post("/register", [
  (_req: Request, _res: Response, next: NextFunction) => {
    console.log("register hit");
    next();
  },
  register,
]);
routes.post("/login", login);

routes.get('/ui', (req, res) => {
  res.sendFile('index.html', {
      root: path.join(__dirname, '../')
  })
})

export { routes };
