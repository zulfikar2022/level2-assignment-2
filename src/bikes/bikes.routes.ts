import express, { Request, Response } from "express";
import { fakeController } from "./bikes.controllers.js";
import { CustomError } from "./bikes.error.js";

export const bikeRouter = express.Router();

bikeRouter.get("/", fakeController);

bikeRouter.all("*", (req: Request, res: Response) => {
  res.json(new CustomError("Path not defined", {}));
});
