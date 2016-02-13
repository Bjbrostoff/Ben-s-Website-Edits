define('app/searchc/controller/Router',
[
    'underscore',
    'backbone',
    'jquery',

    'app/searchc/view/CourseSearchCdView',
    'app/searchc/view/CourseListView'

],
function(_, Backbone, $,
        CourseSearchCdView,CourseListView){
    var r = Backbone.Router.extend({
        el:'body',
        routes:{
            '':'index'
        },
        initialize:function(){
            this.elems = {
                'resultView':'#result-view',
                'conditionView':'#condition-view'
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

            this._hideAllSubViews();
            this.views.conditionView.show();
            this.views.resultView.show();

        },
        _detectSubView:function(viewname){
            switch (viewname) {
                case "searchcondition":
                    if (!this.views.conditionView){
                        this.views.conditionView = new CourseSearchCdView();
                        $(this.elems.conditionView).append(this.views.conditionView.render().el);
                        this.views.conditionView.render();
                        this.views.conditionView.on('condition-has-changed', this._conditionHasChanged, this);
                        this.views.conditionView.on('searchbtn-did-click', this._searchBtnDidClick, this);
                        this.views.conditionView.searchCondition();
                    }
                    break;
                case "searchresult":
                    if (!this.views.resultView){
                        this.views.resultView = new CourseListView();
                        $(this.elems.resultView).append(this.views.resultView.render().el);
                        this.views.resultView.render();
                        this.views.resultView.on('coursecount-has-changed',this._courseCountChanged, this);
                        this.views.resultView.recommendation();
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
        _courseCountChanged: function(e){
            this.views.conditionView.courseCountChanged(e);
        },
        _searchBtnDidClick: function(e){
            //this.views.resultView.fetchBySearch(e);
        }

    });

    return r;
})
