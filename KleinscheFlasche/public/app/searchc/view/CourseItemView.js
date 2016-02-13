define('app/searchc/view/CourseItemView',
[
    'underscore',
    'backbone',
    'jquery',
    'text!/app/searchc/template/CourseItemView.ejs'
],
function(_, Backbone, $, tmpl){
    var v = Backbone.View.extend({
        events:{
            'click .course-info-box':'courseInfoBox_clickHandler'
        },
        initialize:function(options){
            this.template = _.template(tmpl);
        },
        render:function(){
            $(this.el).html(this.template({course:this.model.toJSON()}));
            return this;
        },
        courseInfoBox_clickHandler:function(evt){

            this.trigger('course-did-collect', {});
        },
    });
    return v;
})
