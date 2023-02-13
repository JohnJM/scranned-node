import { Ingredient } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../main";
import { sendUnauthorised } from "../../helpers/sendUnauthorised";

const addIngredients = async (
  { body: { ingredients, userId: ownerId } }: Request,
  res: Response
) => {
  if (!ownerId) return sendUnauthorised(res);

  const data: Ingredient[] = ingredients.map(
    (ingredient: Omit<Ingredient, "ownerId">) => ({
      ownerId,
      ...ingredient,
    })
  );
  try {
    const { count } = await prisma.ingredient.createMany({
      data,
    });
    return res
      .status(200)
      .json({ success: true, message: `Added ${count} rows` });
  } catch (err) {
    console.error(err as Error);
    return res.status(400).json({ error: "Failed to add Ingredients" });
  }
};

export { addIngredients };
