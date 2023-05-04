const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productsmock } = require('./mocks/products.controller.mocks');

describe('products Controller', () => {
  afterEach(() => sinon.restore());
  it('Rertona todos os produtos', async () => {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAllProducts').resolves({ type: null, message: productsmock });

    await productsController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsmock);
  });
  it('Retorna todos os produtos por ID corretos', async () => {
    const req = {
      params: {
        id: 3,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getProductsId').resolves({ type: null, message: productsmock[0] });

    await productsController.getProductsId(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsmock[0]);
  });
  it('Retorna todos os produtos ID incorretos', async () => {
    const req = {
      params: {
        id: 10,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getProductsId').resolves({ type: 404, message: 'Product not found' });

    await productsController.getProductsId(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});