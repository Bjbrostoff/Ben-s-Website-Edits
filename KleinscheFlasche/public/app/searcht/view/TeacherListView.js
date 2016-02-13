define('app/searcht/view/TeacherListView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/searcht/template/TeacherListView.ejs',

        'app/searcht/view/TeacherItemView',

        'app/searcht/collection/TeacherCollection',
        'app/searcht/view/TeacherDetailView'
    ],
    function (_, Backbone, $, tmpl,
              TeacherItemView,
              TeacherCollection,
              TeacherDetailView) {
        var v = Backbone.View.extend({
            initialize: function (options) {
                //console.log('111');
                // if (options.hasOwnProperty('eventBus')){
                //     this.eventBus = options.eventBus;
                // }

                this.template = _.template(tmpl);

                this.els = {
                    'itemlist': '#searcht-item-list'
                };
                this.views = {

                };

                this.models = {};

                this.subItems = [];

                this.models.teacherCollection = new TeacherCollection();

                this.models.teacherCollection.on('add', this._addItem, this);

            },
            render: function () {
                $(this.el).html(this.template({}));

                return this;
            },
            show: function () {
                this._show();
            },
            hide: function () {
                this._hide();
            },
            /*------ 默认加载是加载内存中的数据 -----*/
            /*
            recommendation: function () {

                var self = this;
                this.models.teacherCollection.fetch(

                ).complete(function () {
                    console.log('success');
                    var count = self.models.teacherCollection.length;
                    self.trigger('teachercount-has-changed', {arr:count});
                });
            },*/

            /*---- 默认加载时请求全部数据 ------*/
            recommendation: function () {
                var self = this;
                $.ajax({
                    url:'/teachers/recommendation',
                    data:{
                        type:1,
                        qo:{
                            'skilledcourse': 'all',
                            'city': 'all',
                            'degree': 'all',
                            'starlevel': 'all'
                        },
                        sorttag:'score',
                        page:'1',
                        limit:'15'
                    },
                    type:'get',
                    success:function(json){
                        self.models.teacherCollection.set(json.collection);
                        self.trigger('teachercount-has-changed', {arr:json.count});
                        //console.log(json);
                    }
                });
            },

            /*---- 请求搜索条件下的数据 ------*/
            fetchBy: function (me) {
                console.log(me.arr);
                var m = me.arr.condition;
                var nv={};
                if(m.length==0){
                    nv = {
                            'skilledcourse': 'all',
                            'city': 'all',
                            'degree': 'all',
                            'starlevel': 'all'
                        }
                }else{
                    for(var i=0;i< m.arr.length;i++){
                        var obj= m.arr[i];
                        nv[obj.cate]=obj.cvalue;
                    }
                }
                //console.log(JSON.stringify(nv));

                this.models.teacherCollection.reset();
                this._removeAllItem();

                var self = this;
                $.ajax({
                    url:'/teachers/recommendation',
                    data:{
                        type:1,
                        qo:nv,
                        sorttag:me.arr.sorttag,
                        page:me.arr.page,
                        limit:me.arr.limit
                    },
                    type:'get',
                    success:function(json){
                        self.models.teacherCollection.set(json.collection);
                        self.trigger('teachercount-has-changed', {arr:json.count});
                    }
                });
            },
            _hide: function () {
                $(this.el).css({
                    'display': 'none'
                })
            },
            _show: function () {
                $(this.el).css({
                    'display': 'block'
                });
            },
            _removeAllItem: function(){
                for (var i = 0; i < this.subItems.length; i++){
                    var item = this.subItems[i];
                    item.remove();
                }
                this.subItems = [];
            },
            _addItem: function (item) {
                //console.log(item);
                var itemview = new TeacherItemView({model: item});
                $(this.els.itemlist).append(itemview.render().el);
                this.subItems.push(itemview);
                var self = this;
                itemview.on('teacher-did-collect', function(e){
                    if (self.views.teacherDetailView) self.views.teacherDetailView.remove();

                    $.ajax({
                        url:'/teachers/searchOneDetail',
                        data:{
                            type:1,
                            qo:{
                                '_id':item.attributes.uuid
                            }
                        },
                        type:'get',
                        success:function(json){
                            //console.log(json);
                            self.views.teacherDetailView = new TeacherDetailView({model: json});
                            $(self.el).append(self.views.teacherDetailView.render(json).el);
                            self.views.teacherDetailView.addSlimScroll();
                            self.views.teacherDetailView.on('open-profile-view', function(e){
                                //console.log(e);
                                self.trigger('open-profile-view', {userid: e.userid});
                            })
                        }
                    });
                })
            }

        });
        return v;
    })
