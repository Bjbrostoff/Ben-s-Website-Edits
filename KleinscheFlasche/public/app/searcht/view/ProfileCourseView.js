/**
 * Created by xiaoguo on 16/1/9.
 */
define('app/searcht/view/ProfileCourseView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/searcht/template/ProfileCourseView.ejs'
    ],
    function(_, Backbone, $, tmpl){
        var v = Backbone.View.extend({
            events:{

            },
            initialize:function(options){
                this.template = _.template(tmpl);
                this.profileid = '';
            },
            render:function(profileid){

                $(this.el).html(this.template({}));
                return this;
            },
            show: function () {
                this._show();
            },
            hide: function () {
                this._hide();
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
