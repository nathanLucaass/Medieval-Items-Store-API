import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { productRegisterController, getAllProductsController } from '../../../src/controller/product.controller';

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
    req.body = {
      name: 'Product 1',
      price: '10.00',
      orderId: 1,
    };

    await productRegisterController(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({
      id: 6,
      name: 'Product 1',
      price: '10.00',
    });
   
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
