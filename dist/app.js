import express from "express";
import cors from "cors";
import { bikeRouter } from "./bikes/bikes.routes.js";
export const app = express();
// middlewares here
app.use(express.json());
app.use(cors());
app.use("/api", bikeRouter);
//router
