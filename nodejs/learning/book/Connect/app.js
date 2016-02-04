var connect = require('connect');
var app = connect()
    .use(connect.logger('dev'))
    .use(connect.cookieParser('secret string'))
    .use(function (req, res, next) {
        req.cookies.website="blog.fens.me";
        res.end(JSON.stringify(req.cookies));
    })
    .listen(3000);