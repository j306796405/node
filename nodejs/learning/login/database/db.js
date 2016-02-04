var mongoose = require('mongoose'),
    settings = require('./settings');
var db = mongoose.createConnection(settings.HOST,settings.db); //创建一个数据库连接
module.exports = db;