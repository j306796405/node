var https = require('https');
var opt = {
    port: 80,
    method: 'GET',
    host: 'cas.ctripcorp.com',
    path: '/caso/serviceValidate?service=http://hfdoc.qa.nt.ctripcorp.com/docmapp_beta/app.html&ticket=ST-297149-rsf3nxWZbjd2tBf91CC6-sso01.example.org',
    rejectUnauthorized: false
}
https.request(opt, function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);

    res.on('data', function(d) {
        process.stdout.write(d);
    });

}).on('error', function(e) {
    console.error(e);
});