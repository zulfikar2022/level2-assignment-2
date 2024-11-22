import express, { Request, Response } from "express";
import {
  createProduct,
  getProducts,
  validateProduct,
} from "./bikes.controllers.js";
import { CustomError } from "./bikes.error.js";

export const bikeRouter = express.Router();

bikeRouter.get("/products", getProducts);
bikeRouter.post("/products", validateProduct, createProduct);

bikeRouter.all("*", (req: Request, res: Response) => {
  res.json(new CustomError("Path not defined", {}));
});
