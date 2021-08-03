config = {    
    "util": {
        "HTTP":{
            "OK": 200,
            "CREATED": 201,
            "ACCEPTED": 202,
            "NO_CONTENT": 204,
            "BAD_REQUEST": 400,
            "UNAUTHORIZED": 401,
            "NOT_FOUND": 404,
            "CONFLICT": 409,
            "UNPROCESSABLE_ENTITY": 422,
            "INTERNAL_ERROR": 500
        },
        "HIGH_SECONDS": 500000,
        "DEFAULT_SECONDS": 100000,
        "CONTENT_TYPE": "Content-Type",
        "ACCEPT": "Accept",
        "BEARER": "Bearer ",
        "BASIC": "Basic ",
        "ContentType": {
            "JSON": "application/json",
            "FORM_URL_ENCODED": "application/x-www-form-urlencoded; charset=UTF-8",
            "ACCEPT": "application/json"
        },
    }
}

module.exports = config;