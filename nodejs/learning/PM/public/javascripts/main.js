app.models.PMModel = Backbone.Model.extend({
    urlRoot: 'data/item',
    parse: function(response, options){
        if(response._id){
            response.id = response._id;
            delete response._id;
            return response;
        }
    }
})

app.collections.PMCollection = Backbone.Collection.extend({
    model: app.models.PMModel,
    url: 'data/list',
    initialize: function(){

    }
})

app.collections.pmCollection = new app.collections.PMCollection();

app.views.PMHeaderView = Backbone.View.extend({
    templateName: 'header',
    el: '#head',
    render: function(){
        this.template = _.template(app.tplCached.header);
        this.$el.html(this.template(this.options.pageHeader));
        return this;
    }
})

app.views.PMListView = Backbone.View.extend({
    el: '#base_bd',
    templateName: 'list',
    initialize: function(){
        app.views.pmHeaderView = new app.views.PMHeaderView({pageHeader: this.options.pageHeader}).render();
        this.listenTo(this.collection, 'reset', this.render);
    },
    render: function(){
        this.template = _.template(app.tplCached.list);
        this.$el.html(this.template());
        app.views.pmListDataView = new app.views.PMListDataView({collection: this.collection}).render();
        return this;
    }
})

app.views.PMListDataView = Backbone.View.extend({
    el: '#list',
    templateName: 'list-data',
    render: function(){
        this.template = _.template(app.tplCached.listData);
        this.$el.html(this.template({items: this.collection.toJSON()}));
        return this;
    }
})

app.views.PMDetailView = Backbone.View.extend({
    el: '#base_bd',
    templateName: 'detail',
    uploadEl: '#uploadBox',
    viLinks: [],
    initialize: function(){
        this.viLinks = this.model.get('viLink');
        app.views.pmHeaderView = new app.views.PMHeaderView({pageHeader: this.options.pageHeader}).render();
        app.views.uploadView = new app.views.UploadView({viLinks: this.viLinks, opts: {isEdit: false}});

        this.listenTo(this.model, 'reset', this.render);
    },
    events: {
        'click .itemInfo .edit': 'edit',
        'click .itemInfo .editVI': 'editVI',
        'click .itemInfo .save': 'save',
        'click .itemInfo .saveVI': 'saveVI'
    },
    render: function(){
        this.template = _.template(app.tplCached.detail);
        this.model.set({proTypeIcon: app.proTypeIcon[this.model.get('proType')]});
        this.$el.html(this.template(this.model.toJSON()));
        $(this.uploadEl).html(app.views.uploadView.render().el);

        for(var i= 0; i< this.viLinks.length; i++){
            this.viLinks[i].isEdit = false;
            this.$el.find('#viBox-wrap').append(new app.views.UploaEditDataView({viLinks: this.viLinks, viLink: this.viLinks[i]}).render().el);
        }
        return this;
    },
    edit: function(e){
        var $this = $(e.srcElement ? e.srcElement : e.target);
        $this.closest('.itemInfo').find('.item').prop('contenteditable',true);
    },
    editVI: function(e){
        var $this = $(e.srcElement ? e.srcElement : e.target);
        /* 显示上传按钮和删除图标 */
        console.log($this.closest('.itemInfo'));
        $this.closest('.itemInfo').find('#files,.viBox .glyphicon-remove').removeClass('hidden');
    },
    save: function(e){
        var $this = $(e.srcElement ? e.srcElement : e.target);
        var item = $this.closest('.itemInfo').find('.item').removeAttr('contenteditable');
        var update = {};
        update[item.prop('id')] = item.html();
        this.model.save(update,{
            patch: true,
            success: function(model, res){
                console.log(res);
            }
        });
    },
    saveVI: function(e){
        var $this = $(e.srcElement ? e.srcElement : e.target);
        $this.closest('.itemInfo').find('#files,.viBox .glyphicon-remove').hide();
        this.model.save({viLink: this.viLinks},{
            patch: true,
            success: function(model, res){
                console.log(res);
            }
        });
    }
})

