import express from "express";
import { fakeController } from "./bikes.controllers.js";
export const bikeRouter = express.Router();
bikeRouter.get("/", fakeController);
