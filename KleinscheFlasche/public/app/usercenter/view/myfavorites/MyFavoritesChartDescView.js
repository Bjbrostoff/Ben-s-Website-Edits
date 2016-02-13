/**
 * Created by cs on 2016/1/2.
 */
define('app/usercenter/view/myfavorites/MyFavoritesChartDescView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/usercenter/template/myfavorites/MyFavoritesChartDescView.ejs'
    ],
    function(_, Backbone, $, tmpl){
        var v = Backbone.View.extend({
            events:{
                'click .fav-chart-item':'favChartItemClickHandler'
            },
            initialize:function(options){
                this.eventBus = options.eventBus;
                this.template = _.template(tmpl);
                this.datas = options.datas;
                this.colors = options.colors;
            }
            ,render:function(){
                $(this.el).html(this.template({
                    datas:this.datas,
                    colors:this.colors,
                }));
                return this;
            },
            favChartItemClickHandler:function(evt){
                this.eventBus.trigger('myFavorite-toolbar-changed',$(evt.currentTarget).attr("data-type"));
            }
        });
        return v;
    })
