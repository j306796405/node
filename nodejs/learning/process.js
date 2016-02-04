//console.log(process.cwd()); //应用程序当前目录
/*process.chdir("../../"); //改变应用程序目录*/
//process.stdout.write('hello world' + '\n');
//process.stderr.write('error' + '\n');

//stdin是进程的输入流,我们可以通过注册事件的方式来获取输入的内容
/*
process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    if (chunk !== null) {
        process.stdout.write('data: ' + chunk);
    }
});*/

/*process.stdout.on('data',function(data){
    console.log(data);
});*/

process.stdin.setEncoding('utf8');
process.stdout.setEncoding('utf8');
process.stderr.setEncoding('utf8');
