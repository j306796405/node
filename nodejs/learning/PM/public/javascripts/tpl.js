app.tpl.fn = {
    getUrl: function(name){
        var url = '/tpl/' + name + '.html';
        return url;
    },
    getTpls: function(idx, tpls, fn, lastFn){
        var _this = this;
        if(!app.tplCached[tpls[idx]]){
            var name = tpls[idx],
                url = this.getUrl(name);
            $.ajax(url,fn)
                .done(function(data) {
                    app.tplCached[name] = data;
                    if(++idx < tpls.length){
                        fn(data);
                        _this.getTpls(idx, tpls, fn, lastFn);
                    }else{
                        lastFn(data)
                    }
                })
                .fail(function(){
                    alert("出错啦！");
                });
        }else{
            if (++idx < tpls.length) {
                fn(app.tplCached[tpls[idx-1]]);
                _this.getTpls(idx, tpls, fn, lastFn);
            } else {
                lastFn( fn(app.tplCached[tpls[idx-1]]));
            }

        }
    }
}