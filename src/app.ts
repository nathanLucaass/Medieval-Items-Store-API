import express from 'express';
import { productRegisterController, getAllProductsController } 
  from './database/controller/product.controller';

// Initial Commit 

const app = express();

app.use(express.json());

app.post('/products', productRegisterController); // Post a new product
app.get('/products', getAllProductsController); // Get all products

export default app;
