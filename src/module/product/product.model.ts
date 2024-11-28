import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: [true, "Please provide product name"] },
    brand: { type: String, required: [true, "Please provide product brand"] },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      min: 0,
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
      minlength: 5,
    },
    quantity: {
      type: Number,
      required: [true, "Please provide product quantity"],
      min: 0,
    },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);
