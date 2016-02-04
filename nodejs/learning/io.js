var fs= require("fs");

/*fs.writeFile('test.txt', 'Hello Node', function (err) {
    if (err) throw err;
    console.log('Saved successfully'); //文件被保存
});

fs.appendFile('test.txt', '\ndata to append', function (err) {
    if (err) throw err;

    //数据被添加到文件的尾部
    console.log('The "data to append" was appended to file!');
});

fs.exists('test.txt', function (exists) {
    console.log(exists ? "存在" : "不存在!");
});

//修改文件名称
fs.rename('test.txt','test1.txt',function(err){
    if (err) throw err;
    console.log('Successful modification,');
});*/

//移动文件
/*fs.rename('../test.txt','test.txt',function(err){
    if (err) throw err;
    console.log('renamed complete');
});*/

//读取文件
/*fs.readFile('test.txt','utf-8', function (err, data) {
    if (err) throw err;
    console.log(data);
});*/

//删除文件
/*fs.unlink('test.txt', function(err) {
    if (err) throw err;
    console.log('successfully deleted');
});*/

//创建目录
fs.mkdir('new',function(err){
    if (err) throw err;
    console.log('successfully create');
});

//删除目录
fs.rmdir('new', function(err) {
    if (err) throw err;
    console.log('ok');
});
