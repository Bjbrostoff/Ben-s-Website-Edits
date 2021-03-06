/**
 * Created by xiaoguo on 16/1/9.
 */
define('app/searcht/view/ProfileDetailView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/searcht/template/ProfileDetailView.ejs',

        'app/searcht/model/TeacherDetailModel'
    ],
    function(_, Backbone, $, tmpl,
             TeacherDetailModel){
        var v = Backbone.View.extend({
            events:{

            },
            initialize:function(options){
                this.template = _.template(tmpl);

                this.model = new TeacherDetailModel();

                this.profileid = '';

            },
            setProfileId:function(profileid){
                this.profileid = profileid;
            },
            render:function(){
                //console.log(this.profileid);
                var self = this;
                $.ajax({
                    url:'/teachers/searchOneDetail',
                    data:{
                        type:1,
                        qo:{
                            '_id':self.profileid
                        }
                    },
                    type:'get',
                    success:function(json){
                        //console.log(json);
                        $(self.el).html(self.template({
                            teacher:json
                        }));
                        self.model.set(json);
                    }
                });
                return this;
            },

            show: function () {
                this._show();
            },
            hide: function () {
                this._hide();
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
            }
        });
        return v;
    })