/**
 * Created by Administrator on 2016/1/17.
 */
define('app/usercenter/view/StudentHomeView',
    [
        'underscore',
        'backbone',
        'jquery',
        'jqueryui',

        'text!/app/usercenter/template/StudentHomeView.ejs',

        'app/usercenter/view/stuhome/CalendarView',
        'app/usercenter/collection/stuhome/CalendarCollection'

        //'app/usercenter/collection/home/InfoCollection',
        //'app/usercenter/view/home/InfoView',
        //'app/usercenter/model/home/InfoModel',
        //

        //
        //'app/usercenter/view/home/HomeRightView',
        //'app/usercenter/collection/home/HomeRightCollection',
        //
        //'app/usercenter/view/home/DetailInfoView',
        //'app/usercenter/collection/home/DetailInfoCollection',
        //
        //'app/usercenter/view/home/RightArrangeCalendarView',
        //'app/usercenter/collection/home/RightArrangeCalendarCollection',
        //
        //'app/usercenter/view/home/TodayInfoView',
        //'app/usercenter/collection/home/TodayInfoCollection'



    ],
    function (_, Backbone, $, jqueryui,
              tmpl,
              CalendarView,CalendarCollection

    ) {
        var v = Backbone.View.extend({
            el: '.home-container',
            events: {

            },
            initialize: function (option) {
                this.eventBus = option.eventBus;
                this.els = {
                    'myCalendar': '#home-manage-act-calendar',
                    'myInfo': '#home-manage-act-info',
                    'myHomeRight': '#home-manage-act-right'

                };
                this.models = {};
                this.views = {};
                this.models = {
                    //'myInfoCollection': new InfoCollection(),
                    'myCalendarCollection': new CalendarCollection(),
                    //'myHomeRightCollection': new HomeRightCollection()
                };

                this.eventNames = {
                    'globalMsg': 'global-msg'
                };

                this.eventBus.on(this.eventNames.globalMsg, this._globalMsg, this);
            },
            render: function () {
                $(this.el).html(_.template(tmpl));
                console.log('students')
                this.showCalendar();
                this._refreshBindElem();
                return this;

            },

            showCalendar:function(){
                if (!this.views.myCalendarView) {
                    this.views.myCalendarView = new CalendarView({
                        eventBus: this.eventBus,
                        el: this.els.myCalendar,
                        collection: this.models.myCalendarCollection

                    });
                }

                var self = this;
                $(self.els.myCalendar).append(self.views.myCalendarView.render().el);
                this.models.myCalendarCollection.fetch({
                    success: function (collection, resp) {
                        self.views.myCalendarView.buildCalendar(resp);
                    }
                });
            },

            show: function () {
                this._show();
            },
            hide: function () {
                this._hide();
            },
            _refreshBindElem: function () {
                this.elems = {
                    'dom': $('.page-content-home')
                }
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
            },
            _globalMsg: function (data) {
                console.log('msg0');
                var model = new InfoModel();
                model.set(data.msg);
                this.models.myInfoCollection.add(model, {
                    at: 0
                })
            }

        });
        return v;
    })
