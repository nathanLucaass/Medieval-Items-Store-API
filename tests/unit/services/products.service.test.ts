import { expect } from 'chai';
import sinon from 'sinon';
import productRegister from '../../../src/services/product.services';
import productModel from '../../../src/database/models/product.model';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  it('should return an error if some field is missing', async function () {
    const response = await productRegister({} as any);

    expect(response).to.be.deep.equal({
      status: 'ERROR',
      data: 'Some fields are missing',
    });
  });
  it('should return a product if all fields are provided', async function () {
    const product = {
      name: 'Product Name',
      price: 'Product Price',
      orderId: 1,
    };
    const response = {
      status: 'SUCCESS',
      data: {
        id: 7,
        name: 'Product Name',
        price: 'Product Price',
      },
    };
  
    sinon.stub(productModel, 'create').resolves(productModel.build(response.data));
  
    const result = await productRegister(product);
  
    expect(result.status).to.equal('SUCCESS');
  });
  
});
