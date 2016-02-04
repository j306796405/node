var counter1 = require('./counter');
var counter2 = require('./counter');

/*counter.js并没有因为被require了两次而初始化两次。*/
counter1.count();
counter2.count();
counter2.count();