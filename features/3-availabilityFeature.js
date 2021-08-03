
const Enviroment = require('../environment/environment')
const ApiService = require('../services/apiService')
const partnerService = require('../services/partnerService')
const catalog = require('../validation/catalog')
const utils = require('../validation/utils')
const availability = require('../validation/availability')
const apiService = new ApiService(this)
const PartnerService = new partnerService(this)
const env = new Enviroment().getEnvironment()
const supplierParameters = PartnerService.buildCliente(env)
const catalogValidation = new catalog(this)
const utilsValidation = new utils(this)
const availabilityValidation = new availability(this)
var responseCatalog
var chai = require('chai')
var expect = chai.expect

describe('Test Suite Availability - Partner: ' + env, async function () {

    before('setup', async function () {
        responseCatalog = await apiService.getCatalog(supplierParameters)
        await utilsValidation.validateResponseStatusCode(responseCatalog)
        await catalogValidation.validateCatalogBody(responseCatalog)
        await catalogValidation.validateCatalogProducts(responseCatalog)
    })

    it('Product availability in all catalog', async function () {
        for (const product of responseCatalog.body.products) {
            for (const sku of product.productSkus) {
                var responseAvailability = await apiService.getAvailability(supplierParameters, sku.productSkuId)
                availabilityValidation.validateAvailabilitySku(responseAvailability, sku)
            }
        }
    })

    it('Product availability insuccess', async function () {
        var responseAvailability = await apiService.getAvailability(supplierParameters, 'SKU_INEXISTENTE')
        availabilityValidation.validateAvailabilityFailure(responseAvailability)
    })

    it('Parcelamento availability success', async function () {
        
        //var url = supplierParameters.baseUrl;
        
        for (const product of responseCatalog.body.products) {
            for (const sku of product.productSkus) {
                var responseParcelamento = await apiService.getParcelamento(supplierParameters, sku.productSkuId)
                availabilityValidation.validatePacelamento(responseParcelamento)                 
            }
        }
    })
})
