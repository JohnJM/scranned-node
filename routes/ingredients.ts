import {  Router } from "express";
import path from "path";
import getAuthMiddleware from "../getAuthMiddleware";
import { UserRole } from "@prisma/client";
import { addIngredients } from "../controllers/ingredients/addIngredients";
import { getIngredients } from "../controllers/ingredients/getIngredients";
import { deleteIngredients, deleteAllIngredients } from "../controllers/ingredients/deleteIngredients";
import { updateIngredient } from "../controllers/ingredients/updateIngredient";

const routes = Router();

const requiresDefaultAccount = getAuthMiddleware([UserRole.DEFAULT]);

routes.post("/addIngredients", [requiresDefaultAccount, addIngredients]);
routes.get("/ingredients", [requiresDefaultAccount, getIngredients]);
routes.post("/deleteIngredients", [requiresDefaultAccount, deleteIngredients]);
routes.post("/deleteAllIngredients", [requiresDefaultAccount, deleteAllIngredients]);
routes.post("/updateIngredient", [requiresDefaultAccount, updateIngredient]);

export { routes as ingredientRoutes };