/**
 * Created by Administrator on 2016/1/2.
 */
define('app/usercenter/view/home/CalendarView',
    [
        'underscore',
        'backbone',
        'jquery',
        'moment',
        'fullcalendar',
        'text!/app/usercenter/template/home/Calendar.ejs'
    ],
    function (_, Backbone, $, moment, fullcalendar, tmpl) {
        var v = Backbone.View.extend({
            events: {
                'click #btn': 'getResource'
            },
            initialize: function (option) {
                this.eventBus = option.eventBus;
                this.template = _.template(tmpl);
                this.elems = {
                    'calendar': '#home-calendar'
                }

                this.eventBus.on('success', this.renderEvent, this);
                this.eventBus.on('cancel', this.removeEvent, this);
            },
            render: function () {
                $(this.el).html(this.template({}));
                return this;
            },
            buildCalendar: function (data) {
                var self = this;
                $(this.elems.calendar).fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        //right: 'month,agendaWeek,agendaDay'
                        right: '',
                    },
                    //defaultDate: t,
                    editable: true,
                    eventLimit: true,
                    droppable: true,
                    selectable: true,
                    weekMode: 'liquid',
                    eventDurationEditable: false,//不允许跨天
                    buttonText: {
                        today: '今天'
                    },
                    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    dayNamesShort: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                    dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                    events: data,
                    dayClick: function (date, jsEvent, view) {
                        var t = date.format();
                        self.eventBus.trigger('dayClick', t);
                    },
                    eventClick: function (calEvent, jsEvent, view) {
                        self.eventBus.trigger('eventClick', calEvent);
                        console.log(calEvent)
                    },
                    eventDrop: function (event, delta, revertFunc) {
                        alert(event.title + " 被移动到 " + event.start.format());
                        if (!confirm("确定进行修改吗？")) {
                            revertFunc();
                        }
                    },
                    eventDragStop: function () {
                        console.log('eventDragStop')
                    },
                    drop: function (date, jsEvent, ui, resourceId) {
                        console.log(jsEvent)
                        self.eventBus.trigger('drop',date,jsEvent);

                    }
                });

            },
            addOneDay: function () {
                $(this.elems.calendar).fullCalendar('addEventSource', {
                    events: [
                        {
                            id:5555,
                            title: '111111111',
                            start: '2016-01-01',
                            end: '2014-09-03'
                        }
                    ],
                    textColor: 'red'
                });
            },

            removeEvent:function(jsEvent){
                $(this.elems.calendar).fullCalendar('removeEvents', [jsEvent]);
            },

            renderEvent:function(){
                //$(this.elems.calendar).fullCalendar( 'renderEvent', event )
            }
        });
        return v;
    })