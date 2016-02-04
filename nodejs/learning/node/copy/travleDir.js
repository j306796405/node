var fs = require('fs'),
    path = require('path');

function copy(source, target, callback){
    mkdirs(target, 0777, function(){
        fs.readdir(source, function(err, files){
            if(err){
                throw err;
            }
            files.forEach(function(file){
                var sourcePath = path.join(source,file);
                console.log(target);
                var targetPath = path.join(target,file);
                fs.stat(sourcePath, function(err,stats){
                    if(err){
                        throw err;
                    }
                    if(stats.isDirectory()){
                        fs.exists('targetPath', function (exists) {
                            if(!exists){
                                fs.mkdir(targetPath, function(err){
                                    if(err){
                                        throw err;
                                    }
                                    copy(sourcePath, targetPath, callback);
                                })
                            }else{
                                copy(sourcePath, targetPath, callback);
                            }
                        });
                    }else{
                        callback(sourcePath);
                        fs.readFile(sourcePath, function(err ,data){
                            if(err){
                                throw err;
                            }
                            fs.writeFile(targetPath, data, function(err){
                                if(err){
                                    throw err;
                                }
                                console.log(targetPath + ' is written done!');
                            })
                        })
                    }
                })
            })
        })
    });
}

function mkdirs(dirpath, mode, callback) {
    fs.exists(dirpath, function(exists) {
        if(exists) {
            callback(dirpath);
        } else {
            //尝试创建父目录，然后再创建当前目录
            mkdirs(path.dirname(dirpath), mode, function(){
                fs.mkdir(dirpath, mode, callback);
            });
        }
    });
};

copy('/Git/myGit/skills/css', '/Git/myGit/skills/js/nodejs/learning/node/copy/copied/',function(pathname){

});