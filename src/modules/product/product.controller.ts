/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import ProductValidationSchema from './product.validation';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    // pass the data in the zod schema
    const zodParseData = ProductValidationSchema.parse(product);
    const result = await ProductServices.createProductToDB(zodParseData);

    // success msg
    res.status(200).json({
      success: true,
      message: 'product created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:  'something went wrong',
      data: error,
    });
  }
};

export const ProductController = {
  createProduct,
};
