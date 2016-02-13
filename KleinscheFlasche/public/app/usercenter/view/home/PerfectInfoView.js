/**
 * Created by Administrator on 2016/1/17.
 */
define('app/usercenter/view/home/PerfectInfoView',
    [
        'underscore',
        'backbone',
        'jquery',
        'bootbox',
        'timepicker',
        'text!/app/usercenter/template/home/PerfectInfo.ejs'
    ],
    function(_, Backbone, $,bootbox, timepicker,tmpl){
        var v = Backbone.View.extend({
            initialize:function(option){
                this.eventBus = option.eventBus;
                this.template = _.template(tmpl);
                this.elems = {
                    'timepicker': '#timepicker'
                }
            },
            render:function(date){
                $(this.el).html(this.template({
                    date:date
                }));
                return this;

            },
            buildTimePicker:function(){
                $(this.elems.timepicker).timepicker({
                    minuteStep: 5,
                    template: false,
                    maxHours:24,
                    appendWidgetTo: 'body',
                    showMeridian: false,
                    defaultTime:'current'
                });
            },
            buildDialog:function(date,jsEvent){
                var self=this;
                bootbox.dialog({
                    title: "完善课程信息",
                    message: self.el.innerHTML,
                    buttons: {
                        success: {
                            label: "确定",
                            className: "btn-primary",
                            callback: function() {
                                var location=$('#location').val();
                                var time=$('#timepicker').val();
                                self.eventBus.trigger('success');
                            }
                        },
                        cancel: {
                            label: "取消",
                            className: "btn-primary",
                            callback: function() {
                                self.eventBus.trigger('cancel',jsEvent);
                            }
                        }
                    }
                });
            },
        });
        return v;
    })