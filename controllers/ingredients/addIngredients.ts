import { Ingredient } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../main";

const addIngredients = async (
  { body: { ingredients, userId: ownerId } }: Request,
  res: Response
) => {
  const ingredientsWithOwner: Ingredient[] = ingredients.map(
    (ingredient: Omit<Ingredient, "ownerId">) => ({
      ownerId,
      ...ingredient,
    })
  );
  try {
    const { count } = await prisma.ingredient.createMany({
      data: ingredientsWithOwner,
    });
    return res
      .status(200)
      .json({ success: true, message: `Added ${count} rows` });
  } catch (err) {
    console.error((err as Error).message);
    return res.status(400).json({ error: "Failed to add Ingredients" });
  }
};

export { addIngredients };
