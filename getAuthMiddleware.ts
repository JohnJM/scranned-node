import { Jwt, verify } from "jsonwebtoken";
import { User, UserRole } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const getAuthMiddleware =
  (roles: UserRole[]) =>
  (
    { body, cookies: { Authorization: token } = {} }: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('hit ->', token);
    
    if (!token) return sendUnauthorised(res);
    try {
      const { role, username } = verify(
        token,
        process.env["JWT_SECRET"] as string
      ) as User;
      if (!roles.includes(role as UserRole)) return sendUnauthorised(res);
      body.username = username
      next();
    } catch {
      return sendUnauthorised(res);
    }
  };

const sendUnauthorised = (res: Response): Response =>
  res.status(403).json({ error: "Unauthorised" }).end();

export default getAuthMiddleware;