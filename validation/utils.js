var chai = require('chai')
var expect = chai.expect
let config = require('../config')

var utils = function () { }

utils.prototype.validateResponseStatusCode = function (response) {

    expect(response, 'Must return statusCode 200').to.have.status(config.util.HTTP.OK);
}

utils.prototype.validateResponseBody = function (response) {    
    expect(response.body, 'Must return body in response').to.not.eql(null);

}

module.exports = utils