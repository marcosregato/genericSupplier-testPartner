'use strict';
var config = require('../config.js')

var Environment = function () {
    // TODO o valor do PARTNER está no arquivo launch.json  
    this.environment = process.env.PARTNER 
} 

Environment.prototype.getEnvironment = function() {
    return this.environment.trim();
}

module.exports = Environment