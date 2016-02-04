var fs = require('fs-extra');

/*fs.copy('D:/install/Illustrator_CC_17_LS20.1697221197.7z', '/copied/cc.7z', function (err) {
    if (err) throw err;
    console.log('success!');
})*/

var rs = fs.createReadStream('D:/install/Illustrator_CC_17_LS20.1697221197.7z');
var ws = fs.createOutputStream('/copied/cc.7z');
rs.on('data', function(chunk) {
    ws.write(chunk);
})
rs.on('end', function() {
    console.log('读取完毕。');
});