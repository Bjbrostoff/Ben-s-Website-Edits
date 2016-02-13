define('app/searcht/view/TeacherItemView',
[
    'underscore',
    'backbone',
    'jquery',
        'text!/app/searcht/template/TeacherItemView.ejs'
],
function(_, Backbone, $, tmpl){
    var v = Backbone.View.extend({
        events:{
            'click .teacher-info-box':'teacherInfoBox_clickHandler'
        },
        initialize:function(options){
            this.template = _.template(tmpl);
        },
        render:function(){
            $(this.el).html(this.template({teacher:this.model.toJSON()}));
            return this;
        },
        teacherInfoBox_clickHandler:function(evt){

            this.trigger('teacher-did-collect', {});
        },
    });
    return v;
})
