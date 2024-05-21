import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

// routes
router.post('/orders', OrderController.creatOrder);
router.get('/orders', OrderController.getAllOrders);

// export
export const OrderRouter = router;
