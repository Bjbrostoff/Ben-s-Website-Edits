/**
 * Created by cs on 2016/1/19.
 */
define('app/usercenter/view/myteachers/MyTeachersListView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/usercenter/template/myteachers/MyTeachersListView.ejs'
    ],
    function(_, Backbone, $,MyTeachersListView,MyTeachersListDataCollection){
        var v = Backbone.View.extend({
            events: {
            },
            initialize:function(options){
                this.eventBus = options.eventBus;
                this.teachers = options.teachers;
                this.views = [];
                this.template = _.template(MyTeachersListView);
            },
            render:function(datas){
                var teachers;
                if(datas)
                    teachers = datas;
                else
                    teachers = this.teachers;
                $(this.el).html(this.template({
                    teachers:teachers
                }));
                return this;
            }
        });
        return v;
    })
