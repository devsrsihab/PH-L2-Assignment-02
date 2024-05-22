import mongoose, { Schema } from 'mongoose';
import { TInventory, TProduct, TVariants } from './product.interface';

// variants schema
const variantsSchema = new Schema<TVariants>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

// inventors schema
const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

// product schema
const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [String],
  variants: [variantsSchema],
  inventory: inventorySchema,
});

// product model
export const Product = mongoose.model<TProduct>('Product', productSchema);
