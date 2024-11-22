import express from "express";
import { createProduct, getProducts, validateProduct, } from "./bikes.controllers.js";
import { CustomError } from "./bikes.error.js";
export const bikeRouter = express.Router();
bikeRouter.get("/products", getProducts);
bikeRouter.post("/products", validateProduct, createProduct);
bikeRouter.all("*", (req, res) => {
    res.json(new CustomError("Path not defined", {}));
});
