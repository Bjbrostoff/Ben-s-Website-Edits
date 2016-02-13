/**
 * Created by Administrator on 2016/1/14.
 */
define('app/usercenter/view/home/TodayInfoView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/usercenter/template/home/TodayInfo.ejs'
    ],
    function(_, Backbone, $, tmpl){
        var v = Backbone.View.extend({
            initialize:function(option){
                this.eventBus = option.eventBus;
                this.template = _.template(tmpl);
            },
            render:function(){
                $(this.el).html(this.template({
                    dateInfo:this.collection.toJSON()
                }));
                return this;
            }
        });
        return v;
    })