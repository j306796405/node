var fs = require('fs');

//eg1
/*var rs = fs.createReadStream('D:/install/fiddler2setup.exe');
var ws = fs.createWriteStream('./fiddler2setup.exe');
rs.on('data', function(chunk) {
    console.log('data chunk read ok');
    //false 输出流有data未写完 true 输出流已写完 因此开启读入流
    if(ws.write(chunk,function(){
            rs.resume();
            console.log('data chunk write ok');
        }) == false){
        rs.pause();
    }
})
rs.on('end', function() {
    console.log('读取完毕。');
});*/


//eg2
/*var rs = fs.createReadStream('D:/install/fiddler2setup.exe');
var ws = fs.createWriteStream('./fiddler2setup.exe');
rs.on('data', function(chunk) {
    console.log('data chunk read ok');
    if(ws.write(chunk,function(){
            console.log('data chunk write ok');
        }) == false){
        rs.pause();
    }
})
rs.on('end', function() {
    console.log('读取完毕。');
});
rs.on('finish', function() {
    console.error('已完成所有写入。');
});
// 一旦它排空，继续读取数据
ws.on('drain', function(){
    rs.resume();
})*/

//eg3
function copy( src, dest ){
    fs.createReadStream( src ).pipe( fs.createWriteStream( dest ) );
}
copy('D:/install/Illustrator_CC_17_LS20.1697221197.7z', './cc.7z');