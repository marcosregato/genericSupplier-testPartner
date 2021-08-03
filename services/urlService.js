'use strict';
var Util = require('../util.js');
var config = require('../config')

const Enviroment = require('../environment/environment')
var env = new Enviroment().getEnvironment()

var UrlService = function (that) {
    this.util = new Util(that)
    this.urls = config.enviroment
}

UrlService.prototype.getFullUrl = function () {
    return this.urls.fullUrl
}

module.exports = UrlService;