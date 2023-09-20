import { expect } from 'chai';
import sinon from 'sinon';
import login from '../../../src/services/login.services';
import UserModel from '../../../src/database/models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as token from '../../../src/token';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  it('should return an error if some field is missing', async function () {
    const response = await login('', '');

    expect(response).to.be.deep.equal({
      status: 'TYPEERROR',
      data: '"username" and "password" are required',
    });
  });

  it('should return an error if user is not found', async function () {
    sinon.stub(UserModel, 'findOne').resolves(null);

    const response = await login('username', 'password');

    expect(response).to.be.deep.equal({
      status: 'ERROR',
      data: 'Username or password invalid',
    });
  });

  it('should return a token if user is found', async function () {
    const returnUser = UserModel.build({ 
      id: 1, 
      username: 'user',
      vocation: 'worker',
      level: 1,
      password: 'password',
    });

    sinon.stub(UserModel, 'findOne').resolves(returnUser);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(jwt, 'sign').returns();

    const response = await login('user', 'password');

    expect(response.data).to.not.be.equal(null)

  });

});
