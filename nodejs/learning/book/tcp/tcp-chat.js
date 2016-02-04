var net = require('net');

var count = 0,
    server = net.createServer(function(conn){
        conn.setEncoding('utf8');
        conn.write(
            '\n > welcome to node-chat!'
            + '\n > ' + count + ' other people are connected at this time.'
            + '\n >  please write your name and press enter: '
        );
        count++;

        conn.on('close',function(){
            count--;
        })

        conn.on('data',function(data){
            console.log(data);
        })
    })

server.listen(3000,function(){
    console.log('\033[96m    server listening on * ');
})

