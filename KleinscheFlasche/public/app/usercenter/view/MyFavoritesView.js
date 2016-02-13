/**
 * Created by cs on 2016/1/1.
 */
define('app/usercenter/view/MyFavoritesView',
    [
        'underscore',
        'backbone',
        'jquery',

        'text!/app/usercenter/template/MyFavoritesView.ejs',
        'app/usercenter/collection/myfavorites/MyFavoritesColumnsCollection',
        'app/usercenter/collection/myfavorites/MyFavoritesTypesCollection',
        'app/usercenter/collection/myfavorites/MyFavoritesDataCollection',
        'app/usercenter/collection/myfavorites/MyFavoritesChartCollection',
        'app/usercenter/view/myfavorites/MyFavoritesToolbarView',
        'app/usercenter/view/myfavorites/MyFavoritesDataTableView',
        'app/usercenter/view/myfavorites/MyFavoritesChartDescView',
        'app/usercenter/view/myfavorites/CourseDetailInfoView',
        'app/usercenter/view/myfavorites/TeacherDetailInfoView'
    ],
    function (_, Backbone, $, tmpl, FavoritesColumnsCollection, FavoritesTypesCollection, FavoritesDataCollection,
              FavoritesChartCollection,FavoritesToolbarView, FavoritesDataTableView,FavoritesChartDescView,
              CourseDetailInfoView,TeacherDetailInfoView) {
        var v = Backbone.View.extend({
            el: '.myfavorites-container',
            events: {
                'click li.myfavorite-nav-tab':'myFavoriteNavTabChangeHandler',
                'click #btn-search': 'btnSearch_clickHandler',
                'click #btn-refresh': 'btnRefresh_clickHandler',
                'click #btn-trash': 'btnTrash_clickHandler'
            },
            initialize: function (option) {
                this.eventBus = option.eventBus;
                this.els = {
                    'chart': 'myfavorite-chart',
                    'chartDesc': '#myfavorite-chart-desc', //Morris图表下面的描述
                    'courseListEl':'#myfavorite-tab-course',
                    'teacherListEl':'#myfavorite-tab-teacher',
                    'agencyListEl':'#myfavorite-tab-agency',
                    'allListEl':'#myfavorite-tab-all',
                    'detailEl':'#myfavorite-detail-container',
                    'tabs':'.myfavorite-nav-tab'
                }
                this.viewType = 1; //0:table,1:list
                this.curType = 1;
                this.models = {};
                this.views = {};
                this.models.favoritesColumnsCollection = new FavoritesColumnsCollection();
                this.models.favoritesTypesCollection = new FavoritesTypesCollection();
                this.models.favoritesDataCollection = new FavoritesDataCollection();
                this.models.favoritesChartCollection = new FavoritesChartCollection();
                this.eventBus.on('myFavorite-showDetailInfo', this.showDetailInfo, this);
                this.eventBus.on('myFavorite-toolbar-changed', this.TabChangeHandler, this);
            },
            myFavoriteNavTabChangeHandler:function(evt){
                var type = parseInt($(evt.currentTarget).attr('data-type'));
                this.curType = type;
                this._showCourseTable(-2,type);
            },
            TabChangeHandler:function(type){
               // $(this.els.tabs).removeClass('active');
                _.each($(this.els.tabs), function (el) {
                    if ($(el).attr("data-type") == type) {
                        //.addClass('active');
                        $(el).click();
                    }
                });
              //  this.curType = type;
               // this._showCourseTable(-2,type);
            },
            //初始化Favorites Table(reset:0重置测试数据,)
            _showCourseTable:function(reset,type){
                switch (type){
                    case 1:
                    default:
                        this.appendTable(reset,'courseListView',this.els.courseListEl,1);
                        break;
                    case 2:
                        this.appendTable(reset,'teacherListView',this.els.teacherListEl,2);
                        break;
                    case 3:
                        this.appendTable(reset,'agencyListView',this.els.agencyListEl,3);
                        break;
                    case 0:
                        this.appendTable(reset,'allListView',this.els.allListEl,0);
                        break;
                }
            },
            appendTable:function(reset,viewKey,elm,type) {
                var self = this;
                if (!this.views[viewKey]) {
                    console.log(type);
                    var view = new FavoritesDataTableView({
                        viewType: type,
                        eventBus: this.eventBus,
                        el: elm,
                        datas: this.models.favoritesDataCollection
                    });
                    this.views[viewKey] = view;
                }
                this.models.favoritesDataCollection.fetch({
                    data: $.param({type: type,reset:reset})
                }).complete(function () {
                    $(elm).append(self.views[viewKey].render().el);
                    if(reset>=-1)
                    self.initChart();//重新初始化图表
                });
            },
            //详情
            showDetailInfo:function(type,datas){
                if (this.views.DetailInfoView)
                    this.views.DetailInfoView.remove();
                switch (type){
                    case "course":
                        this.views.DetailInfoView = new CourseDetailInfoView({
                            course:datas
                        });
                        break;
                    case "teacher":
                        //like guo:app/searcht/model/TeacherModel
                        this.views.DetailInfoView = new TeacherDetailInfoView({
                            teacher:{
                                userinfo:{
                                    uuid: datas.objectid._id,
                                    name: datas.objectid.name,
                                    sex:datas.objectid.sex,
                                    age:datas.objectid.age,
                                    nationality: datas.objectid.nationality,
                                    city: datas.objectid.city,
                                    portrait:datas.objectid.portrait?datas.objectid.portrait:"/inspinia/img/a1.jpg"
                                },
                                custominfo:{
                                    starlevel:"一星级",
                                    degree:"学位",
                                    servexerti:[]
                                },
                                optioninfo:{
                                    mothertongue:{
                                        value:'英语',
                                        pub:'1'
                                    },
                                    language:{
                                        value:'英语',
                                        pub:'1'
                                    },
                                    skilledcourse:{
                                        value:'日常英语',
                                        pub:'1'
                                    },
                                    info:{
                                        value:"来吧同学.来吧同学来吧同学来吧同学来吧同学",
                                        pub:'1'
                                    }
                                }
                            }
                        });
                        break;
                }
                $(this.el).append(this.views.DetailInfoView.render().el);
            },
            //图表
            initChart:function(){
                var self = this;
                var datas = [];
                this.models.favoritesChartCollection.fetch().complete(function () {
                    var collect =  self.models.favoritesChartCollection;
                    var results = collect.toJSON()[0];
                    $('#myfavorite-chart').empty();
                    Morris.Donut({
                        element: self.els.chart,
                        data: results.data,
                        resize: true,
                        colors: results.colors
                    });
                    self.views.favoritesChartDescView = new FavoritesChartDescView({
                        eventBus: self.eventBus,
                        el: self.els.chartDesc,
                        datas: results.data,
                        colors:results.colors
                    });
                    $(self.els.chartDesc).append(self.views.favoritesChartDescView.render().el);
                });
            },
            btnSearch_clickHandler: function () {
                var searchKey = $('#input-search').val();
                console.log('search'+searchKey);
            },
            btnRefresh_clickHandler: function () {
                console.log('refresh');
                this._showCourseTable(0,this.curType);
            },
            btnTrash_clickHandler: function () {
                var self = this;
                console.log('trash');
                $.ajax({
                    url:'/mod/user/clearFavorite',
                    type:'get',
                    success:function(json){
                        console.log('clear success');
                        $(self.els.chartDesc).empty();
                        $(self.els.courseListEl).empty();
                        $(self.els.teacherListEl).empty();
                        $(self.els.agencyListEl).empty();
                        $(self.els.allListEl).empty();
                        $('#myfavorite-chart').empty();
                    }
                });

            },
            render: function () {
                $(this.el).html(_.template(tmpl));
                //this._initToolBars();
                this._showCourseTable(-1,1);
                return this;
            },
            hide: function () {
                this._hide();
            },
            show: function () {
                this._show();
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
            }
        });
        return v;
    })
