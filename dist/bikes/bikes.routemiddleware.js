import { bikeValidationSchema, orderValidationSchema, } from "./bikes.zodvalidation.js";
import { CustomError } from "./bikes.error.js";
export async function validateProduct(req, res, next) {
    try {
        bikeValidationSchema.parse(req.body);
        next();
    }
    catch (error) {
        const errorsToBeSent = error.issues;
        res
            .status(400)
            .json(new CustomError("Validation Error", errorsToBeSent, error.stack));
    }
}
export async function validateOrder(req, res, next) {
    // validate order
    try {
        orderValidationSchema.parse(req.body);
        next();
    }
    catch (error) {
        res.json(new CustomError("Order Validation Error", { error }, error.stack));
    }
}
