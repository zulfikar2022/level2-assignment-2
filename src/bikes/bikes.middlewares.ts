import { CustomError } from "./bikes.error.js";
import { IOrder, IProduct } from "./bikes.interfaces.js";
import { ProductSchema } from "./bikes.models.js";

ProductSchema.pre("save", function (next) {
  const product = this as IProduct;
  console.log("pre save middleware called on ProductSchema");
  console.log(this);

  // Set inStock based on quantity
  product.inStock = product.quantity > 0;
  next();
});

ProductSchema.pre("findOneAndUpdate", function (next) {
  console.log("pre findOneAndUpdate middleware called on ProductSchema");
  const update = this.getUpdate() as Partial<IProduct>;

  if (update.quantity !== undefined) {
    update.inStock = update.quantity > 0;
  }

  next();
});
