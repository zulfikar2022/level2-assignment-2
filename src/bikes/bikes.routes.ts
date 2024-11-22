import express, { Request, Response } from "express";
import {
  createProduct,
  deleteSpecificProduct,
  getAllProducts,
  getSpecificProduct,
  updateSpecificProduct,
  validateProduct,
} from "./bikes.controllers.js";
import { CustomError } from "./bikes.error.js";

export const bikeRouter = express.Router();

bikeRouter.get("/products", getAllProducts); // get all products
bikeRouter.get("/products/:productId", getSpecificProduct); // get specific product
bikeRouter.post("/products", validateProduct, createProduct); // create product
bikeRouter.put("/products/:productId", validateProduct, updateSpecificProduct); // update product
bikeRouter.delete("/products/:productId", deleteSpecificProduct); // delete product

// for undefined routes
bikeRouter.all("*", (req: Request, res: Response) => {
  res.json(new CustomError("Path not defined", {}, "fake error stack"));
});
