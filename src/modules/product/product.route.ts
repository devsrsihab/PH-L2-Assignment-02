import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/products', ProductController.createProduct);
router.get('/products', ProductController.getAllProducts);
router.get('/products/:productId', ProductController.getSingleProduct);
router.put('/products/:productId', ProductController.updateProduct);

// export
export const ProductRoute = router;
