define('app/usercenter/view/LeftMenuItemView',
[
    'underscore',
    'backbone',
    'jquery',
    'text!/app/usercenter/template/LeftMenuItem.ejs'
],
function(_, Backbone, $, tmpl){
    var v = Backbone.View.extend({
        initialize:function(){
            this.template = _.template(tmpl);
        },
        render:function(){
            this.el=this.template({menu:this.model.toJSON()});
            return this;
        }
    });
    return v;
})
