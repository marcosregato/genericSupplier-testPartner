'use strict'

var hubFactory = function () { }

hubFactory.prototype.buildBodyFreight = function (sku, quantity) { //unityPrice, 
    var body = {
        "zipCode": "06454000",
        "products":
            [{
                "sku": sku,
                "quantity": quantity,
                "unityPrice": 15244//unityPrice
            }]
    }

    return body
}

hubFactory.prototype.buildBodyOrder = function (orderId, costPrice, sku, skuCostPrice, amount) {
    var body = {
        "order": {
            "id": orderId,
            "createDate": "2020-08-13T18:42:50.2113215-02:00",
            "shipping": {
                "costPrice": costPrice,
                "deliveryForecast": "2020-08-13T18:42:50.2113215-02:00",
                "receiver": {
                    "name": "John Alves",
                    "cpfCnpj": "39096789806",
                    "email": "jalves@ltmfidelidade.com.br",
                    "birthDate": "1985-05-29T00:00:00.0000000-02:00",
                    "personType": 1,
                    "genderType": 1,
                    "phones": [
                        {
                            "DDD": "11",
                            "number": "965112254",
                            "type": 3
                        }
                    ]
                },
                "shippingAddress": {
                    "address": "Al. Rio Negro",
                    "number": "585",
                    "complement": "cj 71",
                    "city": "Barueri",
                    "district": "Alphavile",
                    "state": "SP",
                    "zipCode": "06454000",
                    "reference": "LTM"
                }
            },
            "participant": {
                "name": "John Alves",
                "cpfCnpj": "39096789806",
                "email": "jalves@ltmfidelidade.com.br",
                "birthDate": "1985-05-29T00:00:00.0000000-02:00",
                "personType": 1,
                "genderType": 1,
                "phones": [
                    {
                        "DDD": "11",
                        "number": "965112254",
                        "type": 3
                    }
                ]
            },
            "items": [
                {
                    "sku": sku,
                    "name": "Nome do Produto",
                    "quantity": 1,
                    "costPrice": skuCostPrice
                }
            ],
            "amount": amount
        },
        "payment": {
            "paymentId": 2,
            "parcels": 1,
            "cardNumber": "0000000000000001",
            "expirationMonth": "12",
            "expirationYear": "2030",
            "ownerName": "Owner Name",
            "ownerDocument": "11111111111",
            "securityCode": "123"
        }
    }

    return body
}

hubFactory.prototype.buildBodyTracking = function (vendorOrderId) {
    var body = {
        "vendorOrderId": vendorOrderId
    }

    return body
}


module.exports = hubFactory
