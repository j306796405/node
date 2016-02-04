var fs = require('fs');

//异步
/*fs.readFile('D:/install/WindowsXPMode_zh-cn.exe', function(err, data){
    if(err){
        throw err;
    }else{
        console.log(data);
    }
})*/

//同步
/*var fs = require('fs');
var data = fs.readFileSync('D:/install/WindowsXPMode_zh-cn.exe');
console.log(data);
fs.writeFile('xp.exe',data,function(err){
    console.log('youxi!');
});*/
