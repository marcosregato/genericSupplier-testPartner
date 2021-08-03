'use strict';

var chai = require('chai')
var assert = chai.assert
var expect = chai.expect

let config = require('../config')

const Enviroment = require('../environment/environment')
var env = new Enviroment().getEnvironment()
var Util = require('../util')
var UrlService = require('../services/urlService')

const regra = require('../regra') 

var ValidatePartner = function (that) {
  this.util = new Util(that)
  this.UrlService = new UrlService(that)
}

ValidatePartner.prototype.validacaoStatus200 = function (response) {
  expect(response, 'Deve retornar statusCode 200').to.have.status(config.util.HTTP.OK);
  return "ok"
}
ValidatePartner.prototype.validacaoBody = function (response) {
  expect(response.body, 'Deve retornar um body diferente de vazio').to.not.eql(null);
  return "ok"
}

ValidatePartner.prototype.validacaoBodyCatalogo = function (response) {
  expect(response.body.error, 'Em caso de sucesso o campo body.error deve ser null').to.eql(null)
  expect(response.body.products, 'Must be sent the object products').to.not.eql(null)
  expect(response.body.products.length, 'The object Products deve ser um array com pelo menos 1 item').greaterThan(0)

  console.log("Lendo o body do produto")
  for (const product of response.body.products) {
    
    expect(product.productId, 'Must be sent the field ProductId').to.not.null
    expect(product.name, 'Must be sent the field name').to.not.null
    expect(product.description, 'Must be sent the field ProductId').to.not.null
    expect(product.productFeatures, 'Must be sent the object productFeatures for the product: ' + product.productId).to.not.eql(null)

    //TODO: Validar se productFeatures realmente é obrigatório
    //expect(product.productFeatures.length, 'The object productFeatures deve ser um array com pelo menos 1 item, for the product: ' + product.productId).greaterThan(0)
    console.log("Lendo o body do productFeatures")
    for (const feature of product.productFeatures) {
      expect(feature.featureType, 'The object featureType within productFeatures cannot be null, for the product: ' + product.productId).to.not.null
      expect(feature.featureType, 'The object featureType must be a number, for the product: ' + product.productId).to.be.a('number')
      var valorId = regra.validarValorFeatureType(feature.featureType)
      expect(valorId, 'O valor id featureType = '+ valorId +', for the product: ' + product.productId).to.be.true
    }

    //TODO: Caso um produto tenha mais que 1 SKU, deve ser obrigatório o envio do SkuFeatures, com Type 1, 2 ou 3
    console.log("Lendo o body do SKU do produto")
    for (const skus of product.productSkus) {
      expect(skus.productSkuId, 'The object productSkuId within productSkus cannot be null, for the product: ' + product.productId).to.not.null
      expect(skus.productSkuId, 'The object productSkuId must be a number, for the product: ' + product.productId).to.be.a('string')

      expect(skus.skuStatusId, 'The object skuStatusId within productSkus cannot be null, for the product: ' + product.productId).to.not.null
      var valorId = regra.validarProductSkuId(skus.skuStatusId)
      expect(skus.skuStatusId, 'The object skuStatusId must be a number, for the product: ' + product.productId).to.be.a('number')
      expect(valorId, 'O valor skuStatusId = '+valorId+', for the product: ' + product.productId).to.be.true
      //TODO: criar uma logica para validar essa parte
      //expect(skus.ean, 'The object ean within productSkus pode ser null, for the product: ' + product.productId).to.not.null
      
      expect(skus.priceFrom, 'The object priceFrom within productSkus cannot be null, for the product: ' + product.productId).to.not.null
      expect(skus.priceFrom, 'The object priceFrom deve ser um string, for the product: ' + product.productId).to.be.a('number')
      
      expect(skus.priceFor, 'The object priceFor within productSkus cannot be null, for the product: ' + product.productId).to.not.null
      expect(skus.priceFor, 'The object productSkuId within productSkus deve ser um string, for the product: ' + product.productId).to.be.a('number')
      
      console.log("Lendo o body SKU skuFeatures")
      for (const feature of skus.skuFeatures) {
        expect(feature, 'The object featureType within productSkus cannot be null, for the product: ' + product.productId).to.not.null
    //  expect(feature, 'The object featureType deve ser um string, for the product: ' + product.productId).to.be.a('string')
      }

      for (const images of skus.skuImages) {
        expect(images, 'The object skuImages within productSkus cannot be null, for the product: ' + product.productId).to.not.null
    //  expect(images, 'The object skuImages deve ser um string, for the product: ' + product.productId).to.be.a('string')
      } 
      
    }
  
  }

  return "ok"
}

module.exports = ValidatePartner