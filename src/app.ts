import express, { Application, json } from "express";
import cors from "cors";

export const app: Application = express();

// middlewares here
app.use(express.json());
app.use(cors());

//router
