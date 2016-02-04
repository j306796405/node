var http = require('http'),
    fs = require('fs');

var server = http.createServer(function(req, res){
    if(req.method == 'GET' && req.url.substr(-4) == '.png'){
        /*var file_url = __dirname + req.url;
        fs.stat(file_url, function(err, stat){
            if(err || !stat.isFile()){
                res.writeHead(404);
                res.end('Not Head');
                return;
            }
            serve(file_url, 'image/png');
        })*/
    }else if(req.method == 'GET' && req.url == '/'){
        serve(__dirname + '/index.html', 'text/html');
    }else{
        res.writeHead(404);
        res.end('Not Found');
    }

    function serve(path, type){
        res.writeHead(2000,{'content-type': type})
        fs.createReadStream(path).pipe(res);
    }
}).listen(3000);

