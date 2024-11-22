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
        console.log(error.stack);
        res
            .status(400)
            .json(new CustomError("Validation Error", errorsToBeSent, error.stack));
    }
}
export async function getAllProducts(req, res) {
    try {
        const products = await Product.find();
        res.json(new CustomResponse("Bikes", products));
    }
    catch (error) {
        res.json(new CustomError("Bikes not found", { error }, error.stack));
    }
}
export async function getSpecificProduct(req, res) {
    try {
        const product = await Product.findById(req.params.productId);
        res.json(new CustomResponse("Bike", product));
    }
    catch (error) {
        res.json(new CustomError("Bike not found", { error }, error.stack));
    }
}
export async function updateSpecificProduct(req, res) {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        res.json(new CustomResponse("Bike updated", product));
    }
    catch (error) {
        res.json(new CustomError("Bike not updated", { error }, error.stack));
    }
}
export async function deleteSpecificProduct(req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        res.json(new CustomResponse("Bike deleted", product));
    }
    catch (error) {
        res.json(new CustomError("Bike not deleted", { error }, error.stack));
    }
}
export async function createProduct(req, res) {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(new CustomResponse("Bike created", { ...product.toObject() }));
    }
    catch (error) {
        console.log(error);
        res.json(new CustomError("Bike not created", { error }, error.stack));
    }
}
