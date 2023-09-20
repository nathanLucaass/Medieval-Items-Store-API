import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { productRegisterController, getAllProductsController } from '../../../src/controller/product.controller';
import * as ProductService from '../../../src/services/product.services';
import ProductModel from '../../../src/database/models/product.model';

chai.use(sinonChai);

describe('productRegisterController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should return status 201 and a product when productRegisterController is called with a valid product', async function () {
    const returnProduct = ProductModel.build({
      id: 1,
      name: 'Product 1',
      price: '10.00',
      orderId: 1,
    });

    req.body = {
      name: 'Product 1',
      price: '10.00',
      orderId: 1,
    };

    sinon.stub(ProductService, 'productRegister').resolves({ status: 'SUCCESS', data: returnProduct.toJSON() });

    await productRegisterController(req, res);

    expect(res.status).to.have.been.calledWith(201);
    
   
  });

  it('should return status 400 and an error message when productRegisterController is called with an invalid product', async function () {
    req.body = {
      name: 'Product 1',
      price: '10.00',
    };

    await productRegisterController(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ error: 'Some fields are missing' });
  });

});

describe('getAllProductsController', function () {
  it('should return status 200 and an array of products when getAllProductsController is called', async function () {
    const req = {} as Request;
    const res = {} as Response;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    const products = [
      {
        id: 1,
        name: 'Product 1',
        price: '10.00',
        orderId: 1,
      },
      {
        id: 2,
        name: 'Product 2',
        price: '20.00',
        orderId: 2,
      },
    ]

    sinon.stub(ProductService, 'getAllProducts').resolves(products);

    await getAllProductsController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });
});
