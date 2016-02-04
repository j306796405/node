var connect = require('connect'),
    server = connect.createServer();

server.use(connect.bodyParser());
server.use(connect.static('static'));

server.use(function(req, res){
    if(req.method == 'POST'){
        console.log(req.files);
        res.writeHead(200);
        res.end('Upload Success!');
    }
})

server.listen(3000);