import { Request, Response } from "express";
import { prisma } from "../../main";

const getIngredients = async (
  { body: { userid: ownerId } }: Request,
  res: Response
) => {
  try {
    const ingredients = await prisma.ingredient.findMany({
      where: {
        ownerId,
      },
    });
    return res
      .status(200)
      .json({ ingredients: ingredients.map(({ ownerId, ...rest }) => rest) });
  } catch (err) {
    console.error((err as Error).message);
    return res.status(400).json({ error: "Failed to get ingredients" });
  }
};

export { getIngredients };
