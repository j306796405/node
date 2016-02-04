var PMDao = require('./../PM/PMDao'),
    _ = require('underscore');

var PM = {
    proName: 'A',
    proClass: 'A',
    proDes: 'A',
    submitTime: Date.now(),
    lowfiLink: 'A',
    cssLink: 'A',
    picsLink: 'A',
    repository: 'A',
    tag: ['Mobile'],
    viLink: ['A'],
    person: [
        {a: 1},{b: 2}
    ]
}
/*
PMDao.create(PM, function(docs){
    console.log(docs);
})*/