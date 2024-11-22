import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import { bikeRouter } from "./bikes/bikes.routes.js";
import { CustomError } from "./bikes/bikes.error.js";

export const app: Application = express();

// middlewares here
app.use(express.json());
app.use(cors());
app.use("/api", bikeRouter);

app.all("*", (req: Request, res: Response) => {
  res.json(new CustomError("Path not defined", {}));
});

//router
