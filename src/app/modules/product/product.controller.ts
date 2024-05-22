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
      message: error.message,
    });
  }
};

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;

    if (searchTerm) {
      const searchResult = await ProductServices.getAllProductsFromDB(searchTerm);
      res.status(200).json({
        success: true,
        message: `Products matching search term ${searchTerm} fetched successfully!`,
        data: searchResult,
      });
    } else {
      const result = await ProductServices.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const productData = req.body;
    const zodParseData = ProductValidationSchema.parse(productData);
    const result = await ProductServices.updateProductToDB(productId, zodParseData);

    res.status(200).json({
      success: true,
      message: 'Product Updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product Deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
