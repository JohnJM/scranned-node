import { createAuthToken, getUserData, hash } from "./helpers";
import { Request, Response } from "express";
import { prisma } from "../../main";

const register = async (
  { body: { email, username,  password } = {} }: Request,
  res: Response
) => {
  if (!email) res.status(400).json({ error: "please provide an email" }).end();
  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email: {
          contains: email,
        },
      },
    });
    if (userExists)
      return res.status(400).json({ error: "Email already exists" });

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: await hash(password),
      },
    });
    const [token, maxAge] = createAuthToken(user);
    res.cookie("Authorization", token, { httpOnly: true, maxAge });
    res.status(200).json({ success: true }).end();
  } catch (err) {
    const {message} = err as Error
    console.error({message});
    res.status(400).end();
  }
};

const login = async (
  { body: { email, password } = {} }: Request,
  res: Response
) => {
  try {
    const {
      user: { email: name },
      token: [token, maxAge],
    } = await getUserData({ email, password });
    res.status(200).cookie("Authorization", token, { maxAge }).json({
      name,
      token,
    });
  } catch {
    return res.status(400).json({ error: "Login failed" });
  }
};

export { register, login };
