var commentModel = require('./commentModel'),
    _ = require('underscore');

/*var comment = {};
for(var i= 1; i<= 3; i++){
    comment.username = 'user' + i;
    comment.sequence = i;
    comment.title = 'title' + i;
    comment.array = [1,2,3,4,5];
    if(i <= 50){
        comment.group = 'a';
    }else{
        comment.group = 'b';
    }
    comment.content = 'content' + i;
    commentModel.cmtCreateComment(comment,function(comment){
        console.log('create success');
    })
}*/

/*commentModel.cmt_Find({username: /user/},function(comments){
    console.log(comments.length);
});*/

/*commentModel.cmt_Remove({username: /user/},function(comments){
    console.log(comments.result);
});*/

/*commentModel.cmt_findById('55a8c304ef0f43fd64907e13',function(comment){
    console.log(comment);
});*/

/*commentModel.cmt_findByIdAndUpdate('55a8c304ef0f43fd64907e13', {username: 'newUser'} ,function(comment){
    console.log(comment);
});*/

/*commentModel.cmt_update({username: /user/}, {array: []}, {multi: true} ,function(comment){
    console.log(comment);
});*/

/* 分页 */
commentModel.cmtPaging(1, 3 ,function(count, docs){
    console.log(count);
    _.each(docs, function(ele, idx){
        console.log(ele.time);
    })
})


