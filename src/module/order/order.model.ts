import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: [true, "Please provide your email"],
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
        },
        message: "{VALUE} is not a valid email",
      },
      immutable: true, // Keeps the email immutable for a particular order
    },
    product: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);

// import { model, Schema } from "mongoose";
// import { IOrder } from "./order.interface";

// const orderSchema = new Schema<IOrder>(
//   {
//     email: {
//       type: String,
//       required: [true, "Please provide your email"],
//       validate: {
//         validator: function (value: string) {
//           return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
//         },
//         message: "{VALUE} is not a valid email",
//       },
//       immutable: true,
//     },
//     product: { type: String, required: true },
//     quantity: { type: Number, required: true, min: 1 },
//     totalPrice: { type: Number },
//   },
//   { timestamps: true }
// );

// export const Order = model<IOrder>("Order", orderSchema);
