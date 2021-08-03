'use strict'

var partnerFactory = function () { }

partnerFactory.prototype.buildPlayTheGameHml = function (env) {
    var configExternal = {
        "supplierId": 10000,
        "partnerType": "points",
        "paginationActive": false,
        "baseUrl": "https://app-dev.playthegames.com.br/ptg/servlet",
        "authorizationType": "basic",
        "authorizationHeader": {
            "Authorization": "Basic aXRhdS1sdG06aXRhdTEyMw=="
        },
        "routeCatalog": "/com.playthegame.aimportacaoprodutosltm",
        "routeAvailability": "/com.playthegame.aconsultadisponibilidadeltm",
        "routeFreight": "/com.playthegame.acalculodefreteltm",
        "routeOrder": "/com.playthegame.acriarpedidoltm",
        "routeTracking": "/get/tracking",
        "routePaymentOptions": "/get/PaymentOptions?value=",
        "payment": {
            "cardNumber": "0000000000000001",
            "expirationMonth": "12",
            "expirationYear": "2030",
            "ownerName": "Owner Name",
            "ownerDocument": "11111111111",
            "securityCode": "123"
        }
    }
    return configExternal
}


partnerFactory.prototype.buildPolishopHml = function (env) {
    var configExternal = {
        "supplierId": 10000,
        "partnerType": "cash",
        "paginationActive": false,
        "baseUrl": "http://apps-dev.polishop.com/marketplace_iupp/api/polishop",
        "authorizationType": "basic",
        "authorizationHeader": {
            "Authorization": "Basic bHRtOmdkZ05PMzRTbmw="
        },
        "routeCatalog": "/get/PRODUCT",
        "routeAvailability": "/get/availability?Productskuid=",
        "routeFreight": "/get/freight",
        "routeOrder": "/post/orderLtm",
        "routeTracking": "/get/tracking",
        "routePaymentOptions": "/get/PaymentOptions?value=",
        "payment": {
            "cardNumber": "0000000000000001",
            "expirationMonth": "12",
            "expirationYear": "2030",
            "ownerName": "Owner Name",
            "ownerDocument": "11111111111",
            "securityCode": "123"
        }
    }
    return configExternal
}



partnerFactory.prototype.buildPlayTheGamePrd = function (env) {
    var configExternal = {
        "supplierId": 10000,
        "partnerType": "points",
        "paginationActive": false,
        "baseUrl": "https://app-dev.playthegames.com.br/ptg/servlet",
        "authorizationType": "basic",
        "authorizationHeader": {
            "Authorization": "Basic aXRhdS1sdG06aXRhdTEyMw=="
        },
        "routeCatalog": "/com.playthegame.aimportacaoprodutosltm",
        "routeAvailability": "/com.playthegame.aconsultadisponibilidadeltm",
        "routeFreight": "/com.playthegame.acalculodefreteltm",
        "routeOrder": "/com.playthegame.acriarpedidoltm",
        "routeTracking": "/get/tracking",
        "routePaymentOptions": "/get/PaymentOptions?value=",
        "payment": {
            "cardNumber": "0000000000000001",
            "expirationMonth": "12",
            "expirationYear": "2030",
            "ownerName": "Owner Name",
            "ownerDocument": "11111111111",
            "securityCode": "123"
        }
    }
    return configExternal
}

partnerFactory.prototype.buildWLCHml = function (env) {
    var configExternal = {
        "supplierId": 10000,
        "partnerType": "points",
        "paginationActive": false,
        "baseUrl": "http://validacao.selida.com.br/core/ltm",
        "authorizationType": "oauth",
        "authorizationHeader": {
            "appUser": "LTM.Validacao@Starcorp.com.br",
            "appPassword": "%LTMwlc2021%"
        },
        "routeToken": "/token",
        "routeCatalog": "/GetProductCatalog?page=1&size=2",
        "routeAvailability": "/api/v1/availability?productskuid=",
        "routeFreight": "/api/v1/shipping",
        "routeOrder": "/api/v1/order",
        "routeTracking": "/api/v1/shipping",
    }
    return configExternal
}

partnerFactory.prototype.buildIKEHml = function (env) {
    var configExternal = {
        "supplierId": 10000,
        "partnerType": "points",
        "paginationActive": false,
        "baseUrl": "http://18.228.121.107:8098",
        "authorizationType": "oauth",
        "authorizationHeader": {
            "appUser": "alex@phoenixtech.com.br",
            "appPassword": "afp0990",
            "ClientId": "ltm-ike-integracao",
            "ClientSecret": "guq9206-g5rr2886"
        },
        "routeToken": "/oauth/token",  
        "routeCatalog": "/v1/products/all",
        "routeAvailability": "/v1/availability?Productskuid=",
        "routeFreight": "/api/v1/shipping",
        "routeOrder": "/api/pvt/fullfilment/order",
        "routeTracking": "/api/v1/shipping",
    }
    return configExternal
}

partnerFactory.prototype.buildSatelitalCashFisico = function (env) {
    var configExternal = {
        "supplierId": 10000,
        "partnerType": "points",
        "paginationActive": false,
        "baseUrl": "http://uat.satelital.com.br/store/ltmvendas/LTMLJ",
        "authorizationType": "oauth",
        "authorizationHeader": {
            "Authorization": "Basic VXMzckxUTUBBUDE6SzN5UGE1NUxUTUBBUDE=",
            "vendorOrderId": "321551"
        },
        "routeCatalog": "/produts?campaignId=LTMLJ",
        //"routeAvailability": "/api/v1/availability",
        //"routeFreight": "/shipment",
        //"routeOrder": "/order",
        //"routeTracking": "/tracking",
    }
    return configExternal
}

module.exports = partnerFactory
