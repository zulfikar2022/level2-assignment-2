import CustomResponse from "./bikes.success.js";
import { Order, Product } from "./bikes.models.js";
import { CustomError } from "./bikes.error.js";
export async function getAllProducts(req, res) {
    const queryParameters = req.query;
    const key = Object.keys(queryParameters)[0];
    try {
        if (!key) {
            const products = await Product.find();
            res.json(new CustomResponse("Bikes Retrieved successfully", products));
        }
        else {
            const products = await Product.find(queryParameters);
            res.json(new CustomResponse("Bikes Retrieved successfully", products));
        }
    }
    catch (error) {
        res
            .status(404)
            .json(new CustomError("Bikes not found", { error }, error.stack))
            .status(404);
    }
}
export async function getSpecificProduct(req, res) {
    try {
        const product = await Product.findById(req.params.productId);
        res.json(new CustomResponse("Bike retrieved successfully", product));
    }
    catch (error) {
        res
            .json(new CustomError("Bike not found", { error }, error.stack))
            .status(404);
    }
}
export async function updateSpecificProduct(req, res) {
    const newProduct = req.body;
    newProduct.category = newProduct.category.trim();
    try {
        newProduct.inStock = newProduct.quantity > 0;
        const product = await Product.findByIdAndUpdate(req.params.productId, newProduct, { new: true });
        res.json(new CustomResponse("Bike updated successfully", product));
    }
    catch (error) {
        res.json(new CustomError("Bike not updated", { error }, error.stack));
    }
}
export async function deleteSpecificProduct(req, res) {
    try {
        const bike = await Product.findById(req.params.productId);
        if (!bike) {
            res.json(new CustomResponse("Bike does not exist and cannot be deleted", {}, false));
        }
        const product = await Product.findByIdAndDelete(req.params.productId);
        res.json(new CustomResponse("Bike deleted successfully", product));
    }
    catch (error) {
        res.json(new CustomError("Bike not deleted", { error }, error.stack));
    }
}
export async function createProduct(req, res) {
    const newProduct = req.body;
    newProduct.category = newProduct.category.trim();
    try {
        newProduct.inStock = newProduct.quantity > 0;
        const product = new Product(newProduct);
        await product.save();
        res.json(new CustomResponse("Bike created successfully", product));
    }
    catch (error) {
        res.json(new CustomError("Bike not created", { error }, error.stack));
    }
}
export async function createOrder(req, res) {
    const orderBody = req.body;
    try {
        const product = await Product.findById(orderBody.product);
        if (!product) {
            res
                .json(new CustomError("Product not found", {}, "fake error stack"))
                .status(404);
            return;
        }
        else {
            try {
                const totalPrice = product.price * orderBody.quantity;
                const order = { ...orderBody, totalPrice };
                const newOrder = new Order(order);
                await newOrder.save();
                res.json(new CustomResponse("Order created successfully", newOrder));
            }
            catch (error) {
                res.json(new CustomError("Order is not created", { error }, error.stack));
            }
        }
    }
    catch (error) {
        res
            .json(new CustomError("Product not found", { error }, error.stack))
            .status(404);
    }
}
export async function getTotalRevenue(req, res) {
    try {
        const revenue = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalPrice" },
                },
            },
        ]);
        res.json(new CustomResponse("Revenue calculated successfully", {
            totalRevenue: revenue[0]?.totalRevenue || 0,
        }));
    }
    catch (error) {
        res.json(new CustomError("Failed to calculate revenue", { error }, error.stack));
    }
}
export async function getAllOrders(req, res) {
    try {
        const orders = await Order.find();
        res.json(new CustomResponse("Orders Retrieved successfully", orders));
    }
    catch (error) {
        res
            .json(new CustomError("Orders not found", { error }, error.stack))
            .status(404);
    }
}
