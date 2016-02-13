/**
 * Created by xiaoguo on 16/1/1.
 */
define('app/searcht/view/TeacherSearchCdView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/searcht/template/TeacherSearchCdView.ejs',

        'app/searcht/view/SearchConditionItemView',

        'app/searcht/collection/SearchConditionCollection'
    ],
    function(_, Backbone, $, tmpl,
             ConditionItemView,
             ConditionCollection){
        var v = Backbone.View.extend({

            events:{
                'click .sort-item':'sortTlist_clickHandler',
                'click .pager-prev':'pagePrev_clickHandler',
                'click .pager-next':'pageNext_clickHandler',
                'click .search-button':'searchButton_clickHandler'
            },

            initialize:function(options){
                console.log('111');
                // if (options.hasOwnProperty('eventBus')){
                //     this.eventBus = options.eventBus;
                // }

                this.template = _.template(tmpl);

                this.els = {
                    'itemlist':'#condition-item-list',
                    'sortlist':'#sort-t-list',
                    'pageprevbtn':'#page-prev-btn',
                    'pagenextbtn':'#page-next-btn',
                    'nowpage':'#searcht-nowpage',
                    'totalpage':'#searcht-totalpage',
                    'searchinput':"#search-teacher-input"
                }

                this.models = {

                };

                this.teachertotal = 0;
                this.totalpage = 0;

                this.searchCd ={
                    'condition':[],
                    'sorttag':'score',
                    'limit':15,
                    'page':1
                };

                this.models.conditionCollection = new ConditionCollection();

                this.models.conditionCollection.on('add', this._addItem, this);
            },
            render:function(){

                $(this.el).html(this.template({nowpage:this.searchCd.page,totalpage:this.totalpage}));

                return this;
            },
            show: function () {
                this._show();
            },
            hide: function () {
                this._hide();
            },
            searchCondition:function(){
                this.models.conditionCollection.fetch().complete(function(){
                    console.log('success');
                });
                console.log('12');
            },
            sortTlist_clickHandler:function(evt){
                $(this.els.sortlist).find('.active').removeClass('active');
                $(evt.currentTarget).addClass('active');
                this.searchCd.sorttag = $(evt.currentTarget).attr('sorttag');
                this.searchCd.page = 1;
                this.trigger('condition-has-changed', {arr:this.searchCd});
            },
            pagePrev_clickHandler:function(evt){
                if(!$(evt.currentTarget).hasClass('disabled')){
                    this.searchCd.page -= 1;
                    this.trigger('condition-has-changed', {arr:this.searchCd});
                }

            },
            pageNext_clickHandler:function(evt){
                if(!$(evt.currentTarget).hasClass('disabled')){
                    this.searchCd.page +=1;
                    this.trigger('condition-has-changed', {arr:this.searchCd});
                }
            },
            //测试搜索
            searchButton_clickHandler:function(evt){
                var name = $(this.els.searchinput).val();
                this.trigger('searchbtn-did-click',{arr:name});
            },
            teacherCountChanged:function(m){
                this.teachertotal = m.arr;
                //this.searchCd.page = 1;
                this.totalpage = parseInt(this.teachertotal/this.searchCd.limit)+1;
                console.log('teachertotal:'+m.arr+'----'+'totalpage:'+this.totalpage);
                $(this.els.nowpage).html(this.searchCd.page);
                $(this.els.totalpage).html(this.totalpage);

                if(this.searchCd.page>1){
                    $(this.els.pageprevbtn).removeClass('disabled');
                }else{
                    $(this.els.pageprevbtn).addClass('disabled');
                };
                if(this.searchCd.page<this.totalpage){
                    $(this.els.pagenextbtn).removeClass('disabled');
                }else{
                    $(this.els.pagenextbtn).addClass('disabled');
                };

            },
            _addItem:function(item){
                var item = new ConditionItemView({model:item});
                $(this.els.itemlist).append(item.render().el);
                var self = this;
                item.on('condition-did-collect', function(e){
                    self.searchCd.condition = e ;
                    self.searchCd.page = 1;
                    self.trigger('condition-has-changed', {arr:self.searchCd});
                })
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
