var chai = require('chai')
var expect = chai.expect
var freight = function () { }

freight.prototype.validateFreightResponse = function (responseFreight, sku) {
    
        expect(responseFreight.statusCode, 'Must return statusCode 200 for the sku: ' + sku.productSkuId).to.eql(config.util.HTTP.OK)
        expect(responseFreight.body.error, 'In case of success the body.error field must be null for the sku: ' + sku.productSkuId).to.eql(null)
        expect(responseFreight.body.costPrice, 'costPrice cannot be null for the sku: ' + sku.productSkuId).not.to.null
        expect(responseFreight.body.costPrice, 'costPrice can be more then 0 for de sku: ' + sku.productSkuId).greaterThan(0)
        expect(responseFreight.body.items, 'items cannot be null for the sku: ' + sku.productSkuId).not.to.null
        expect(responseFreight.body.items.length, 'The object items must be an array with at least 1 item for the sku: ' + sku.productSkuId).greaterThan(0)
        for (const item of responseFreight.body.items) {
            expect(item.sku, 'sku cannot be null for the sku: ' + sku.productSkuId).not.to.null
            expect(item.sku, 'Sku response (' + item.sku + ') can be equal to sku request (' + sku.productSkuId + ')').to.eql(sku.productSkuId)
            expect(responseFreight.body.scheduledDeliveryDate, 'scheduledDeliveryDate cannot be null for the sku: ' + sku.productSkuId).not.to.null
        }
   
}


freight.prototype.validateFreightFailure = function (responseFreight, sku) {
    expect(responseFreight.statusCode, 'Not must be return statusCode 200 for the sku: ' + sku).to.not.eql(config.util.HTTP.OK)
    expect(responseFreight.body.costPrice ? true : false, 'costPrice can be null for the sku: ' + sku).to.eql(false)

}



module.exports = freight