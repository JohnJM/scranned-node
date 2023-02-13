import { Response } from "express";

const sendUnauthorised = (res: Response): Response =>
  res.status(403).json({ error: "Unauthorised" }).end();

export { sendUnauthorised };
