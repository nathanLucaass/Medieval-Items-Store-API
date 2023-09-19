import { expect } from 'chai';
import sinon from 'sinon';
import login from '../../../src/services/login.services';
import UserModel from '../../../src/database/models/user.model';

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

});
