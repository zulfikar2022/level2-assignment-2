import { z } from "zod";
import { BikeCategory } from "./bikes.interfaces.js";
const bikeValidationSchema = z
    .object({
    name: z.string().min(1, { message: "Name is required" }).trim(),
    brand: z.string().min(1, { message: "Brand is required" }).trim(),
    price: z.number().positive({ message: "Price must be a positive number" }),
    category: z
        .string()
        .transform((val) => val.trim()) // Trim spaces
        .refine((val) => Object.values(BikeCategory).includes(val), {
        message: "Invalid bike category",
    }),
    quantity: z
        .number()
        .int()
        .min(0, { message: "Quantity cannot be negative" }),
    description: z.string().trim().optional(),
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
