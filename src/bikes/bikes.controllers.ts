import { Request, Response } from "express";
import CustomResponse from "./bikes.success.js";
import { Order, Product } from "./bikes.models.js";
import { CustomError } from "./bikes.error.js";
import { bikeValidationSchema } from "./bikes.zodvalidation.js";
import { IProduct } from "./bikes.interfaces.js";

// get all products ( based on the query parameters or not )
export async function getAllProducts(req: Request, res: Response) {
  const queryParameters = req.query;
  const key = Object.keys(queryParameters)[0];

  try {
    if (!key) {
      const products = await Product.find();
      res.json(new CustomResponse("Bikes Retrieved successfully", products));
    } else {
      const products = await Product.find(queryParameters);
      res.json(new CustomResponse("Bikes Retrieved successfully", products));
    }
  } catch (error: any) {
    res
      .status(404)
      .json(new CustomError("Bikes not found", { error }, error.stack))
      .status(404);
  }
}

// get specific product based on the product id
export async function getSpecificProduct(req: Request, res: Response) {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(new CustomResponse("Bike retrieved successfully", product));
  } catch (error: any) {
    res
      .json(new CustomError("Bike not found", { error }, error.stack))
      .status(404);
  }
}

// update specific product based on the product id
export async function updateSpecificProduct(req: Request, res: Response) {
  const newProduct = req.body;
  newProduct.category = newProduct.category.trim();
  try {
    newProduct.inStock = newProduct.quantity > 0;
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      newProduct,
      { new: true }
    );
    res.json(new CustomResponse("Bike updated successfully", product));
  } catch (error: any) {
    res.json(new CustomError("Bike not updated", { error }, error.stack));
  }
}

// delete specific product based on the product id
export async function deleteSpecificProduct(req: Request, res: Response) {
  try {
    const bike = await Product.findById(req.params.productId);
    if (!bike) {
      res.json(
        new CustomResponse(
          "Bike does not exist and cannot be deleted",
          {},
          false
        )
      );
    }
    const product = await Product.findByIdAndDelete(req.params.productId);
    res.json(new CustomResponse("Bike deleted successfully", product));
  } catch (error: any) {
    res.json(new CustomError("Bike not deleted", { error }, error.stack));
  }
}

// create a new product
export async function createProduct(req: Request, res: Response) {
  const newProduct = req.body;
  newProduct.category = newProduct.category.trim();
  try {
    newProduct.inStock = newProduct.quantity > 0;
    const product = new Product(newProduct);
    await product.save();
    res.json(new CustomResponse("Bike created successfully", product));
  } catch (error: any) {
    res.json(new CustomError("Bike not created", { error }, error.stack));
  }
}

// create a new order
export async function createOrder(req: Request, res: Response) {
  const orderBody = req.body;
  try {
    const product = await Product.findById(orderBody.product);

    if (!product) {
      res
        .json(new CustomError("Product not found", {}, "fake error stack"))
        .status(404);
      return;
    } else {
      try {
        const totalPrice = product.price * orderBody.quantity;
        const order = { ...orderBody, totalPrice };
        const newOrder = new Order(order);
        await newOrder.save();
        res.json(new CustomResponse("Order created successfully", newOrder));
      } catch (error: any) {
        res.json(
          new CustomError("Order is not created", { error }, error.stack)
        );
      }
    }
  } catch (error: any) {
    res
      .json(new CustomError("Product not found", { error }, error.stack))
      .status(404);
  }
}

// get total revenue
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

// get all orders
export async function getAllOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find();
    res.json(new CustomResponse("Orders Retrieved successfully", orders));
  } catch (error: any) {
    res
      .json(new CustomError("Orders not found", { error }, error.stack))
      .status(404);
  }
}
