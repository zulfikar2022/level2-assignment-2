import { Request, Response } from "express";
import CustomResponse from "./bikes.success.js";
import { Order, Product } from "./bikes.models.js";
import { CustomError } from "./bikes.error.js";
import {
  bikeValidationSchema,
  orderValidationSchema,
} from "./bikes.zodvalidation.js";

export async function validateProduct(
  req: Request,
  res: Response,
  next: Function
) {
  try {
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
  const newProduct = req.body;
  try {
    bikeValidationSchema.parse(newProduct);

    newProduct.inStock = newProduct.quantity > 0;
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      newProduct,
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
  const newProduct = req.body;
  try {
    bikeValidationSchema.parse(newProduct);

    newProduct.inStock = newProduct.quantity > 0;
    const product = new Product(newProduct);
    await product.save();
    res.json(new CustomResponse("Bike created", product));
  } catch (error: any) {
    res.json(new CustomError("Bike not created", { error }, error.stack));
  }
}

export async function createOrder(req: Request, res: Response) {
  const orderBody = req.body;
  try {
    const product = await Product.findById(orderBody.product);

    if (!product) {
      res.json(new CustomError("Product not found", {}, "fake error stack"));
      return;
    } else {
      try {
        const totalPrice = product.price * orderBody.quantity;
        const order = { ...orderBody, totalPrice };
        const newOrder = new Order(order);
        await newOrder.save();
        res.json(new CustomResponse("Order created", newOrder));
      } catch (error: any) {
        res.json(
          new CustomError("Order is not created", { error }, error.stack)
        );
      }
    }
  } catch (error: any) {
    res.json(new CustomError("Product not found", { error }, error.stack));
  }
}

export async function getTotalRevenue(req: Request, res: Response) {
  try {
    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.json(
      new CustomResponse("Revenue calculated successfully", {
        totalRevenue: revenue[0]?.totalRevenue || 0,
      })
    );
  } catch (error: any) {
    res.json(
      new CustomError("Failed to calculate revenue", { error }, error.stack)
    );
  }
}
