define('app/usercenter/view/HomeView',
    [
        'underscore',
        'backbone',
        'jquery',
        'jqueryui',

        'text!/app/usercenter/template/HomeView.ejs',

        'app/usercenter/collection/home/InfoCollection',
        'app/usercenter/view/home/InfoView',
        'app/usercenter/model/home/InfoModel',

        'app/usercenter/view/home/CalendarView',
        'app/usercenter/collection/home/CalendarCollection',

        'app/usercenter/view/home/HomeRightView',
        'app/usercenter/collection/home/HomeRightCollection',

        'app/usercenter/view/home/DetailInfoView',
        'app/usercenter/collection/home/DetailInfoCollection',

        'app/usercenter/view/home/RightArrangeCalendarView',
        'app/usercenter/collection/home/RightArrangeCalendarCollection',

        'app/usercenter/view/home/TodayInfoView',
        'app/usercenter/collection/home/TodayInfoCollection',

        'app/usercenter/view/home/PerfectInfoView'



    ],
    function (_, Backbone, $, jqueryui,
              tmpl,

              InfoCollection,
              InfoView,
              InfoModel,

              CalendarView,
              CalendarCollection,

              HomeRightView,
              HomeRightCollection,

              DetailInfoView,
              DetailInfoCollection,

              RightArrangeCalendarView,
              RightArrangeCalendarCollection,

              TodayInfoView,
              TodayInfoCollection,

              PerfectInfoView

             ) {
        var v = Backbone.View.extend({
            el: '.home-container',
            events: {
                'click .close-link': 'removeDetailInfo'
            },
            initialize: function (option) {
                this.eventBus = option.eventBus;
                this.els = {
                    'myCalendar': '#home-manage-act-calendar',
                    'myInfo': '#home-manage-act-info',
                    'myHomeRight': '#home-manage-act-right',
                    'myDetailInfo': '#detail-container',
                    'myArrangeCalendar': '#home-arrange-calendar',
                    'myTodayInfo':'#home-manage-act-today',
                    'myPerfectInfo':'#modal-content',

                };
                this.models = {};
                this.views = {};
                this.models = {
                    'myInfoCollection': new InfoCollection(),
                    'myCalendarCollection': new CalendarCollection(),
                    'myHomeRightCollection': new HomeRightCollection(),
                    'myArrangeCalendarCollection': new RightArrangeCalendarCollection(),
                    'myDetailInfoCollection': new DetailInfoCollection(),
                    'myTodayInfoCollection':new TodayInfoCollection()
                };

                this.eventNames = {
                    'dayClick': 'dayClick',
                    'eventClick': 'eventClick',
                    'globalMsg': 'global-msg'
                };

                this.eventBus.on('dayClick', this.showRightArrange, this);
                this.eventBus.on('eventClick', this.showDetailInfo, this);
                this.eventBus.on(this.eventNames.globalMsg, this._globalMsg, this);
                this.eventBus.on('drop', this.showPerfectInfo, this);


            },
            render: function () {
                $(this.el).html(_.template(tmpl));
                this.showMyInfo();
                this.showMyCalendar();
                this.showMyHomeRight();
                this.showTodayInfo();
                this._refreshBindElem();
                return this;

            },
            showMyInfo: function () {
                if (!this.views.myInfoView) {
                    this.views.myInfoView = new InfoView({
                        eventBus: this.eventBus,
                        el: this.els.myInfo,
                        collection: this.models.myInfoCollection
                    });

                    var self = this;
                    this.models.myInfoCollection.fetch({
                        success: function (collection, resp) {
                            $(self.els.myInfo).append(self.views.myInfoView.render(resp).el);
                        }
                    });
                    this.views.myInfoView.addListeners();

                }

            },
            showMyCalendar: function () {
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

            showMyHomeRight: function () {
                if (!this.views.myHomeRightView) {
                    this.views.myHomeRightView = new HomeRightView({
                        eventBus: this.eventBus,
                        el: this.els.myHomeRight,
                        collection: this.models.myHomeRightCollection
                    });
                }
                var self = this;
                this.models.myHomeRightCollection.fetch().complete(function () {
                    $(self.els.myHomeRight).append(self.views.myHomeRightView.render().el);
                });
            },
            //可安排课程和已安排课程，现在取的是可安排课程数据，已安排课程没有取
            showDetailInfo: function (date) {
                this.removeDetailInfo();
                this.removeRightArrange();
                if (!this.views.detailInfoView) {
                    this.views.detailInfoView = new DetailInfoView({
                            eventBus: this.eventBus,
                            el: this.els.myDetailInfo
                        }
                    );
                }
                var self = this;
                //name-->>ID
                this.models.myArrangeCalendarCollection.fetch({
                    success: function (collection, resp) {
                        var name = date.title;
                        for (var i = 0; i < resp.length; i++) {
                            if (name == resp[i].name) {
                                $(self.els.myDetailInfo).append(self.views.detailInfoView.render(resp[i]).el);
                            }
                        }

                    }
                })


            },
            removeDetailInfo: function () {
                $(this.els.myDetailInfo).empty();
            },
            showRightArrange: function (date) {
                this.removeDetailInfo();
                this.removeRightArrange();
                if (!this.views.myArrangeCalendarView) {
                    this.views.myArrangeCalendarView = new RightArrangeCalendarView({
                        eventBus: this.eventBus,
                        el: this.els.myArrangeCalendar
                    });
                }
                var self = this;
                this.models.myArrangeCalendarCollection.fetch({
                    success: function (collection, resp) {
                        var result = [];
                        for (var i = 0; i < resp.length; i++) {
                            var t = {
                                _id: resp[i].id,
                                name: resp[i].name,
                                date: date
                            };
                            result.push(t);
                        }
                        $(self.els.myArrangeCalendar).append(self.views.myArrangeCalendarView.render(result).el);
                    }
                })
            },
            removeRightArrange: function () {
                $(this.els.myArrangeCalendar).empty();
            },
            showTodayInfo:function(){
                if (!this.views.myTodayInfoView) {
                    this.views.myTodayInfoView = new TodayInfoView({
                        eventBus: this.eventBus,
                        el: this.els.myTodayInfo,
                        collection: this.models.myTodayInfoCollection
                    });

                    var self = this;
                    this.models.myTodayInfoCollection.fetch().complete(function () {
                        $(self.els.myTodayInfo).append(self.views.myTodayInfoView.render().el);
                    });
                }
            },
            //?
            showPerfectInfo:function(date,jsEvent){

                this.views.myPerfectView = new PerfectInfoView({
                        eventBus: this.eventBus
                });

                var self = this;
                var da=[12,34,56];
                self.views.myPerfectView.render(da).el;
                self.views.myPerfectView.buildDialog(date,jsEvent);
                self.views.myPerfectView.buildTimePicker();
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
