
const Enviroment = require('../environment/environment')
const ApiService = require('../services/apiService')
const partnerService = require('../services/partnerService')
const catalog = require('../validation/catalog')
const utils = require('../validation/utils')
const auth = require('../validation/auth')
const apiService = new ApiService(this)
const PartnerService = new partnerService(this)
const env = new Enviroment().getEnvironment()
const supplierParameters = PartnerService.buildCliente(env) // <<<<<<<
const catalogValidation = new catalog(this)
const utilsValidation = new utils(this)
const authValidation = new auth(this)
var responseCatalog


let responseToken 

describe('Test Suite Auth - Partner: ' + env, async function () {

    before('setup', async function () {

    })

    if (supplierParameters.authorizationType == "basic") {
        it('Validate Auth - Basic', async function () {            
            authValidation.validateBasic(supplierParameters)
        })
    }

    if (supplierParameters.authorizationType == 'oauth') {
        it('Validate Auth - oAuth', async function () {
            responseToken = await apiService.getAuthorization(supplierParameters)
            authValidation.validateOauth(responseToken)
        })
    }



})
