import { Router } from "express";
import getAuthMiddleware from "../getAuthMiddleware";
import { UserRole } from "@prisma/client";
import {
  getIngredients,
  deleteIngredients,
  deleteAllIngredients,
  addIngredients,
  updateIngredient,
} from "../controllers/ingredients";

const routes = Router();

const requiresDefaultAccount = getAuthMiddleware([UserRole.DEFAULT]);

routes.post("/addIngredients", [requiresDefaultAccount, addIngredients]);
routes.get("/ingredients", [requiresDefaultAccount, getIngredients]);
routes.post("/deleteIngredients", [requiresDefaultAccount, deleteIngredients]);
routes.post("/deleteAllIngredients", [
  requiresDefaultAccount,
  deleteAllIngredients,
]);
routes.post("/updateIngredient", [requiresDefaultAccount, updateIngredient]);

export { routes as ingredientRoutes };