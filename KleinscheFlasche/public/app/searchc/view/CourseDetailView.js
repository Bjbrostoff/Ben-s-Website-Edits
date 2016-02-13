/**
 * Created by xiaoguo on 16/1/7.
 */
define('app/searchc/view/CourseDetailView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/searchc/template/CourseDetailView.ejs',

        'app/searchc/model/CourseDetailModel',

        'jquery.slimscroll'
    ],
    function(_, Backbone, $, tmpl,
             CourseDetailModel){
        var v = Backbone.View.extend({
            events:{
                'click .course-detail-close':'closeView_handler'
            },
            initialize:function(options){

                this.template = _.template(tmpl);

                this.els = {

                };
                this.model = new CourseDetailModel();

            },
            render:function(json){
                $(this.el).html(this.template({
                    course:json
                }));
                this.model.set(json);
                return this;
            },

            closeView_handler:function(){
                //console.log('11');
                this.remove();
            },
            addSlimScroll:function(){
                $('.full-height-scroll').slimscroll({
                    height: '100%'
                });
            }
    });
        return v;
    })
