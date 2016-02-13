/**
 * Created by Administrator on 2016/1/4.
 */
define('app/usercenter/view/home/HomeRightView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/usercenter/template/home/HomeRight.ejs'
    ],
    function (_, Backbone, $, tmpl) {
        var v = Backbone.View.extend({
            initialize: function (option) {
                this.eventBus = option.eventBus;
                this.template = _.template(tmpl);
            },
            render: function () {
                $(this.el).html(this.template({
                    homework: this.collection.models[0].attributes
                }));
                return this;
            }
        });
        return v;
    })