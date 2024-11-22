import express from "express";
import { createProduct, getAllProducts, getSpecificProduct, validateProduct, } from "./bikes.controllers.js";
import { CustomError } from "./bikes.error.js";
export const bikeRouter = express.Router();
bikeRouter.get("/products", getAllProducts);
bikeRouter.get("/products/:productId", getSpecificProduct);
bikeRouter.post("/products", validateProduct, createProduct);
bikeRouter.all("*", (req, res) => {
    res.json(new CustomError("Path not defined", {}, "fake error stack"));
});
