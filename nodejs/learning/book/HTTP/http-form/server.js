var qs = require('querystring');
require('http').createServer(function(req, res){
    if('/' == req.url){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end([
            '<form action="/url" method="POST">',
            '<h1>My Form</h1>',
            '<fieldset>',
            '<label>Personal information</label>',
            '<p>What is your name?</p>',
            '<input type="text" name="name"/>',
            '<p><button>Submit</button></p>',
            '</fieldset>',
            '</form>'
        ].join(''));
    }else if('/url' == req.url){
        var body = '';
        req.on('data',function(chunk){
            body += chunk;
        })
        req.on('end',function(){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<p>Content-Type: ' + req.headers['content-type'] + '</p>'
            + '<p>Data: </p><pre>' + qs.parse(body).name + '</pre>');
        })

    }else{
        res.writeHead(404);
    }

}).listen(3000);