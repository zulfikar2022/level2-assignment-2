import express from "express";
import { createOrder, createProduct, deleteSpecificProduct, getAllOrders, getAllProducts, getSpecificProduct, getTotalRevenue, updateSpecificProduct, } from "./bikes.controllers.js";
import { CustomError } from "./bikes.error.js";
import { validateOrder, validateProduct } from "./bikes.routemiddleware.js";
export const bikeRouter = express.Router();
bikeRouter.get("/products", getAllProducts); // get all products
bikeRouter.get("/products/:productId", getSpecificProduct); // get specific product
bikeRouter.post("/products", validateProduct, createProduct); // create product
bikeRouter.put("/products/:productId", validateProduct, updateSpecificProduct); // update product
bikeRouter.delete("/products/:productId", deleteSpecificProduct); // delete product
bikeRouter.post("/orders", validateOrder, createOrder); // create order
bikeRouter.get("/orders/revenue", getTotalRevenue); // get total revenue
// An additional route for getting all orders which is not defined in the assignment description
bikeRouter.get("/orders", getAllOrders); // get all orders
// for undefined routes
bikeRouter.all("*", (req, res) => {
    res.json(new CustomError("Path not defined", {}, "fake error stack"));
});
