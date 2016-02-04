var request = require('request');

    var fullUrl = 'https://cas.ctripcorp.com/caso/serviceValidate?service=http://hfdoc.qa.nt.ctripcorp.com/docmapp_beta/app.html&ticket=ST-298073-769cmLJu1E2cCBidDV9v-sso01.example.org'
request(fullUrl, {strictSSL: false}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }else{
        console.log(error);
    }
})
