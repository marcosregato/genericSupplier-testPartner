'use strict'

const partnerFactory = require("../factory/partnerFactory")
const PartnerFactory = new partnerFactory

var PartnerService = function(that){ }

PartnerService.prototype.buildCliente = (env) => {
    const supportedBuild = {
        'SATELITAL-CASHFISICO': PartnerFactory.buildSatelitalCashFisico(env),
        'PLAYTHEGAME-HML': PartnerFactory.buildPlayTheGameHml(env),
        'PLAYTHEGAME-PRD': PartnerFactory.buildPlayTheGamePrd(env),
        'WLC-HML': PartnerFactory.buildWLCHml(env),
        'IKE-HML': PartnerFactory.buildIKEHml(env),
        'POLISHOP-HML': PartnerFactory.buildPolishopHml(env)
        
    }
    return supportedBuild[env]
}

module.exports = PartnerService