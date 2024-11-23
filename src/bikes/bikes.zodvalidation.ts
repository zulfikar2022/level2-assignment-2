import { z } from "zod";
import { BikeCategory } from "./bikes.interfaces.js";

const bikeValidationSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    price: z.number().positive({ message: "Price must be a positive number" }),
    category: z.nativeEnum(BikeCategory, { message: "Invalid bike category" }),
    quantity: z
      .number()
      .int()
      .min(0, { message: "Quantity cannot be negative" }),
    description: z.string().optional(),
  })
  .strict();

const orderValidationSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    product: z.string({ message: "Invalid product ID" }),
    quantity: z.number().int({ message: "Quantity must be a number" }).min(1, {
      message: "Quantity must be a positive integer and greater than 0",
    }),
  })
  .strict();

export { bikeValidationSchema, orderValidationSchema };
