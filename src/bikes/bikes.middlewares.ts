import { CustomError } from "./bikes.error.js";
import { IOrder, IProduct } from "./bikes.interfaces.js";
import { ProductSchema } from "./bikes.models.js";
import { OrderSchema } from "./bikes.models.js";
import { Product } from "./bikes.models.js";

ProductSchema.pre("save", function (next) {
  const product = this as IProduct;
  console.log("pre save middleware called");

  // Set inStock based on quantity
  product.inStock = product.quantity > 0;
  next();
});

ProductSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Partial<IProduct>;

  if (update.quantity !== undefined) {
    update.inStock = update.quantity > 0;
  }

  next();
});

OrderSchema.pre("save", async function (next) {
  const order = this as IOrder;

  try {
    const product = await Product.findById(order.product);
    if (product) {
      order.totalPrice = product.price * order.quantity;
    }
    next();
  } catch (error) {
    next(new CustomError("Product not found", { error }));
  }
});
