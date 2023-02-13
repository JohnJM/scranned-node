import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../main";

const hash = async (pwd: string) => bcrypt.hash(pwd, await bcrypt.genSalt());

const createAuthToken = (
  { id, role, email }: User,
  maxAge = 1 * 24 * 60 * 60
): [string, number] => {
  return [
    sign({ id, role, email }, process.env["JWT_SECRET"] as string, {
      expiresIn: maxAge,
    }),
    maxAge,
  ];
};

const getUserData = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: {
        equals: email,
      },
    },
    take: 1,
  });
  if (!(await compare(password, user.password)))
    throw new Error("Invalid password!");
  return { user, token: createAuthToken(user) };
};

export { getUserData, createAuthToken, hash };
