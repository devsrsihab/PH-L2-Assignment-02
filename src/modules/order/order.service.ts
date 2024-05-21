import { TOrder } from "./order.interface";
import { Order } from "./order.model";



// create order 
const createOrderToDB = async (orderData:TOrder) => {
  // create product model instance
  const order = new Order(orderData);
  const result = await order.save();
  return result;
}

// export services
export const OrderServices = {
  createOrderToDB,
};