app.views.PMCreateView = Backbone.View.extend({
    el: '#base_bd',
    uploadEl: '#uploadBox',
    templateName: 'create',
    viLinks: [],
    initialize: function(){
        app.views.pmCreateView = new app.views.PMHeaderView({pageHeader: this.options.pageHeader}).render();
        app.views.uploadView = new app.views.UploadView({viLinks: this.viLinks});
    },
    events: {
        'click #addItemBtn': 'addItem'
    },
    render: function(){
        this.template = _.template(app.tplCached.create);
        this.$el.html(this.template({}));
        $(this.uploadEl).html(app.views.uploadView.render().el);
        $('#submitDate').datepicker();
        return this;
    },
    addItem: function(){
        var rpoTeamData;
        var pmModel = {
            proName: $('#proName').val(),
            proType: $('#proType').val(),
            proDesc: $('#proDesc').val(),
            submitDate: $('#submitDate').val(),
            lowfiLink: $('#lowfiLink').val(),
            cssLink: $('#cssLink').val(),
            picsLink: $('#picsLink').val(),
            branch: $('#branch').val(),
            tag: $('#tags [data-value]:checked').map(function(){
                return $(this).val();
            }).get().join(','),
            viLink: this.viLinks,
            proTeam: $.makeArray($('#proTeam [data-value]').map(function(){
                var $this = $(this);
                return {
                    group: $this.data('value'),
                    name: $this.val()
                };
            }))
        }
        app.collections.pmCollection.create(pmModel,{
            success: function(model, response){
                app.routers.router.navigate('#list',{trigger: true});
            }
        });
    }
})

app.views.UploadView = Backbone.View.extend({
    tagName: 'div',
    render: function(){
        this.template = _.template(app.tplCached.upload);
        this.$el.html(this.template({}));
        this.initializeUpload();
        return this;
    },
    initializeUpload: function(){
        var _this = this;
        setTimeout(function(){
            var viLinksObj = _this.options.viLinks;

            $('#files').uploadify({
                'swf': 'javascripts/lib/uploadify3.2.1/uploadify.swf',
                'uploader': '/data/upload',
                'buttonClass' : 'btn btn-primary',
                'width': 54,
                'height': 34,
                'lineHeight': 20,
                'buttonText' : '上传',
                'queueID': 'viBox-wrap',
                'removeCompleted': false,
                'itemTemplate': app.tplCached.uploadCreateData,
                'onUploadSuccess': function (file, data, response) {
                    var $uploadItem = $('#' + file.id),
                        dataObj = JSON.parse(data),
                        pic = {
                            id: file.id,
                            name: dataObj.name,
                            path: dataObj.path,
                            isEdit: true
                        }
                    viLinksObj.push(dataObj);
                    new app.views.UploaEditDataView({viLink: dataObj,viLinks: viLinksObj, pic: pic, id: ('#' + file.id)}).render();

                },
                onInit: function(){
                    if(!_this.options.opts.isEdit){
                        _this.$el.find('#files').addClass('hidden');
                    }
                }
            })
        })
    }
})

app.views.UploaEditDataView = Backbone.View.extend({
    tagName: 'li',
    className: 'viBox uploadify-queue-item editItem',
    initialize: function(){
        _.bindAll(this, 'removeVI');
    },
    render: function(){
        this.template = _.template(app.tplCached.uploadEditData);

        if(this.options.pic){
            this.$el.append(this.template(this.options.pic));
            $(this.options.id).after(this.el);
            $(this.options.id).remove();
        }else{
            this.$el.append(this.template(this.options.viLink));
        }
        return this;
    },
    events: {
        'click .glyphicon-remove': 'removeVI'
    },
    removeVI: function(e){
        var $this = $(e.srcElement ? e.srcElement : e.target),
            path = $this.data('path'),
            _this = this;
        $.ajax({
            url : '/deletePic/',
            type : 'delete',
            data: 'path=' + path
        }).success(function(data){
            _this.options.viLinks = app.util.sliceViLinks(_this.options.viLinks,_this.options.viLink);
            _this.$el.remove();
        })
    }
})