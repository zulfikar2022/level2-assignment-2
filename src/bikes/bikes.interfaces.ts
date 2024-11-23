import { Document, Types } from "mongoose";

// Enum for bike categories
export enum BikeCategory {
  Mountain = "Mountain",
  Road = "Road",
  Hybrid = "Hybrid",
  Electric = "Electric",
}

// TypeScript interface for Bike
export interface IProduct extends Document {
  name: string;
  brand: string;
  price: number;
  category: BikeCategory;
  description: string;
  quantity: number;
  inStock: boolean;
}

// TypeScript interface for Order
export interface IOrder extends Document {
  email: string;
  product: string; // Referencing the Product
  quantity: number;
  totalPrice: number;
}
