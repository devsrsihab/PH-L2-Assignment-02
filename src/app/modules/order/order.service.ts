import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

// create order
const createOrderToDB = async (orderData: TOrder) => {
  // create product model instance
  const { email, productId, price, quantity } = orderData;

  const product = await Product.findById(productId); // if the product id now found then not run the below code

  const isDuplicateOrder = await Order.findOne({ email, productId, price, quantity });
  if (isDuplicateOrder) {
    // eslint-disable-next-line prefer-const
    let error = new Error('Duplicate order: an order with the same details already exists.');
    error.name = 'duplicateOrder';
    error.message = 'Duplicate order, an order with the same details already exists.';
    throw error;
  }

  if (product && product.inventory && product.inventory.quantity >= quantity) {
    // decrease product quantity
    product.inventory.quantity -= quantity;
    // if the quntity less then 1 then set inStock to false
    if (product.inventory.quantity < 1) {
      product.inventory.inStock = false;
    }
    await product?.save();

    const order = new Order(orderData);
    const result = await order.save();
    return result;
  } else {
    // eslint-disable-next-line prefer-const
    let error = new Error('Insufficient quantity: Insufficient quantity available in inventory');
    error.name = 'insuficianQuantity';
    error.message = 'Insufficient quantity available in inventory';
    throw error;
  }
};

// get all orders
const getAllOrdersFromDB = async (email?: string) => {
  if (email) {
    const regex = new RegExp(email, 'i');
    const result = await Order.find({ email: regex });
    if (result.length === 0) {
      // eslint-disable-next-line prefer-const
      let error = new Error('Order not found');
      error.name = 'orderNOtFound';
      error.message = 'Order not found';
      throw error;
    }
    return result;
  }

  const result = await Order.find();
  return result;
};

// export services
export const OrderServices = {
  createOrderToDB,
  getAllOrdersFromDB,
};
