/**
 * Created by Administrator on 2016/1/6.
 */
define('app/usercenter/view/home/DetailInfoView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/usercenter/template/home/DetailInfo.ejs'
    ],
    function(_, Backbone, $, tmpl){
        var v = Backbone.View.extend({
            initialize:function(option){
                this.eventBus = option.eventBus;
                this.template = _.template(tmpl);
            },
            render:function(date){
                $(this.el).html(this.template({
                    date:date
                }));
                return this;
            }
        });
        return v;
    })