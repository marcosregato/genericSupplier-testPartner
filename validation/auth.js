var chai = require('chai')
var expect = chai.expect

var auth = function () { }

auth.prototype.validateOauth = function (response) {
    expect(response.statusCode, 'Must return statusCode 200').to.eql(config.util.HTTP.UNAUTHORIZED)
    expect(response.body.access_token, 'Must return access_token').to.not.eql(null)
    expect(response.body.expires_in, 'Must return expires_in').to.not.eql(null)
    //expect(response.body.expires_in, 'The object expires_in must be a number').to.be.a('number')
}


auth.prototype.validateBasic = function (supplierParameters) {   
    expect(supplierParameters.authorizationHeader, 'Must have authorizationHeader').to.not.eql(null)    
    expect(supplierParameters.authorizationHeader.Authorization, 'Must have Authorization').to.not.eql(null)    
}

module.exports = auth