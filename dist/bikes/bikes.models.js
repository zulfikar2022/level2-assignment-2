import { model, Schema } from "mongoose";
import { BikeCategory } from "./bikes.interfaces.js";
// Schemas are here
export const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price must be positive"],
    },
    category: {
        type: String,
        enum: Object.values(BikeCategory),
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity cannot be negative"],
    },
    inStock: {
        type: Boolean,
    },
}, { timestamps: true });
export const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    product: {
        type: String,
        required: true,
        validate: async function (value) {
            const product = await Product.findOne({ _id: value });
            return !!product;
        },
        message: "Product does not exist in the Products collection",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"],
    },
    totalPrice: {
        type: Number,
        required: true,
        min: [0, "Total price cannot be negative"],
    },
}, { timestamps: true });
// Models are here
export const Product = model("Product", ProductSchema);
export const Order = model("Order", OrderSchema);
