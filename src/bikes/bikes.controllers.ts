import { Request, Response } from "express";
import CustomResponse from "./bikes.success.js";
import { Product } from "./bikes.models.js";
import { CustomError } from "./bikes.error.js";
import { bikeValidationSchema } from "./bikes.zodvalidation.js";

export async function validateProduct(
  req: Request,
  res: Response,
  next: Function
) {
  try {
    bikeValidationSchema.parse(req.body);
    next();
  } catch (error: any) {
    // console.log(error.issues);
    const errorsToBeSent = error.issues;
    console.log(error.stack);
    res
      .status(400)
      .json(new CustomError("Validation Error", errorsToBeSent, error.stack));
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await Product.find();
    res.json(new CustomResponse("Products", { products }));
  } catch (error: any) {
    res.json(new CustomError("Products not found", { error }, error.stack));
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(new CustomResponse("Product created", { ...product.toObject() }));
  } catch (error: any) {
    console.log(error);
    res.json(new CustomError("Product not created", { error }, error.stack));
  }
}
