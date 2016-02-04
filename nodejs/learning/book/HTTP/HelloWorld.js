require('http').createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    var stream = require('fs').createReadStream('img/a.jpg').pipe(res);
    /*stream.on('data',function(data){
        res.write(data);
    })
    stream.on('end',function(){
        res.end();
    })*/
}).listen(3000);