app.routers.AppRouter = Backbone.Router.extend({
    initialize: function(){
      this.appCollection = new app.collections.PMCollection();
    },
    routes: {
        '': 'list',
        'list': 'list',
        'create': 'create',
        'item/:id': 'detail'
    },
    list: function(){
        var _this = this;
        app.tpl.fn.getTpls(0, app.tpl.public.concat(app.tpl.list) ,function(data){
            //加载每一个模板的回调
        }, function(){
            //加载最后一个模板的回调
            _this.PMListView = new app.views.PMListView({pageHeader: app.pagesHeader.list,collection: _this.appCollection});
            _this.appCollection.fetch({});
        })

    },
    create: function(){
        app.tpl.fn.getTpls(0, app.tpl.public.concat(app.tpl.create) ,function(data){
        }, function(){
            this.PMCreateViews = new app.views.PMCreateView({pageHeader: app.pagesHeader.create}).render();
        })

    },
    detail: function(id){
        app.tpl.fn.getTpls(0, app.tpl.public.concat(app.tpl.detail) ,function(data){
        }, function(){
            var model = new app.models.PMModel({id: id});
            model.fetch({
                success: function(){
                    this.PMDetailView = new app.views.PMDetailView({pageHeader: app.pagesHeader.detail,model: model}).render();
                },
                error: function(model, response, options){
                    alert('item is not exist');
                }
            });
        })

    }
})

app.routers.router = new app.routers.AppRouter();
Backbone.history.start();