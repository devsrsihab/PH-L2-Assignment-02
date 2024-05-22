/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import OrderValidationSchema from './order.validation';
import { OrderServices } from './order.service';

// create order
const creatOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const zodParseData = OrderValidationSchema.parse(order);
    const result = await OrderServices.createOrderToDB(zodParseData);

    // success msg
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error.name === 'CastError' && error.kind === 'ObjectId'
          ? `Invalid product ID format: ${error.value}`
          : error.message,
    });
  }
};

// get all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;

    if (email) {
      const result = await OrderServices.getAllOrdersFromDB(email);
      // success msg
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    } else {
      const result = await OrderServices.getAllOrdersFromDB();
      // success msg
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const OrderController = {
  creatOrder,
  getAllOrders,
};
