"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, "Please provide product name"] },
    brand: { type: String, required: [true, "Please provide product brand"] },
    price: {
        type: Number,
        required: [true, "Please provide product price"],
        min: [0, "Products price cannot be negative"],
    },
    category: {
        type: String,
        enum: {
            values: [
                "Writing",
                "Office Supplies",
                "Art Supplies",
                "Educational",
                "Technology",
            ],
            message: "{VALUE} is not valid, please provide a valid category ",
        },
        required: [true, "Please provide product category"],
    },
    description: {
        type: String,
        required: [true, "Please provide product description"],
        minlength: [5, "Description must be greater then 5 character"],
    },
    quantity: {
        type: Number,
        required: [true, "Please provide product quantity"],
        min: [0, "Quantity cannot be negative"],
    },
    inStock: { type: Boolean, default: true },
}, { timestamps: true });
exports.Product = (0, mongoose_1.model)("Product", productSchema);
