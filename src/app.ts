/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Application } from 'express';
import cors from 'cors';
import { ProductRoute } from './app/modules/product/product.route';
import { OrderRouter } from './app/modules/order/order.route';
const app: Application = express();

// express parse
app.use(express.json());
app.use(cors());

app.use('/api', ProductRoute);
app.use('/api', OrderRouter);

// Catch-all route for handling route not found errors
app.use((req, res, next) => {
  res.status(404).send({
    success: false,
    error: 'Route Not Found',
  });
  next();
});

export default app;
