const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/connection');
const { productsModel } = require('../../../src/models');
const { productsmock, productsmockId } = require('../models/mocks/products.model.mocks');

describe('Camada Model', () => {
  describe('Acessa todos os produtos', function () {
    before(async function () {
      sinon.stub(connection, 'execute').resolves([productsmock])
    })
    after(async function () {
      connection.execute.restore();
    });
    it('com sucesso', async function () {
      const result = await productsModel.getAllProducts();
      expect(result).to.be.an('array');
      expect(result).to.equal(productsmock);
    })
  })
  describe('Acessa um produto pelo id', function () {
    before(async function () {
      sinon.stub(connection, 'execute').resolves([productsmockId]);
    });
    after(async function () {
      connection.execute.restore();
    });
    const id = 1;
    it('com sucesso', async function () {
      const result = await productsModel.getProductsId(id);
      expect(result).to.be.an('object');
      expect(result).to.be.keys(['id', 'name']);

    });
  });
});
