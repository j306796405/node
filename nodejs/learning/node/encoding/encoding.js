var fs = require('fs'),
    iconv = require('iconv-lite');

fs.readFile('./utf-8.txt', function (err, data) {
    if (err) throw err;
    fs.writeFile('./writeDir/utf-8.txt', data, function (err) {
        if (err) throw err;
        console.log('utf-8 is writed'); //文件被保存
    });
});

fs.readFile('./gbk.txt', function (err, data) {
    if (err) throw err;
    data = iconv.decode(data, 'gbk');
    data = iconv.encode(data, 'utf-8');
    fs.writeFile('./writeDir/gbk.txt', data, function (err) {
        if (err) throw err;
        console.log('gbk is writed'); //文件被保存
    });
});
