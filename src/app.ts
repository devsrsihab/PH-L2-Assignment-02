import express, { Application } from 'express';
import cors from 'cors';
import { ProductRoute } from './modules/product/product.route';
const app: Application = express();

// express parse
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', ProductRoute);


export default app;
