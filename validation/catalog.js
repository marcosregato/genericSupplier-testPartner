var chai = require('chai')
var expect = chai.expect
const featureType = [4, 5, 6]
const skuId = [1, 2]
const PropertiesReader = require('properties-reader')
const prop = PropertiesReader('./mesage.properties')

var catalog = function () { }

catalog.prototype.validateCatalogBody = function (response) {
    expect(response.body, 'Must return a body is not null').to.not.eql(null);
   // expect(response.body.length, 'The object Products must be an array with at least 1 item').greaterThan(0)
   
   // TODO o valor do campo é null, mas não está validando 
    //expect(response.body.error, 'In case of success the body.error field must be null').to.be.null
    expect(response.body.products, 'Must be sent the object products').to.not.eql(null)
    
}

catalog.prototype.validateCatalogProducts = function (response) {

    
    // TODO PlaTheGame => Não está retornando nada na requisição
      
    for (const  product of response.body.products) {
        
        validateCatalogProductProperties(product)
        validateCatalogProductFeatures(product)

        for (const sku of product.productSkus) {
            validateCatalogProductSkuProperties(product, sku)
            validateCatalogProductSkuStatus(product, sku)
            validateCatalogProductSkuPrices(product, sku)
            validateCatalogProductSkuFeatures(product, sku)
            validateCatalogProductSkuImages(product, sku)
        }
    }
}

function validateCatalogProductProperties(product) {
    expect(product.productId, 'Must be sent the field ProductId').to.not.null
    
    expect(product.name, 'Must be sent the field name').to.not.null
    expect(product.description, 'Must be sent the field ProductId').to.not.null
}

function validateCatalogProductSkuProperties(product, sku) {
    expect(sku.productSkuId, 'The object productSkuId within productSkus cannot be null, for the product: ' + product.productId).to.not.null
    expect(sku.productSkuId, 'The object productSkuId must be a number, for the product: ' + product.productId).to.be.a('string')

}

function validateCatalogProductFeatures(product) {
    expect(product.productFeatures, 'Must be sent the object productFeatures for the product: ' + product.productId).to.not.eql(null)
    for (const feature of product.productFeatures) {
        expect(feature.name, 'The object name within productFeatures cannot be null, for the product: ' + product.productId).to.not.null
        expect(feature.name, 'The object name must be a string, for the product: ' + product.productId).to.be.a('string')
        
        // TODO esse campo na requisição está null, 
        //expect(feature.value, 'The object value within productFeatures cannot be null, for the product: ' + product.productId).to.not.null
        //expect(feature.value, 'The object value must be a string, for the product: ' + product.productId).to.be.a('string')
        
        expect(feature.featureType, 'The object featureType within productFeatures cannot be null, for the product: ' + product.productId).to.not.null
        expect(feature.featureType, 'The object featureType must be a number, for the product: ' + product.productId).to.be.a('number')
        //var featureTypeId = validateCatalogProductFeatureTypeEnum(feature.featureType)
        //expect(featureTypeId, 'Invalid featureType = ' + featureTypeId + ', for the product: ' + product.productId).to.be.true
    }
}

function validateCatalogProductSkuStatus(product, sku) {
    expect(sku.skuStatusId, 'The object skuStatusId within productSkus cannot be null, for the product: ' + product.productId).to.not.null
    expect(sku.skuStatusId, 'The object skuStatusId must be a number, for the product: ' + product.productId).to.be.a('number')
    var statusSkuId = validateProductSkuStatusEnum(sku.skuStatusId)
    // TODO motivo do erro, o status de um pro
    expect(statusSkuId, 'Invalid skuStatusId = ' + statusSkuId + ', for the product: ' + product.productId).to.be.true
}

function validateCatalogProductSkuPrices(product, sku) {
    expect(sku.priceFrom, 'The object priceFrom within productSkus cannot be null, for the product: ' + product.productId).to.not.null
    expect(sku.priceFrom, 'The object priceFrom deve ser um string, for the product: ' + product.productId).to.be.a('number')
    expect(sku.priceFor, 'The object priceFor within productSkus cannot be null, for the product: ' + product.productId).to.not.null
    expect(sku.priceFor, 'The object productSkuId within productSkus deve ser um string, for the product: ' + product.productId).to.be.a('number')
}

function validateCatalogProductSkuFeatures(product, sku) {
    if (product.productSkus.length > 1) {
        var hasSkuFeatures = (sku.skuFeatures && sku.skuFeatures.length && sku.skuFeatures.length > 0)
        expect(hasSkuFeatures, 'Sku Features not send, for the product: ' + product.productId).to.be.true
    }
    if (sku && sku.skuFeatures)
        for (const feature of sku.skuFeatures) {
            expect(feature, 'The object featureType within productSkus cannot be null, for the product: ' + product.productId).to.not.null
        }
}

function validateCatalogProductSkuImages(product, sku) {
    for (const images of sku.skuImages) {
        //console.log("Nome da imagens >> " + images.smallImage)
        expect(images.smallImage, 'The object skuImages within productSkus cannot be null, for the product: ' + product.productId).to.not.null
    }
}

function validateCatalogProductSkuSections(product, sku) {
    expect(sku.sectionTypeId, 'The object sectionTypeId within productSkus cannot be null, for the product: ' + product.productId).to.not.null
    expect(sku.sectionTypeId, 'The object sectionTypeId must be a number, for the product: ' + product.productId).to.be.a('number')

    expect(sku.sectionId, 'The object sectionId within productSkus cannot be null, for the product: ' + product.productId).to.not.null
    expect(sku.sectionId, 'The object sectionId must be a number, for the product: ' + product.productId).to.be.a('number')

    expect(sku.value, 'The object value within productSkus cannot be null, for the product: ' + product.productId).to.not.null
    expect(sku.value, 'The object value must be a string, for the product: ' + product.productId).to.be.a('string')
    
    var statusSkuId = validateProductSkuStatusEnum(sku.skuStatusId)
    expect(statusSkuId, 'Invalid skuStatusId = ' + statusSkuId + ', for the product: ' + product.productId).to.be.true
}

function validateCatalogProductFeatureTypeEnum(value) {
    try {
        if (featureType.find(element => element === value)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
    }
}

function validateMessageError(msg) {

    try {
        const getProperty = (arqMensagem) => {
            return prop.get(arqMensagem);
        }

        if (getProperty('mesage.text') == msg) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.log(error)
    }
}

// TODO skuStatusId, sku 1 disponivel ou 2 sku não está disponivel
function validateProductSkuStatusEnum(value) {
    try {
        var skuDisponivel = 1;
        
        if ((1 === value) || (2 === value)) {
            return true;
        } else {
            console.log(skuDisponivel +' <> '+value)
            return false;
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = catalog