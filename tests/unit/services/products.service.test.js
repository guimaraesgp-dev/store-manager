const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { productsmock, productsmockId } = require('./mocks/products.service.mocks');

describe('Camada Service', () => {
  describe('Acessa todos os produtos', function () {
    afterEach(() => sinon.restore());
    it('Com sucesso', async function () {
      sinon.stub(productsModel, 'getAllProducts').resolves(productsmock)
      const result = await productsService.getAllProducts();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(productsmock);
      });
  });
  describe('Acessa um produto pelo id', function () {
    afterEach(() => sinon.restore());
    it('Com sucesso', async function () {
      const id = 3;
      sinon.stub(productsModel, 'getProductsId').resolves(productsmockId);
      const result = await productsService.getProductsId(id);
      expect(result).to.be.an('object');
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(productsmockId);
    });
  });
  it('Com erro', async function () {
    const id = 3;
    sinon.stub(productsModel, 'getProductsId').resolves(null);
    const result = await productsService.getProductsId(id);
    expect(result).to.be.an('object');
    expect(result).to.be.deep.equal({ type: 404, message: 'Product not found' });
  });
});