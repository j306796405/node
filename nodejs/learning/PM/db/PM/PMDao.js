var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/PM');

var pmSchema = new mongoose.Schema({
    proName: {type: String, default: '匿名用户'},
    proType: {type: String, enum: ['变更','项目','团队'], required: true},
    proDesc: {type: String, default: '匿名描述'},
    submitDate: {type: Date, default: Date.now},
    lowfiLink: {type: String},
    cssLink: {type: String},
    picsLink: {type: String},
    branch: {type: String},
    tag: {type: [], enum: ['Online','Offline','Mobile'], required: true},
    viLink: {type: []},
    proTeam: {type: []}
});

function PMDao(){}

PMDao.create = function (pmModel, callback) {
    PMModel.create(pmModel, function(err, docs){
        callback(err, docs);
    });
}

PMDao.find = function (query, callback) {
    return PMModel.find(query, function(err, docs){
        callback(err, docs);
    });
}

PMDao.findById = function (id, callback) {
    return PMModel.findById(id, function(err, docs){
        callback(err, docs);
    });
}

PMDao.findByIdAndUpdate = function (id, pmModel, callback) {
    return PMModel.findByIdAndUpdate(id, {$set: pmModel}, function(err, docs){
        if(err) {
            throw err;
        } else {
            callback(docs);
        }
    });
}

PMDao.update = function (id, pmModel, callback) {
    return PMModel.update({_id: id}, {$set: pmModel}, function(err, num){
        callback(err, num);
    });
}

var PMModel = mongoose.model('PMModel', pmSchema);

module.exports = PMDao;