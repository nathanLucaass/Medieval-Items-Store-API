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
  status: 'ERROR', data: string
};

const productRegister = async (product: RecivedProduct): Promise<LoginResponse> => {
  if (!product.name || !product.price || !product.orderId) {
    return { status: 'ERROR', data: 'Some fields are missing' };
  }
  
  const newProduct = await productModel.create(product);

  const { orderId, ...productWhitoutOrderId } = newProduct.toJSON();
  
  return { status: 'SUCCESS', data: productWhitoutOrderId };
};

const getAllProducts = async (): Promise<Product[]> => {
  const products = await productModel.findAll();

  const mappedProducts: Product[] = products.map((item) => item.toJSON());

  return mappedProducts;
};

export { productRegister, getAllProducts };
