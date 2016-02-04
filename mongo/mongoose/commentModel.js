var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Demo');

// 链接错误
/*db.on('error', function(error) {
    console.log(error);
});*/


// Schema 结构
var commentSchema = new mongoose.Schema({
    username: {type: String, default: '匿名用户'},
    title: {type: String},
    sequence: {type: Number},
    group: {type: String},
    content: {type: String},
    time: {type: Date, default: Date.now},
    age: {type: Number},
    array: {type: []}
});

commentSchema.statics.cmt_Find = function (comment, callback) {
    return commentModel.find(comment, function(err, comments){
        callback(comments);
    });
}

commentSchema.statics.cmt_Remove = function (comment, callback) {
    return commentModel.remove(comment, function(err, comments, b, c){
        callback(comments);
    });
}

commentSchema.statics.cmt_findById = function (id, callback) {
    return commentModel.findById(id, function(err, comment){
        callback(comment);
    });
}

commentSchema.statics.cmt_findByIdAndUpdate = function (id, comment, callback) {
    return commentModel.findByIdAndUpdate(id, {$set: comment}, function(err, updatedComment){
        callback(updatedComment);
    });
}

commentSchema.statics.cmt_update = function (conditions, update, options, callback) {
    return commentModel.update(conditions, {$set: update}, options, function(err, docs){
        callback(docs);
    });
}

/* 新增 同save 实例方法用save 静态方法用create */
commentSchema.statics.cmtCreateComment = function (comment, callback) {
    commentModel.create(comment, function(error, comment){
        if(error) {
            console.log(error);
        } else {
            callback(comment);
        }
    });
}

commentSchema.statics.cmtPaging = function (page, pageSize, callback) {
    commentModel.find().sort({sequence: 1}).skip((page - 1) * pageSize).limit(pageSize).exec(function(err,datas){
        if(err) {
            throw err;
        } else {
            commentModel.count(null, function(err, count){
                if(err){
                    throw err;
                }else{
                    callback(count, datas);
                }
            })
        }
    });
}

//必须放在statics和methods下面 不然报错
var commentModel = mongoose.model('commentModel', commentSchema);

module.exports = commentModel;




