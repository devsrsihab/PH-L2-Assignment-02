/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import ProductValidationSchema from './product.validation';
import { ProductServices } from './product.service';

// create product
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
      message: 'something went wrong',
      data: error,
    });
  }
};

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
    });
  }
};

// get  single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: 'Data Could Not Found',
      data: error.message,
    });
  }
};


// update product 
const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const productData = req.body
    const zodParseData = ProductValidationSchema.parse(productData)
    const result = await ProductServices.updateProductToDB(productId, zodParseData);

    res.status(200).json({
      success: true,
      message: 'Product Updated successfully!',
      data: result,
    });
    
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      data: error.message,
    });
  }
}




export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
};
