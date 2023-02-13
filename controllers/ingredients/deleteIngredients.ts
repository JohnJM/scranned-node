import { Request, Response } from "express";
import { prisma } from "../../main";

const deleteIngredients = async (
  { body: { ingredientIds } }: Request,
  res: Response
) => {
  try {
    let counter = 0;
    await Promise.all(
      ingredientIds.map(async (id: string) => {
        await prisma.ingredient.delete({
          where: {
            id,
          },
        });
        counter++;
      })
    );
    return res
      .status(200)
      .json({ success: true, message: `Deleted ${counter} rows` });
  } catch (err) {
    console.error((err as Error).message);
    return res.status(400).json({ error: "Failed to delete Ingredients" });
  }
};

const deleteAllIngredients = async (
  { body: { userId: ownerId } }: Request,
  res: Response
) => {
  try {
    const { count } = await prisma.ingredient.deleteMany({
      where: {
        ownerId: { equals: ownerId },
      },
    });
    return res
      .status(200)
      .json({ success: true, message: `Deleted ${count} rows` });
  } catch (err) {
    console.error((err as Error).message);
    return res.status(400).json({ error: "Failed to delete allIngredients" });
  }
};

export { deleteIngredients, deleteAllIngredients };
