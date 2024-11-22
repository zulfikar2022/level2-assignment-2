import { Request, Response } from "express";
import CustomResponse from "./bikes.success.js";

export function fakeController(req: Request, res: Response) {
  res.json(
    new CustomResponse("This is a response", { data: "data values here" })
  );
}
