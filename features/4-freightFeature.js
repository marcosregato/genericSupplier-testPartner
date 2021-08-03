
const Enviroment = require('../environment/environment')
const ApiService = require('../services/apiService')
const partnerService = require('../services/partnerService')
const catalog = require('../validation/catalog')
const utils = require('../validation/utils')
const freight = require('../validation/freight')
const HubFactory = require("../factory/hubFactory")
const chai = require('chai')
const { text } = require('express')
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

describe('Test Suite Freight - Partner: ' + env, async function () {

    before('setup', async function () {
        responseCatalog = await apiService.getCatalog(supplierParameters)
        await utilsValidation.validateResponseStatusCode(responseCatalog)
        await catalogValidation.validateCatalogBody(responseCatalog)
        await catalogValidation.validateCatalogProducts(responseCatalog)

        for (const product of responseCatalog.body.products)
            for (const sku of product.productSkus)
                ++countCatalog

    })

    
    it('Product freight in all catalog', async function () {
        var errorCount = 0
        
        const host = responseCatalog.req.host;

        if(host != '18.228.121.107'){

            for (const product of responseCatalog.body.products) {
                for (const sku of product.productSkus) {
                    try {
                        // TODO chama o método buildBodyFreight da classe hubFactory do pacote factory
                        // retorna o body 
                        var bodyRequest = hubFactory.buildBodyFreight(sku.productSkuId, 1) //sku.priceFor, 1)
                        // TDOD envia o body(bodyRequest) para o metodo postFreight da classe partnerService do pacote services
                        var response = await apiService.postFreight(supplierParameters, bodyRequest)
                        
                        // TODO chama o método validateFreightResponse da classe freight do pacote validation
                        freightValidation.validateFreightResponse(response, sku, countCatalog)
                    }
                    catch (ex) {
                        console.log(ex.message)
                        //console.log(JSON.stringify(response.body))
                        ++errorCount
                    }
                }
            }
        
            const errorRate = (errorCount / countCatalog * 100).toFixed(2)
            expect(parseFloat(errorRate), 'Error rate (' + errorRate + '%) in freight is more than 30% for the ZipCode: 06454000').to.be.lessThan(30)
        }
    })


    

    it('Product freight insuccess', async function () {
        var bodyRequest = hubFactory.buildBodyFreight('SKU_INEXISTENTE', 100, 1)
        var response = await apiService.postFreight(supplierParameters, bodyRequest)
        freightValidation.validateFreightFailure(response, 'SKU_INEXISTENTE')
    })

})
