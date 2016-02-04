var express = require('express'),
    PMDao = require('./../db/PM/PMDao'),
    moment = require('moment'),
    _ = require('underscore'),
    formidable = require('formidable'),
    fs = require('fs'),
    path = require('path'),
    router = express.Router(),
    UPLOAD_DIR = path.join(__dirname, '../public/upload'),
    STATIC_DIR = require('./../config').static;

module.exports = function(app){
    app.get('/', function(req, res, next) {
        res.redirect('/app.html');
    });

    app.get('/app.html', function(req, res, next) {
        res.render('index', {});
    });

    app.get('/data/list', function(req, res, next) {
        PMDao.find({}, function(err,docs){
            if(err){
                return  res.status(500).send(err.toString());
            }
            _.each(docs, function(ele, idx){
                var formateDate = moment(ele.submitDate).format('YYYY/MM/DD, hh:mm a');
                ele._doc.submitDate = formateDate;
            })
            res.send(docs);
        });
    });

    app.route('/data/item/:id')
        .get(function(req, res, next) {
            var id = req.params.id;
            PMDao.findById(id, function(err, doc){
                if(err){
                    return  res.status(500).send(err.toString());
                }
                var formateDate = moment(doc.submitDate).format('YYYY/MM/DD, hh:mm a');
                doc._doc.submitDate = formateDate;
                res.send(doc);
            });
        })
        .patch(function(req, res, next) {
            var id = req.params.id;
            PMDao.update(id, req.body, function(err, num){
                if(err){
                    return  res.status(500).send(err.toString());
                }
                res.send(num);
            });
        });

    app.post('/data/item', function(req, res, next) {
        var pmModel = {
            proName: req.body.proName,
            proType: req.body.proType,
            proDesc: req.body.proDesc,
            submitDate: req.body.submitDate,
            lowfiLink: req.body.lowfiLink,
            cssLink: req.body.cssLink,
            picsLink: req.body.picsLink,
            branch: req.body.branch,
            tag: req.body.tag,
            viLink: req.body.viLink,
            proTeam: req.body.proTeam
        }
        PMDao.create(pmModel, function(err, docs){
            if(err){
                return  res.status(500).send(err.toString());
            }
            res.send(docs);
        })

    })

    app.post('/data/upload', function(req, res, next) {
        fs.exists(UPLOAD_DIR, function (exists) {
            if(!exists){
                fs.mkdir(UPLOAD_DIR,function(){
                    upload();
                });
            }else{
                upload();
            }
        });

        function upload(){
            var form = new formidable.IncomingForm(),
                files = [],
                fields = [],
                fileJson = {};
                //file_name = [];

            form.uploadDir = UPLOAD_DIR;
            form.keepExtensions = true;

            form
                .on('field', function (field, value) {
                    fields.push([field, value]);
                })
                .on('file', function (field, file) {
                    fileJson.name = file.name;
                    fileJson.path = file.path;

                    files.push([field, file]);
                })
                /*.on("progress", function (bytesReceived, bytesExpected) {
                    var percent = Math.round(bytesReceived/bytesExpected * 100);
                    var opts = {
                        name : "uploadprogress",
                        value : percent,
                        expires : 500
                    };
                    console.log(percent);
                    //sessions.setSession(req,res,opts);
                })*/
                .on('end', function () {
                    fileJson.path = staticUploadPath(fileJson.path);
                    res.send(fileJson);
                });
            form.parse(req);
        };
    }),
    app.delete('/deletePic', function(req, res) {
        var dir = serverUploadPath(req.body.path);
        fs.exists(dir, function( exists ){
            if(exists){
                fs.unlink(dir, function(err){
                    if(err){
                        return  res.status(500).send(err.toString());
                    }
                    console.log('file is deleted');
                    res.send('file is deleted');
                });
            }else{
                res.send('file is not exist');
            }
        });
    })
}

function staticUploadPath(dir){
    dir = path.relative(STATIC_DIR,dir);
    return dir;
}

function serverUploadPath(dir){
    return path.join(STATIC_DIR, dir);
}
