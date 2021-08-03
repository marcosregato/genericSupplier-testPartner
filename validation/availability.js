var chai = require('chai')
var expect = chai.expect

var availability = function () { }

availability.prototype.validateAvailabilitySku = function (responseSku, sku) {
    validateAvailabilityProperties(responseSku)
    validateAvailabilityWithCatalog(responseSku, sku)
}

availability.prototype.validateAvailabilityFailure = function (responseSku) {
    expect(responseSku.statusCode, 'Must return statusCode 200 for the sku: ' + responseSku.productSkuId).to.eql(config.util.HTTP.OK)
    expect(responseSku.body.error, 'In case of failure the body.error field must be not null for the sku: ' + responseSku.productSkuId).to.not.eql(null)
    expect(responseSku.body.isAvailable, 'In case of failure the sku ' + responseSku.productSkuId + ' must be not availability').to.not.eql(true)
}

availability.prototype.validatePacelamento = function (responseParcelamento) {
    let valorSemParcela, parcels, value
    
    for(const paymentOptions of responseParcelamento.body.paymentOptions ){
        expect(paymentOptions.paymentId, "PaymentId Não pode ser null ").to.not.eql(null)
        expect(paymentOptions.paymentId, "PaymentId não pode ser banana").to.be.a("number")
        //console.log(">>> paymentId " + paymentOptions.paymentId)
        for(const installmentOptions of paymentOptions.installmentOptions){
            expect(installmentOptions.description, "Description Não pode ser null ").to.not.eql(null)
            expect(installmentOptions.description, "Description não pode ser banana").to.be.a("string")

            expect(installmentOptions.parcels, "Parcels Não pode ser null ").to.not.eql(null)
            expect(installmentOptions.parcels, "Parcels não pode ser banana").to.be.a("number")

            expect(installmentOptions.value, "Value Não pode ser null ").to.not.eql(null)
            expect(installmentOptions.value, "Value não pode ser banana").to.be.a("number")

            //valorSemParcela, 
            parcels = installmentOptions.parcels
            value = installmentOptions.value
        }
    }
    //expect(validateAvailabilityParcelamento(valorSemParcela, parcels, value),"O valor é false").to.be.true
}



function validateAvailabilityProperties(responseSku) {
    expect(responseSku.statusCode, 'Must return statusCode 200 for the sku: ' + responseSku.productSkuId).to.eql(config.util.HTTP.OK)
    expect(responseSku.body.error, 'In case of success the body.error field must be null for the sku: ' + responseSku.productSkuId).to.eql(null)
    expect(responseSku.body.priceFrom, 'priceFrom cannot be null for the sku: ' + responseSku.productSkuId).to.be.not.null
    expect(responseSku.body.priceFrom, 'priceFrom must be a number for the sku: ' + responseSku.productSkuId).to.be.a("number")
    expect(responseSku.body.priceFor, 'priceFrom cannot be null for the sku: ' + responseSku.productSkuId).to.be.not.null
    expect(responseSku.body.priceFor, 'priceFrom ust be a number for the sku: ' + responseSku.productSkuId).to.be.a("number")
    expect(responseSku.body.isAvailable, 'isAvailable cannot be null for the sku: ' + responseSku.productSkuId).to.be.not.null
}

function validateAvailabilityWithCatalog(responseSku, sku) {
    if (sku.skuStatusId == 1)
        expect(responseSku.body.isAvailable, 'isAvailable must be true for the sku: ' + responseSku.productSkuId).to.be.true
    else
        expect(responseSku.body.isAvailable, 'isAvailable must be null for the sku: ' + responseSku.productSkuId).to.be.false
    expect(sku.priceFor, 'The priceFor of Catalog the sku:' + sku.productSkuId +
        '. Must be equal to the value of availability. Catalog Price: ' + sku.priceFor
        + 'Availability Price: ' + responseSku.body.priceFor).to.eql(responseSku.body.priceFor)
    expect(sku.priceFrom, 'The priceFrom of Catalog the sku:' + sku.productSkuId +
        '. Must be equal to the value of availability. Catalog Price: ' + sku.priceFor
        + 'Availability Price: ' + responseSku.body.priceFor).to.eql(responseSku.body.priceFrom)
}

// TODO pegar o valor valorSemParcela e fazer a validação
function validateAvailabilityParcelamento(valorSemParcela, parcels, value){
    // Valor de deferença entre as parcelas  
    var valorCentavos = 0.20
    // verificando se os parametro estão nulos
	if((parcels !=null) & (value != null)){
		// calculando o valor do produto com a quantidade de parcelas
        var calcParcelamento =  parcels * value;	
		// calculando a diferença entre os valores
        var result = valorSemParcela - calcParcelamento;
		// verificar se o valor 
		if((result <= valorCentavos) | (result > valorCentavos)){
			return true;
		}else{
			return false;
		}
	}
	
}

module.exports = availability