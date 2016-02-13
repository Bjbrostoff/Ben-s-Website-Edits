define('app/usercenter/view/CourseManageView',
[
    'underscore',
    'backbone',
    'jquery',

    'text!/app/usercenter/template/CourseManageView.ejs',

    'app/usercenter/collection/coursemanage/CourseCollection',
    'app/usercenter/model/coursemanage/CourseModel',

    'app/usercenter/view/coursemanage/CourseListView',
    'app/usercenter/view/coursemanage/CreateCourseView',

    'app/usercenter/view/coursemanage/CourseDetailView'


],
function(_, Backbone, $,
        tmpl,
        CourseCollection, CourseModel,
        CourseListView, CreateCourseView, CourseDetailView){
    var v = Backbone.View.extend({
        el:'.course-manage-container',
        events:{
            'click li.course-manage-nav-tab':'courseManageNavTabChangeHandler',
            'click #course-manage-generate-course':'createNewCourse_handler'
        },
        initialize:function(option){
            this.eventBus = option.eventBus || {};
            this.loginUserId = option.loginUserId || '';
            this.els = {
                'actCourses':'#course-manage-act-tab',
                'pubCourses':'#course-manage-pub-tab',
                'selloutCourses':'#course-manage-sellout-tab',
                'newCourses':'#course-manage-new-tab',
                'allCourses':'#course-manage-all-tab',
                'chart':'course-manage-chart',
                'chartLegend':'#course-manage-chart-legend',
                'createCourse':'course-manage-generate'
            };

            this.eventNames = {
                'detail':'course-manage-detail-btn-did-click',
                'pub':'course-manage-pub-btn-did-click',
                'sellout':'course-manage-sellout-btn-did-click',
                'prepare':'course-manage-prepare-btn-did-click',
                'begin':'course-manage-begin-btn-did-click',
                'end':'course-manage-end-btn-did-click',
                'push':'course-manage-push-btn-did-click',
                'pubCourseMsg':'global-msg',
                'generateNewCourse':'course-manage-generate-course'
            };

            this.models = {

            };

            this.template = _.template(tmpl);

            this.views = {

            };

            this.models.actCourseCollection = new CourseCollection({
                url:'/users/myActCourses'
            });
            this.models.pubCourseCollection = new CourseCollection({
                url:'/users/myPubCourses'
            });
            this.models.selloutCourseCollection = new CourseCollection({
                url:'/users/mySelloutCourses'
            });
            this.models.newCoursesCollection = new CourseCollection({
                url:'/users/myNewCourses'
            });
            this.models.allCoursesCollection = new CourseCollection({
                url:'/users/myAllCourses'
            });
            //this.models.actCourseCollection.on('reset', this.actCourses_dataChange, this);

        },
        render:function(){
            var chartData = {
                data:[
                    {label: "未公开", value: 20 },
                    { label: "已下架", value: 20 },
                    { label: "已发布", value: 30 },
                    { label: "进行中", value: 12 }

                ],
                colors:[
                    '#87d6c6', '#54cdb4','#1ab394','#1ab6ff'
                ]
            };
            $(this.el).html(this.template({chartData:chartData}));
            this.morrisChart(chartData);
            return this;
        },
        hide:function(){
            this._hide();
        },
        show:function(){
            this._show();
        },
        morrisChart:function(chartData){
            Morris.Donut({
                element: this.els.chart,
                data: chartData.data,
                resize: true,
                colors:chartData.colors
            });
        },
        createNewCourse_handler:function(){
            if (this.views.createCourseView) this.views.createCourseView.remove();

            this.views.createCourseView = new CreateCourseView({
                userid:'a'
            });
            this.views.createCourseView.on(this.eventNames.generateNewCourse, this._generateNewCourse, this);
            $(this.el).append(this.views.createCourseView.render().el);
            this.views.createCourseView.setValidate();

        },
        showActCourses:function(){//进行中
            if (!this.views.actCourseTabView){
                this.views.actCourseTabView = new CourseListView({
                    eventBus:this.eventBus,
                    el:this.els.actCourses,
                    collection:this.models.actCourseCollection,
                    selectlv:2
                });
                this.views.actCourseTabView.on(this.eventNames.detail, this._detailCourse, this);
                this.views.actCourseTabView.on(this.eventNames.end, this._endCourse, this);
                this.views.actCourseTabView.on(this.eventNames.sellout, this._selloutCourse, this);
                this.views.actCourseTabView.on(this.eventNames.pub, this._pubCourse, this);
                this.views.actCourseTabView.on(this.eventNames.begin, this._beginCourse, this);

                var self = this;
                this.models.actCourseCollection.fetch({
                    data:{
                        select:2
                    }
                }).complete(function(){
                    $(self.els.actCourses).append(self.views.actCourseTabView.render().el);
                    self.views.actCourseTabView.activeListener();
                });
            }


        },
        showPubCourses:function(){//已发布
            if (!this.views.pubCourseTabView){
                this.views.pubCourseTabView = new CourseListView({
                    eventBus:this.eventBus,
                    el:this.els.pubCourses,
                    collection:this.models.pubCourseCollection,
                    selectlv:1
                });

                this.views.pubCourseTabView.on(this.eventNames.prepare, this._prepareCourse, this);
                this.views.pubCourseTabView.on(this.eventNames.sellout, this._selloutCourse, this);
                this.views.actCourseTabView.on(this.eventNames.detail, this._detailCourse, this);

                var self = this;
                this.models.pubCourseCollection.fetch({
                    data:{
                        select:1
                    }
                }).complete(function(){
                    $(self.els.pubCourses).append(self.views.pubCourseTabView.render().el);
                    self.views.pubCourseTabView.activeListener();
                });
            }


        },
        showSelloutCourses:function(){//已下架
            if (!this.views.sellOutCourseTabView){
                this.views.sellOutCourseTabView = new CourseListView({
                    eventBus:this.eventBus,
                    el:this.els.selloutCourses,
                    collection:this.models.selloutCourseCollection,
                    selectlv:3
                });

                this.views.sellOutCourseTabView.on(this.eventNames.pub, this._pubCourse, this);
                this.views.sellOutCourseTabView.on(this.eventNames.detail, this._detailCourse, this);

                var self = this;
                this.models.selloutCourseCollection.fetch({
                    data:{
                        select:3
                    }
                }).complete(function(){
                    $(self.els.selloutCourses).append(self.views.sellOutCourseTabView.render().el);
                    self.views.sellOutCourseTabView.activeListener();
                });
            }


        },
        showNewCourses:function(){//未发布
            if (!this.views.newCourseTabView){
                this.views.newCourseTabView = new CourseListView({
                    eventBus:this.eventBus,
                    el:this.els.newCourses,
                    collection:this.models.newCoursesCollection,
                    selectlv:0
                });
                this.views.newCourseTabView.on(this.eventNames.pub, this._pubCourse, this);
                this.views.newCourseTabView.on(this.eventNames.detail, this._detailCourse, this);
                this.views.newCourseTabView.on(this.eventNames.push, this._pushCourse, this);

                var self = this;
                this.models.newCoursesCollection.fetch({
                    data:{
                        select:0
                    }
                }).complete(function(){
                    $(self.els.newCourses).append(self.views.newCourseTabView.render().el);
                    self.views.newCourseTabView.activeListener();
                });
            }


        },
        showAllCourses:function(){
            if (!this.views.allCourseTabView){
                this.views.allCourseTabView = new CourseListView({
                    eventBus:this.eventBus,
                    el:this.els.allCourses,
                    collection:this.models.allCoursesCollection,
                    selectlv:-1
                });

                this.views.newCourseTabView.on(this.eventNames.detail, this._detailCourse, this);

                var self = this;
                this.models.allCoursesCollection.fetch().complete(function(){
                    $(self.els.allCourses).append(self.views.allCourseTabView.render().el);
                    self.views.allCourseTabView.activeListener();
                });
            }


        },
        courseManageNavTabChangeHandler:function(evt){
            var dataBind = $(evt.currentTarget).attr('data-bind');
            switch (dataBind) {
                case 'act':
                    this.showActCourses();
                    break;
                case 'pub':
                    this.showPubCourses();
                    break;
                case 'sellout':
                    this.showSelloutCourses();
                    break;
                case 'new':
                    this.showNewCourses();
                    break;
                case 'all':
                    this.showAllCourses();
                    break;
                default:

            }
        },
        actCourses_dataChange:function(){
            $(this.els.actCourses).append(this.views.actCourseTabView.render().el);
        },
        _hide:function(){
            $(this.el).css({
                'display':'none'
            });
        },
        _show:function(){
            $(this.el).css({
                'display':'block'
            });
        },
        _detailCourse:function(data){
            console.log(data.item.toJSON());
            var detail = new CourseDetailView({
                model:data.item
            });
            this.$el.append(detail.render().el);
        },
        _pubCourse:function(data){
            switch (data.select){
                case 0:
                    if (data.item.get('statelv').type == 3){
                        this.models.newCoursesCollection.remove(data.item);
                        data.item.set({
                            statelv:{
                                lv:1,
                                type:1,
                                name:'已发布'
                            }
                        })
                        this.models.pubCourseCollection.add(data.item, {
                            at:0
                        });
                        this.views.newCourseTabView.currentItem = null;

                        var msg = '课程 ['+data.item.get('name')+'] 更改为 '+'[发布] 状态';
                        this.eventBus.trigger(this.eventNames.pubCourseMsg, {
                            msg:{
                                info:msg,
                                time:'2016-1-10'
                            }
                        });

                    }else{

                    }
                    break;
                case 2:
                    if (data.item.get('statelv').type == 2){
                        this.models.actCourseCollection.remove(data.item);
                        data.item.set({
                            statelv:{
                                lv:1,
                                type:1,
                                name:'已发布'
                            }
                        })
                        this.models.pubCourseCollection.add(data.item, {
                            at:0
                        });

                        this.views.actCourseTabView.currentItem = null;
                    }
                    break;
                case 3:
                    this.models.selloutCourseCollection.remove(data.item);
                    data.item.set({
                        statelv:{
                            lv:1,
                            type:1,
                            name:'已发布'
                        }
                    })
                    this.models.pubCourseCollection.add(data.item, {
                        at:0
                    });

                    this.views.sellOutCourseTabView.currentItem = null;

                    var msg = '课程 ['+data.item.get('name')+'] 更改为 '+'[发布] 状态';
                    this.eventBus.trigger(this.eventNames.pubCourseMsg, {
                        msg:{
                            info:msg,
                            time:'2016-1-10'
                        }
                    });

                    break;
            }
        },
        _selloutCourse:function(data){
            switch (data.select){
                case 1:
                    if (data.item.get('statelv').type == 1){
                        this.models.pubCourseCollection.remove(data.item);
                        data.item.set({
                            statelv:{
                                lv:3,
                                type:2,
                                name:'已下架'
                            }
                        })
                        this.models.selloutCourseCollection.add(data.item, {
                            at:0
                        });
                        this.views.pubCourseTabView.currentItem = null;

                        var msg = '课程 ['+data.item.get('name')+'] 更改为 '+'[下架] 状态';
                        this.eventBus.trigger(this.eventNames.pubCourseMsg, {
                            msg:{
                                info:msg,
                                time:'2016-1-10'
                            }
                        });
                    }else{

                    }
                    break;
                case 2:
                    if (data.item.get('statelv').type == 2){
                        this.models.actCourseCollection.remove(data.item);
                        data.item.set({
                            statelv:{
                                lv:3,
                                type:2,
                                name:'已下架'
                            }
                        })
                        this.models.selloutCourseCollection.add(data.item, {
                            at:0
                        });
                        this.views.actCourseTabView.currentItem = null;

                        var msg = '课程 ['+data.item.get('name')+'] 更改为 '+'[下架] 状态';
                        this.eventBus.trigger(this.eventNames.pubCourseMsg, {
                            msg:{
                                info:msg,
                                time:'2016-1-10'
                            }
                        });
                    }else{

                    }
                    break;
            }
        },
        _prepareCourse:function(data){
            switch (data.select){
                case 1:
                    if (data.item.get('statelv').type == 1){
                        this.models.pubCourseCollection.remove(data.item);
                        data.item.set({
                            statelv:{
                                lv:2,
                                type:0,
                                name:'未开课'
                            }
                        })
                        this.models.actCourseCollection.add(data.item, {
                            at:0
                        });
                        this.views.pubCourseTabView.currentItem = null;

                        var msg = '课程 ['+data.item.get('name')+'] 更改为 '+'[准备开课] 状态';
                        this.eventBus.trigger(this.eventNames.pubCourseMsg, {
                            msg:{
                                info:msg,
                                time:'2016-1-10'
                            }
                        });
                    }else{

                    }
                    break;
            }
        },
        _beginCourse:function(data){

            switch (data.select){
                case 2:
                    if (data.item.get('statelv').type == 0){
                        data.item.set({
                            statelv:{
                                lv:2,
                                type:1,
                                name:'进行中'
                            }
                        });



                        this.views.actCourseTabView.currentItem = null;
                        console.log('begin');

                        var msg = '课程 ['+data.item.get('name')+'] 更改为 '+'[进行中] 状态';
                        this.eventBus.trigger(this.eventNames.pubCourseMsg, {
                            msg:{
                                info:msg,
                                time:'2016-1-10'
                            }
                        });

                    }else{

                    }
                    break;
            }
        },
        _endCourse:function(data){
            console.log('end');
            switch (data.select){
                case 2:
                    if (data.item.get('statelv').type == 1){
                        //this.models.actCourseCollection.remove(data.item);
                        data.item.set({
                            statelv:{
                                lv:2,
                                type:2,
                                name:'已结束'
                            }
                        });



                        this.views.actCourseTabView.currentItem = null;

                        var msg = '课程 ['+data.item.get('name')+'] 更改为 '+'[结束] 状态';
                        this.eventBus.trigger(this.eventNames.pubCourseMsg, {
                            msg:{
                                info:msg,
                                time:'2016-1-10'
                            }
                        });
                    }else{

                    }
                    break;
            }
        },
        _generateNewCourse:function(data){
            var model = new CourseModel();
            model.set(data);
            this.models.newCoursesCollection.add(model, {
                at:0
            });

            var msg = '创建了新的课程 ['+model.get('name')+']';
            this.eventBus.trigger(this.eventNames.pubCourseMsg, {
                msg:{
                    info:msg,
                    time:'2016-1-10'
                }
            });
        },
        _pushCourse:function(data){
            switch (data.select){
                case 0:
                    if (data.item.get('statelv').type == 0){
                        //this.models.actCourseCollection.remove(data.item);
                        //data.item.set({
                        //    statelv:{
                        //        lv:0,
                        //        type:1,
                        //        name:'等待审核'
                        //    }
                        //});

                        this.commitModel = new CourseModel();
                        this.commitModel.commitCourse(data.item.get('_id'));
                        this.commitModel.on('manage-course-commit-complete', this._pushCourseComplete, this);
                    }else{

                    }
                    break;
            }
        },
        _pushCourseComplete:function(json){
            console.log(json);
            if (json.state == 'fail'){
                console.log(data);
            }else if (json.state == 'success'){
                this.views.newCourseTabView.currentItem = null;

                var msg = '课程 ['+json.data.name+'] 更改为 '+'[等待审核] 状态';
                this.eventBus.trigger(this.eventNames.pubCourseMsg, {
                    msg:{
                        info:msg,
                        time:'2016-1-10'
                    }
                });
            }
        }
    });
    return v;
})
