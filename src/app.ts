import express from 'express';
import { productRegisterController, getAllProductsController } 
  from './controller/product.controller';
// import getAllOrdersController from './controller/order.controller';
import loginController from './controller/login.controller';

const app = express();

app.use(express.json());

// Product routes
app.post('/products', productRegisterController); // Post a new product
app.get('/products', getAllProductsController); // Get all products

// Order routes
// app.get('/orders', getAllOrdersController); // Get all orders

// Login route
app.post('/login', loginController); // Login a existing user

export default app;