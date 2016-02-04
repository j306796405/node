var PMDao = require('./../PM/PMDao'),
    _ = require('underscore');

var viLinkArr = [
    {name: "Penguins.jpg", path:".\\upload\\upload_e20ca0a286e9b9dd9ea59b12064bad70.jpg"},
    {name: "Tulips.jpg", path: ".\\upload\\upload_f0e7d606fc995fba0585ab9e06be7576.jpg"},
    {name: "Tulips.jpg", path: ".\\upload\\upload_8ca17214401711ab34a901f83c9c1304.jpg"}
]

PMDao.update({_id: '55b9e9771ed18a64f3c93e5a'}, {viLink: viLinkArr}, function(num){
    console.log(num);
})