/**
 * Created by clock on 2015/12/30.
 */
define('app/usercenter/view/coursemanage/CourseTableView',
[
    'underscore',
    'backbone',
    'jquery',
    'text!/app/usercenter/template/coursemanage/CourseTableView.ejs'
],
function(_, Backbone, $, tmpl){
    var v = Backbone.View.extend({
        initialize:function(option){
            this.eventBus = option.eventBus;
            this.template = _.template(tmpl);
        }
        ,render:function(){
            $(this.el).html(this.template({
                ident:'identity',
                fields:[{fname:'name', falias:'名称'},
                        {fname:'type', falias:'类型'},
                        {fname:'state', falias:'状态'},
                        ],
                datas:this.collection.toJSON()
            }));

            return this;
        }
    });
    return v;
})
