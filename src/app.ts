import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import { bikeRouter } from "./bikes/bikes.routes.js";
import { CustomError } from "./bikes/bikes.error.js";

export const app: Application = express();

// middlewares here
app.use(express.json()); // for parsing application/json
app.use(cors()); // for cross-origin requests
app.use("/api", bikeRouter); // for all bike routes

// for undefined routes
app.all("*", (req: Request, res: Response) => {
  res.json(new CustomError("Path not defined", {}, "fake error stack here"));
});
