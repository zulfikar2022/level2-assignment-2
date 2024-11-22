import express from "express";
import { fakeController } from "./bikes.controllers.js";
import { CustomError } from "./bikes.error.js";
export const bikeRouter = express.Router();
bikeRouter.get("/", fakeController);
bikeRouter.all("*", (req, res) => {
    res.json(new CustomError("Path not defined", {}));
});
