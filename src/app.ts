import express, { Application } from 'express';
import cors from 'cors';
import { ProductRoute } from './modules/product/product.route';
import { OrderRouter } from './modules/order/order.route';
const app: Application = express();

// express parse
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', ProductRoute);
app.use('/api', OrderRouter);

export default app;
