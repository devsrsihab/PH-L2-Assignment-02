import { z } from 'zod';

// inventory vlidation
const InventoryValidationSchema = z.object({
  quantity: z.number().positive('quantity must be greater than 0'),
  inStock: z.boolean(),
});

// variants validation
const VariantsValidationSchema = z.array(
  z.object({
    type: z.string().min(1, 'type is required'),
    value: z.string().min(1, 'value is require'),
  }),
);

// product schema
const ProductValidationSchema = z.object({
  name: z.string().regex(/^[A-Za-z\s]+$/,'name should only contain alphabets').min(1, 'name is required').max(20),
  description: z.string().min(1, 'description is required').max(150),
  price: z.number().positive('price must be greater than 0'),
  category: z.string().min(1, 'category is required').max(20),
  tags: z.array(z.string()),
  variants: VariantsValidationSchema,
  inventory: InventoryValidationSchema,
});

export default ProductValidationSchema;
