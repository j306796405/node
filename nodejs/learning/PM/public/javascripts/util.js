app.util = {
    getHash: function(pagesHeader){
        var hash = location.hash;
        //return _.where(pagesHeader,{hash: hash});
        return _.findWhere(pagesHeader, {'hash': hash});
    },
    sliceViLinks: function(viLinks, viLink){
        var sliceVILinks = [];
        for(var i= 0; i< viLinks.length; i++){
            if(viLinks[i].name === viLink.name && viLinks[i].path === viLink.path){
                return viLinks.splice(i,1);
            }
        }
    }
}