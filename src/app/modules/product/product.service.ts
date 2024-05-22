import { TProduct } from './product.interface';
import { Product } from './product.model';

// create product
const createProductToDB = async (productData: TProduct) => {
  // create product model instance
  const product = new Product(productData);
  const result = await product.save();
  return result;
};

// get all products
const getAllProductsFromDB = async (searchTerm?: string) => {
  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    const result = await Product.find({
      $or: [{ name: regex }, { description: regex }, { category: regex }],
    });

    if (result.length === 0) {
      // eslint-disable-next-line prefer-const
      let error = new Error('Product not found');
      error.name = 'productNOtFound';
      error.message = 'Product not found';
      throw error;
    }

    return result;
  }
  const result = await Product.find();
  return result;
};

// get single product
const getSingleProductFromDB = async (productId: string) => {
  const resutl = await Product.findOne({ _id: productId });
  return resutl;
};

// update the product data
const updateProductToDB = async (productId: string, productData: TProduct) => {
  const result = await Product.findByIdAndUpdate(productId, productData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete the product by id
const deleteProductFromDB = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

// export all serivces
export const ProductServices = {
  createProductToDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductToDB,
  deleteProductFromDB,
};
