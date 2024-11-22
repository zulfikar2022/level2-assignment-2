import express from "express";
import cors from "cors";
import { bikeRouter } from "./bikes/bikes.routes.js";
import { CustomError } from "./bikes/bikes.error.js";
export const app = express();
// middlewares here
app.use(express.json());
app.use(cors());
app.use("/api", bikeRouter);
// for undefined routes
app.all("*", (req, res) => {
    res.json(new CustomError("Path not defined", {}, "fake error stack here"));
});
