var fs = require('fs'),
    path = require('path');

function travelDir(dir, callback){
    fs.readdir(dir, function(err, files){
        if(err){
            return console.log(err.toString());
        }
        files.forEach(function(file){
            var pathname = path.join(dir,file);
            fs.stat(pathname, function(err,stats){
                if(err){
                    return console.log(err.toString());
                }
                if(stats.isDirectory()){
                    travelDir(pathname, callback);
                }else{
                    callback(pathname);
                }
            })
        })
    })
}

travelDir('/Git/myGit/skills/css',function(pathname){
    console.log(pathname);
});