/* 模块依赖 */
var http = require('http'),
    fs = require('fs');

/* 创建服务器 */
var server = http.createServer(function(req, res){
    if('GET' == req.method && '/images' == req.url.substr(0,7) &&
        '.jpg' == req.url.substr(-4)){
        res.end('Img List');
    }else if('GET' == req.method && '/' == req.url){
        console.log(__dirname);
        //serve(__dirname + '/index.html', 'text/html');
    }else{
        res.writeHead(404);
        res.end('Not found');
    }
})

/* 最后监听 */
server.listen(3000);