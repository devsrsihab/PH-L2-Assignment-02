import { TOrder } from './order.interface';
import { Order } from './order.model';

// create order
const createOrderToDB = async (orderData: TOrder) => {
  // create product model instance
  const order = new Order(orderData);
  const result = await order.save();
  return result;
};

// get all orders
const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};

// export services
export const OrderServices = {
  createOrderToDB,
  getAllOrdersFromDB,
};
