import productModel from '../database/models/product.model';
import { Product } from '../types/Product';

type RecivedProduct = {
  name: string;
  price: string;
  orderId: number;
};

type LoginResponse = {
  status: 'SUCCESS',
  data: Product 
} | {
  status: 'ERROR', error: string
};

const productRegister = async (product: RecivedProduct): Promise<LoginResponse> => {
  if (!product.name || !product.price || !product.orderId) {
    return { status: 'ERROR', error: 'Some fields are missing' };
  }
  
  const newProduct = await productModel.create(product);
  const { orderId, ...productWhitoutOrderId } = newProduct.toJSON();
  
  return { status: 'SUCCESS', data: productWhitoutOrderId };
};

export default productRegister;
