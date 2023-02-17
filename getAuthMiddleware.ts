import { verify } from "jsonwebtoken";
import { User, UserRole } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { sendUnauthorised } from "./helpers/sendUnauthorised";

const getAuthMiddleware =
  (roles: UserRole[]) =>
  ({ body, headers }: Request, res: Response, next: NextFunction) => {
    const { authorization: token } = headers;
    if (!token) return sendUnauthorised(res);
    try {
      const { role, email, id } = verify(
        token,
        process.env["JWT_SECRET"] as string
      ) as User;
      if (!roles.includes(role as UserRole)) return sendUnauthorised(res);
      body.email = email;
      body.userId = id;
      next();
    } catch {
      return sendUnauthorised(res);
    }
  };

export default getAuthMiddleware;
