import { createAuthToken, getUserData, hash } from "./helpers";
import { Request, Response } from "express";
import { prisma } from "../../main";

const register = async (
  { body: { email, username, password } = {} }: Request,
  res: Response
) => {
  console.log('hit');
  

  console.log({email, username, password});
  
  if (!email) res.status(400).json({ error: "please provide an email" }).end();

  try {
    const userExists = await prisma.user.findFirst({
      where: {
        username: {
          contains: username,
        },
      },
    });
    if (userExists)
      return res.status(400).json({ error: "Username already exists" });

    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password),
      },
    });
    const [token, maxAge] = createAuthToken(user);

    console.log({token, maxAge});
    
    res.cookie("Authorization", token, { httpOnly: true, maxAge });
    res.status(200).json({ success: true }).end();
  } catch (err) {
    const {message} = err as Error
    console.log(message);
    
    
    res.status(400).end();
  }
};

const login = async (
  { body: { email, password } = {} }: Request,
  res: Response
) => {
  console.log('>', email, password);
  
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
