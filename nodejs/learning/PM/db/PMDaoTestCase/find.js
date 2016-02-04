var PMDao = require('./../PM/PMDao'),
    _ = require('underscore');

PMDao.findById('55b5ce711d9f22fc8bda9815', function(docs){
    console.log(docs);
})