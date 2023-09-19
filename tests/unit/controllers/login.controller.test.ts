import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginController from '../../../src/controller/login.controller';
import login from '../../../src/services/login.services';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should return an error if some field is missing', async function () {
    req.body = { username: 'test' };

    await loginController(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"username" and "password" are required' });
  });

  it('should return an error if user is not found', async function () {
    req.body = { username: 'test', password: 'test' };
  
    await loginController(req, res);

    expect(res.status).to.have.been.calledWith(401);
  
    expect(res.json).to.have.been.calledWith({ message: 'Username or password invalid' });
  });

});


