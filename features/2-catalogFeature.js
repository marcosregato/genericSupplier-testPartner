
const Enviroment = require('../environment/environment')
const ApiService = require('../services/apiService')
const partnerService = require('../services/partnerService')
const catalog = require('../validation/catalog')
const utils = require('../validation/utils')
const apiService = new ApiService(this)
const PartnerService = new partnerService(this)
const env = new Enviroment().getEnvironment()
const supplierParameters = PartnerService.buildCliente(env)
const catalogValidation = new catalog(this)
const utilsValidation = new utils(this)
var responseCatalog

describe('Test Suite Catalog - Partner: ' + env, async function () {

    before('setup', async function () {
        responseCatalog = await apiService.getCatalog(supplierParameters)
    })

    it('Catalog response StatusCode must return 200', async function () {
        await utilsValidation.validateResponseStatusCode(responseCatalog)
    })

    it('Catalog response must return valid body', async function () {
        await catalogValidation.validateCatalogBody(responseCatalog)
    })

    it('Catalog response must return valid products', async function () {
        await catalogValidation.validateCatalogProducts(responseCatalog)
    })

})
