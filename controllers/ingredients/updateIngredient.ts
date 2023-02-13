import { Request, Response } from "express";
import { prisma } from "../../main";

const updateIngredient = async (
  { body: { ingredientId, newIngredient } }: Request,
  res: Response
) => {
  try {
    await prisma.ingredient.update({
      where: {
        id: ingredientId,
      },
      data: newIngredient,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error((err as Error).message);
    return res.status(400).json({ error: "Failed to delete all Ingredients" });
  }
};

export { updateIngredient };
