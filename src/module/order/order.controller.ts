import { Request, Response } from "express";
import { productService } from "../product/product.service";
import { Order } from "./order.model";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      email,
      product: productId,
      quantity,
      totalPrice: givenTotalPrice,
    } = req.body;

    const product = await productService.getSingleProduct(productId);

    if (!product || product.quantity < quantity) {
      res.json({ message: "Insufficient stock", status: false });
      return;
    }

    const totalPrice = givenTotalPrice
      ? givenTotalPrice
      : product.price * quantity;

    const order = new Order({
      email,
      product: productId,
      quantity,
      totalPrice,
    });

    product.quantity = product.quantity - quantity;
    product.inStock = product.quantity > 0 ? true : false;

    await productService.updateProduct(productId, product);
    const result = await orderService.createOrder(order);

    res.json({
      message: "Order created successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    res.json({
      message: "Order Creation failed",
      status: false,
      error,
    });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ["$totalPrice", "$quantity"] } },
        },
      },
    ]);
    res.json({
      message: "Revenue calculated successfully",
      status: true,
      data: revenue ? revenue[0] : { totalRevenue: 0 },
    });
  } catch (error) {
    res.status(400).json({
      message: "Error calculating revenue",
      status: false,
      error,
    });
  }
};

export const orderController = {
  createOrder,
  getRevenue,
};
