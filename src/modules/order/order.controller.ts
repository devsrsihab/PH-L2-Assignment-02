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
      message: 'something went wrong',
      data: error,
    });
  }
};

export const OrderController = {
  creatOrder,
};
