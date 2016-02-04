var fs = require('fs');

/*fs.writeFile('delete.txt','1234567890',function(err){
    console.log('youxi!');
});*/

// 删除文件
/*fs.unlink('delete.txt', function(err){
    if(err){
        throw err;
    }
    console.log('success');
});*/

//删除文件夹
/*fs.rmdir('delete', function (err) {
    if (err) {
        throw err;
    }
    console.log('success');
});*/

// 修改文件名称
/*fs.rename('delete.txt','anew.txt',function(err){
    console.log('rename success');

    // 查看文件状态
    fs.stat('anew.txt', function(err, stat){
        console.log(stat);
    });
});*/

// 判断文件/文件夹是否存在
/*fs.exists('anew.txt', function( exists ){
    console.log( exists );
});*/

fs.appendFile('./delete.txt', '\n我去', 'utf-8' , function (err) {
    if (err) {
        console.log(err);
    }
});
