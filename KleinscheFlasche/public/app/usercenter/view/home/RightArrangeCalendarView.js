/**
 * Created by Administrator on 2016/1/5.
 */
define('app/usercenter/view/home/RightArrangeCalendarView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/usercenter/template/home/RightArrangeCalendar.ejs',
        'icheck'
    ],
    function(_, Backbone, $, tmpl,icheck){
        var v = Backbone.View.extend({
            initialize:function(option){
                this.eventBus = option.eventBus;
                this.template = _.template(tmpl);
                this.eventBus.on('drop',this.getTimeAndDay,this);
            },
            render:function(result){
                $(this.el).html(this.template({
                    calendarData:result
                }));
                this.preparePage();
                return this;
            },
            preparePage:function(){
                $(document).ready(function () {
                    $('.i-checks').iCheck({
                        checkboxClass: 'icheckbox_square-green',
                        radioClass: 'iradio_square-green'
                    });

                    $('#external-events div.external-event').each(function () {
                        $(this).data('event', {
                            ch: $(this).attr('_id'),
                            //start:$(this).attr('sa'),
                            title: $.trim($(this).text()),
                            stick: true
                        });
                        $(this).draggable({
                            zIndex: 1111999,
                            revert: true,
                            revertDuration: 0
                        });
                    });
                });
            },
            getTimeAndDay:function(){
              console.log(222)
            }

        });
        return v;
    })