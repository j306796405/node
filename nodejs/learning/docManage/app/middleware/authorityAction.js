var config = require('../config'),
    WHITELIST = config.AUTHORITY.WHITELIST;

module.exports = {
    removeAttachment: function(user, model){
        if(user){
            for(var i= 0, len = WHITELIST.length; i< len; i++){
                if(WHITELIST[i] !== user.department){
                    console.log('need remove psd');
                    //如果没有权限的人 怎么图片数组过滤PSD加入returnViLinks
                    var returnViLinks = [];
                    for(var j= 0, viLinksLen = model.viLink.length; j< viLinksLen; j++){
                        var file = model.viLink[j];
                        if(!/.psd*$/.test(file.path)){
                            returnViLinks.push(file);
                        }
                    }
                    model.viLink = returnViLinks;
                    return model;
                }
            }
        }
    }
}