import CustomResponse from "./bikes.success.js";
import { Product } from "./bikes.models.js";
import { CustomError } from "./bikes.error.js";
import { bikeValidationSchema } from "./bikes.zodvalidation.js";
export async function validateProduct(req, res, next) {
    try {
        bikeValidationSchema.parse(req.body);
        next();
    }
    catch (error) {
        // console.log(error.issues);
        const errorsToBeSent = error.issues;
        res.status(400).json(new CustomError("Validation Error", errorsToBeSent));
    }
}
export async function getProducts(req, res) {
    try {
        const products = await Product.find();
        res.json(new CustomResponse("Products", { products }));
    }
    catch (error) {
        res.json(new CustomError("Products not found", { error }));
    }
}
export async function createProduct(req, res) {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(new CustomResponse("Product created", { ...product.toObject() }));
    }
    catch (error) {
        console.log(error);
        res.json(new CustomError("Product not created", { error }));
    }
}
