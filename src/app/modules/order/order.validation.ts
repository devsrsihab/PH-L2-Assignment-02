import { z } from 'zod';

// order schema validaton
const OrderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number().min(1, 'price must be greater than 0'),
  quantity: z.number().min(1, 'quantity must be greater than 0'),
});

export default OrderValidationSchema;
