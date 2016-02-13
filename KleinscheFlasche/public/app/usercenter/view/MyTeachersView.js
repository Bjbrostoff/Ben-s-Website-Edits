/**
 * Created by cs on 2016/1/19.
 */
define('app/usercenter/view/MyTeachersView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/usercenter/template/MyTeachersView.ejs',
        'app/usercenter/view/myteachers/MyTeachersListView',
        'app/usercenter/collection/myteachers/MyTeachersListDataCollection'
    ],
    function(_, Backbone, $, tmpl,TeachersListView,TeachersListDataCollection){
        var v = Backbone.View.extend({
            el:'.myteachers-container',
            events:{
                'click li.myteachers-nav-tab':'myTeachersTabChangeHandler',
                'click #btn-refresh': 'btnRefresh_clickHandler',
                'click #btn-trash': 'btnTrash_clickHandler'
            },
            elms: {
                'list': '#myteachers-list'
            },
            states:{
                all:-1,//所有
                schooling:0, //正在上课
                finished:1  //已经结束
            },
            initialize:function(option) {
                if(option.state)  this.curState = option.state
                else this.curState = this.states.all;
                this.eventBus = option.eventBus;
                this.views = {};
                this.collections = {};
                this.template = _.template(tmpl);
                this.collections.teachers = new TeachersListDataCollection();
            },
            showListView:function(state) {
                var self = this;
                this.collections.teachers.fetch({
                    data: $.param({state: state})
                }).complete(function () {
                    if (!self.views.teachersListView) {
                        self.views.teachersListView = new TeachersListView({
                            eventBus: self.eventBus,
                            teachers: self.collections.teachers.toJSON()
                        });
                        $(self.elms.list).append(self.views.teachersListView.render().el);
                    }else{
                        $(self.elms.list).html(self.views.teachersListView.render(self.collections.teachers.toJSON()).el);
                    }
                });
            },
            myTeachersTabChangeHandler:function(evt){
                var state = parseInt($(evt.currentTarget).attr('data-state'));
                this.curState = state;
                this.showListView(state);
            },
            btnRefresh_clickHandler: function () {
                var self = this;
                console.log('refresh');
                $.ajax({
                    url:'/mod/user/modMyTeachers?count=10',
                    type:'get',
                    success:function(json){
                        self.showListView(self.curType);
                    }
                });
            },
            btnTrash_clickHandler: function () {
                var self = this;
                console.log('trash');
                $.ajax({
                    url:'/mod/user/clearMyTeachersTestData',
                    type:'get',
                    success:function(json){
                        console.log('clear success');
                        $(self.elms.list).empty();
                    }
                });

            },
            render:function(){
                $(this.el).html(this.template({}));
                this.showListView(this.states.all);
                return this;
            },
            hide:function(){
                this._hide();
            },
            show:function(){
                this._show();
            },
            _hide:function(){
                $(this.el).css({
                    'display':'none'
                })
            },
            _show:function(){
                $(this.el).css({
                    'display':'block'
                });
            },
        });
        return v;
    })