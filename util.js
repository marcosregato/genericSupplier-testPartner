'use strict'

var basic

var chai = require('chai'), chaiHttp = require('chai-http')
var rp = require('request-promise')

const Enviroment = require('./environment/environment')
const env = new Enviroment().getEnvironment()

var Util = function (that) {
    chai.use(chaiHttp)
    this.that = that
}

Util.prototype.getUrl = function (baseUrl, header, url) {
    return chai.request(baseUrl)
        .get(url)
        .set(header)

        /// '/com.playthegame.aimportacaoprodutosltm'

}

Util.prototype.postUrl = function (baseUrl, body, header, url, form = false) {
    if (form)
        return chai.request(baseUrl).post(url)
            .field(body)
            .set(header)
    else
        return chai.request(baseUrl).post(url)
            .set(header)
            .send(body)
}

Util.prototype.assert = function (condition) {
    if (condition == 'ok') {
        return "Assertion true"
    } else {
        return "Assertion failed"
    }
}


module.exports = Util