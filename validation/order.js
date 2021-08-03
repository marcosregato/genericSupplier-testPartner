var chai = require('chai')
var expect = chai.expect
let config = require('../config')

var pedido_steps = function () {}

pedido_steps.prototype.pedidoSucesso = function (response) {
	describe('Suite Pedido', async function () {

		it('Validar Pedido sucesso', async function () {
			try {
				expect(responsePedido.statusCode, 'ResponseCode da api deve ser igual à 200').to.eql(config.util.HTTP.OK)
				await steps.validacaoStatus200(responsePedido)
				await steps.validacaoBody(responsePedido)
				await steps.validacaoBodyCatalogo(responsePedido)

			} catch (err) {
				console.log("erro: " + err)
				throw (err)
			}
		})
	})
}

pedido_steps.prototype.pedidoInsucesso = function (response) {
	it('Validar Pedido insucesso', async function () {
		try {
			expect(responsePedido.statusCode, 'ResponseCode da api deve ser igual à 200').to.eql(config.util.HTTP.OK)
		} catch (err) {
			console.log("erro: " + err)
			throw (err)
		}
	})
}
module.exports = pedido_steps