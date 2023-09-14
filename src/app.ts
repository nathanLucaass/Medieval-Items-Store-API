import express from 'express';
import productRegisterController from './database/controller/product.controller';

// Initial Commit 

const app = express();

app.use(express.json());

app.post('/products', productRegisterController);

export default app;
