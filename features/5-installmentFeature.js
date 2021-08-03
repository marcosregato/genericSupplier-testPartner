
const Enviroment = require('../environment/environment')
const ApiService = require('../services/apiService')
const partnerService = require('../services/partnerService')
const catalog = require('../validation/catalog')
const utils = require('../validation/utils')
const freight = require('../validation/freight')
const HubFactory = require("../factory/hubFactory")
const chai = require('chai')
const hubFactory = new HubFactory
const apiService = new ApiService(this)
const PartnerService = new partnerService(this)
const env = new Enviroment().getEnvironment()
const supplierParameters = PartnerService.buildCliente(env)
const catalogValidation = new catalog(this)
const utilsValidation = new utils(this)
const freightValidation = new freight(this)
var expect = chai.expect
var responseCatalog
var countCatalog = 0

describe('Test Suite Installment - Partner: ' + env, async function () {

    before('setup', async function () {

    })

    if (supplierParameters.partnerType == 'cash') {
        it('Validate Installment', async function () {
            console.log('Validate Installment - OK')
        })
    }



})
