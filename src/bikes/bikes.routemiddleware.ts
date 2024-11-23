import { Request, Response } from "express";
import {
  bikeValidationSchema,
  orderValidationSchema,
} from "./bikes.zodvalidation.js";
import { CustomError } from "./bikes.error.js";

export async function validateProduct(
  req: Request,
  res: Response,
  next: Function
) {
  try {
    req.body.category = req.body.category.trim();
    bikeValidationSchema.parse(req.body);
    next();
  } catch (error: any) {
    const errorsToBeSent = error.issues;
    res
      .status(400)
      .json(new CustomError("Validation Error", errorsToBeSent, error.stack));
  }
}

export async function validateOrder(
  req: Request,
  res: Response,
  next: Function
) {
  // validate order
  try {
    orderValidationSchema.parse(req.body);
    next();
  } catch (error: any) {
    res.json(new CustomError("Order Validation Error", { error }, error.stack));
  }
}
