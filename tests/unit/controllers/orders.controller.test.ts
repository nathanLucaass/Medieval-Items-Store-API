import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import OrderModel from '../../../src/database/models/order.model';
import getAllOrdersController from '../../../src/controller/order.controller';
import * as getAllOrders from '../../../src/services/order.services';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should return an array of orders', async function () {
    const orders = [
      { id: 1, userId: 1 },
      { id: 2, userId: 1 },
      { id: 3, userId: 2 },
    ];

    sinon.stub(getAllOrders, 'default').resolves(orders);

    await getAllOrdersController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(orders);
  });
});
