define('app/searcht/controller/Router',
[
    'underscore',
    'backbone',
    'jquery',

    'app/searcht/view/TeacherSearchCdView',
    'app/searcht/view/TeacherListView',
    'app/searcht/view/ProfileDetailView',
    'app/searcht/view/ProfileCourseView',
    'app/map/view/MapView'

],
function(_, Backbone, $,
        TeacherSearchCdView,TeacherListView,
        ProfileDetailView,ProfileCourseView, MapView){
    var r = Backbone.Router.extend({
        el:'body',
        routes:{
            '':'index',
            'profile/:id':'profile'
        },
        initialize:function(){
            this.elems = {
                'resultView':'#result-view',
                'conditionView':'#condition-view',
                'profileDetailView':'#profile-detail',
                'profileCourseView':'#profile-course'
            };
            this.views = {

            };
            this.models = {

            };
            this.profileid ='';
        },
        index:function(){
            this._detectSubView("searchcondition");
            this._detectSubView("searchresult");

            this._detectSubView("mapview");

            this._hideAllSubViews();
            this.views.conditionView.show();
            this.views.resultView.show();
            this.views.mapView.show();

        },
        profile:function(id){
            //console.log(id);
            this.profileid = id;
            this._detectSubView("profiledetail");
            this._detectSubView("profilecourse");
            this._hideAllSubViews();
            this.views.profileDetailView.show();
            this.views.profileCourseView.show();
        },
        _detectSubView:function(viewname){
            switch (viewname) {
                case "searchcondition":
                    if (!this.views.conditionView){
                        this.views.conditionView = new TeacherSearchCdView();
                        $(this.elems.conditionView).append(this.views.conditionView.render().el);
                        this.views.conditionView.render();
                        this.views.conditionView.on('condition-has-changed', this._conditionHasChanged, this);
                        this.views.conditionView.on('searchbtn-did-click', this._searchBtnDidClick, this);
                        this.views.conditionView.searchCondition();
                    }
                    break;
                case "searchresult":
                    if (!this.views.resultView){
                        this.views.resultView = new TeacherListView();
                        $(this.elems.resultView).append(this.views.resultView.render().el);
                        this.views.resultView.render();
                        this.views.resultView.on('teachercount-has-changed',this._teacherCountChanged, this);
                        this.views.resultView.on('open-profile-view',this._openProfileView, this);
                        this.views.resultView.recommendation();
                    }
                    break;
                case "profiledetail":
                    if(this.views.profileDetailView){
                        this.views.profileDetailView.remove();
                    }
                    //console.log(this.profileid);
                    this.views.profileDetailView = new ProfileDetailView();
                    this.views.profileDetailView.setProfileId(this.profileid);
                    $(this.elems.profileDetailView).append(this.views.profileDetailView.render().el);
                    break;
                case "profilecourse":
                    if (!this.views.profileCourseView){
                        this.views.profileCourseView = new ProfileCourseView();
                        $(this.elems.profileCourseView).append(this.views.profileCourseView.render({profileid:this.profileid}).el);
                    }
                    break;
                case "mapview":
                    if (!this.views.mapView){
                        this.views.mapView = new MapView({
                            el:'#map-container',
                            mapDomId:'map'

                        });

                        this.views.mapView.render()
                            .locateMe();

                        var json = [
                            {
                                lgtd:120.262,
                                lttd:30.263,
                                name:'Chris'
                            },
                            {
                                lgtd:120.254,
                                lttd:30.253,
                                name:'Chris'
                            }
                        ];
                        this.views.mapView.setMarkers(json);

                        //清除
                        //this.views.mapView.clearMarkers();
                    }
                    break;
            }
        },
        _hideAllSubViews:function(){
            var self = this;
            _.each(this.views, function(item){
                item.hide();
            });
        },
        _conditionHasChanged:function(e){
            this.views.resultView.fetchBy(e);
        },
        _teacherCountChanged: function(e){
            this.views.conditionView.teacherCountChanged(e);
        },
        _openProfileView: function(e){
            //console.log(e);
            this.profileid = e.userid;
            window.location.href = '#profile/'+e.userid
        },
        _searchBtnDidClick: function(e){
            //this.views.resultView.fetchBySearch(e);
        }

    });

    return r;
})
