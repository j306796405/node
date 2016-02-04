var Manage = require('./model');

Manage.updateById('5660fd49334f65c03c000001', {proClass: '测试用例', viLink: ''}, {new: true}, function (err, num) {
    if (err) {
        console.log(err);
    }
    console.log('**************');
    console.log(num);
});
