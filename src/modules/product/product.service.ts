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
const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

// get single product
const getSingleProductFromDB = async (productId:string) =>    {
   const resutl = await Product.findOne({_id: productId});
   return resutl;
}

// export all serivces
export const ProductServices = {
  createProductToDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
};
