import { Request, Response } from 'express'; 
import { productRegister, getAllProducts } from '../../services/product.services';

const productRegisterController = async (req: Request, res: Response): Promise<void> => { // Promise<void> means that the function does not return anything
  const response = await productRegister(req.body);
  
  if (response.status === 'SUCCESS') {
    res.status(201).json(response.data);
  } else {
    res.status(400).json({ error: response.data });
  }
};

const getAllProductsController = async (_req: Request, res: Response): Promise<void> => {
  const products = await getAllProducts();

  res.status(200).json(products);
};

export { productRegisterController, getAllProductsController };