import { Request, Response } from "express";
import CustomResponse from "./bikes.success.js";
import { Product } from "./bikes.models.js";
import { CustomError } from "./bikes.error.js";
import { bikeValidationSchema } from "./bikes.zodvalidation.js";
import { IProduct } from "./bikes.interfaces.js";

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

export async function getAllProducts(req: Request, res: Response) {
  const queryParameters = req.query;
  const key = Object.keys(queryParameters)[0];

  try {
    if (!key) {
      const products = await Product.find();
      res.json(new CustomResponse("Bikes", products));
    } else {
      const products = await Product.find(queryParameters);
      res.json(new CustomResponse("Bikes", products));
    }
  } catch (error: any) {
    res.json(new CustomError("Bikes not found", { error }, error.stack));
  }
}

export async function getSpecificProduct(req: Request, res: Response) {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(new CustomResponse("Bike", product));
  } catch (error: any) {
    res.json(new CustomError("Bike not found", { error }, error.stack));
  }
}

export async function updateSpecificProduct(req: Request, res: Response) {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    res.json(new CustomResponse("Bike updated", product));
  } catch (error: any) {
    res.json(new CustomError("Bike not updated", { error }, error.stack));
  }
}

export async function deleteSpecificProduct(req: Request, res: Response) {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    res.json(new CustomResponse("Bike deleted", product));
  } catch (error: any) {
    res.json(new CustomError("Bike not deleted", { error }, error.stack));
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(new CustomResponse("Bike created", { ...product.toObject() }));
  } catch (error: any) {
    console.log(error);
    res.json(new CustomError("Bike not created", { error }, error.stack));
  }
}
