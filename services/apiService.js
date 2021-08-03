var Util = require('../util.js')
var UrlService = require('./urlService.js')

// TODO Token do teste
// O Token será usado nos métodos getAuthorization e getHeaderAuthorization
const access_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjEzNzc4ODYsInVzZXJfbmFtZSI6ImFsZXhAcGhvZW5peHRlY2guY29tLmJyIiwiYXV0aG9yaXRpZXMiOlsiR0VSQVJfUkVMQVRPUklPUyIsIkVESVRBUl9DT1pJTkhBUyIsIkVESVRBUl9DSURBREVTIiwiRURJVEFSX0ZPUk1BU19QQUdBTUVOVE8iLCJFRElUQVJfUkVTVEFVUkFOVEVTIiwiR0VSRU5DSUFSX1BFRElET1MiLCJFRElUQVJfUEFSVElDSVBBTlRTX0dSVVBPU19QRVJNSVNTT0VTIiwiQ09OU1VMVEFSX1BFRElET1MiLCJDT05TVUxUQVJfUEFSVElDSVBBTlRTX0dSVVBPU19QRVJNSVNTT0VTIiwiRURJVEFSX0VTVEFET1MiXSwianRpIjoiNGE0OTI4MGYtNDYwZC00YzBmLThjNmMtOTljNGE4MzAwOGJiIiwiY2xpZW50X2lkIjoibHRtLWlrZS1pbnRlZ3JhY2FvIiwic2NvcGUiOlsiUkVBRCIsIldSSVRFIl19.wIqg-DvogQUeRAeWtf-p4XWiFtmUzcg85LLpjsm6T51Jz8LMvYBphzXBY41neYfvOzloCgFu-vgx7xqjLkGvmyvL9jTmGzy_S9re4_3V9fpuOowEhdDGHJVeW_hhJo-gPm1RrKoomdtqbSDbmtmigsReWEO7uu3MwU7zW-G8CYxLiw4TOKMAlcZCb6n5P8KrQ-z94ACe3b1viYcbMmJmIGUug7z3nskQGVsMEcI5oTlqIEEjBopWjcTFz5qJkHkxEr1LOW5sWeu7B8neZLQgc3VLbe7hCMYdne57cazJE4KggGEmPuTYaLHonB9ljGdoGtoXqJsCEn73hKXWNSOt2Q"
var ApiService = function (that) {
    this.util = new Util(that)
    this.urlService = new UrlService(that)
};

ApiService.prototype.getAuthorization = async function (buildConfig) {
    try {

        var headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access_token': access_token
        }
   return await this.util.postUrl(buildConfig.baseUrl, buildConfig.authorizationHeader, headers, buildConfig.routeToken, true)

    }
    catch (ex) {
        console.log("X  GET CATALOG - Error: " + ex)
        return ex
    }
}

ApiService.prototype.getCatalog = async function (buildConfig) {

    try {
        return await this.util.getUrl(buildConfig.baseUrl, await this.getHeaderAuthorization(buildConfig), buildConfig.routeCatalog)
    }
    catch (ex) {
        console.log("X  GET CATALOG - Error: " + ex)
        return ex
    }
}

ApiService.prototype.getAvailability = async function (buildConfig, sku) {
    try {
        return await this.util.getUrl(buildConfig.baseUrl, await this.getHeaderAuthorization(buildConfig), buildConfig.routeAvailability + sku + '&suplierId=' + buildConfig.supplierId)
    }
    catch (ex) {
        console.log("X  GET Availability - Error: " + ex)
        return ex
    }
}

ApiService.prototype.postFreight = async function (buildConfig, body) {
    try {
        return this.util.postUrl(buildConfig.baseUrl, body, await this.getHeaderAuthorization(buildConfig), buildConfig.routeFreight)
    }
    catch (ex) {
        console.log("X  GET FREIGHT - Error: " + ex)
        return ex
    }
}

ApiService.prototype.getTracking = async function (buildConfig) {
    try {
        return await this.util.getUrl(buildConfig.baseUrl, await this.getHeaderAuthorization(buildConfig), buildConfig.routeTracking)
    }
    catch (ex) {
        console.log("X  GET TRACKING - Error: " + ex)
        return ex
    }
}

ApiService.prototype.getHeaderAuthorization = async function (buildConfig) {
    if (buildConfig.authorizationType == "basic")
        return buildConfig.authorizationHeader
    else {
       
        return {
            "Authorization": "Bearer " + access_token//response.body.access_token
        }
    }
}

ApiService.prototype.getParcelamento = async function (buildConfig,sku) {
    try {
        return await this.util.getUrl(buildConfig.baseUrl, await this.getHeaderAuthorization(buildConfig), buildConfig.routePaymentOptions + sku)
    }
    catch (ex) {
        console.log("X  GET PARCELAMENTO - Error: " + ex)
        return ex
    }
}


module.exports = ApiService