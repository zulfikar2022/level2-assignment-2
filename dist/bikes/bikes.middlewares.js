import { ProductSchema } from "./bikes.models.js";
ProductSchema.pre("save", function (next) {
    const product = this;
    console.log("pre save middleware called on ProductSchema");
    console.log(this);
    // Set inStock based on quantity
    product.inStock = product.quantity > 0;
    next();
});
ProductSchema.pre("findOneAndUpdate", function (next) {
    console.log("pre findOneAndUpdate middleware called on ProductSchema");
    const update = this.getUpdate();
    if (update.quantity !== undefined) {
        update.inStock = update.quantity > 0;
    }
    next();
});
