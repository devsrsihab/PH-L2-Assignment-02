import { TProduct } from "./product.interface";
import { Product } from "./product.model";



const createProductToDB = async (productData: TProduct) => {
    // create product model instance
    const product = new Product(productData);
    const result = await product.save();
    return result;
}

// export all serivces
export const ProductServices = {
    createProductToDB
}
