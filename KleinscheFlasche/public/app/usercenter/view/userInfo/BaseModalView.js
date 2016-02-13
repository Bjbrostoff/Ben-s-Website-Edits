define('app/usercenter/view/userinfo/BaseModalView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/usercenter/template/userInfo/BaseModalView.ejs',
        'jquery.validate'

    ],
    function (_, Backbone, $, tmpl) {
        var v = Backbone.View.extend({
            id: '#modify-msg-modal',
            className: 'modal fade',
            events: {},
            initialize: function (option) {
                this.eventBus = option.eventBus;
                this.template = _.template(tmpl);
                this.options = {
                    modalData: {
                        title: 'Title'
                    }
                };
                this.elems = {
                   'modalconfirm':'#baseinfo-modal-confirmform'
                };
                _.extend(this.options, option);
                this.render();
            },
            render: function () {
                this.$el.html(this.template(this.options.modalData));
                this.$el.modal({show: false});



                //$.extend($.validator.messages,{
                //        password: {
                //            required: "请输入密码",
                //            minlength: jQuery.validator.format("密码不能小于{0}个字 符")
                //        },
                //        confirm_password: {
                //            required: "请输入确认密码",
                //            minlength: "确认密码不能小于5个字符",
                //            equalTo: "两次输入密码不一致不一致"
                //        }
                //});
                //$(this.elems.modalconfirm).validate({
                //    debug: true,
                //    rules: {
                //        password: {
                //            required: true,
                //            minlength: 5
                //        },
                //        confirm_password: {
                //            required: true,
                //            minlength: 5,
                //            equalTo: "#password"
                //        }
                //    }
                //});
                //$().ready(function() {
                //    $("#baseinfo-modal-confirmform").validate({
                //        debug:true,
                //        rules: {
                //            password: {
                //                required: true,
                //                minlength: 5
                //            },
                //            confirm_password: {
                //                required: true,
                //                minlength: 5,
                //                equalTo: "#password"
                //            }
                //        },
                //        messages: {
                //            password: {
                //                required: "请输入密码",
                //                minlength: jQuery.validator.format("密码不能小于{0}个字 符")
                //            },
                //            confirm_password: {
                //                required: "请输入确认密码",
                //                minlength: "确认密码不能小于5个字符",
                //                equalTo: "两次输入密码不一致不一致"
                //            }
                //        }
                //    });
                //});
                return this;
            },
            show: function () {
                this.$el.modal('show');
            },
            teardown: function () {
                this.$el.data('modal', null);
                this.remove();
            },
            setValidate:function(){
                $.extend($.validator.messages, {
                    password: {
                        required: "请输入密码",
                        minlength: jQuery.validator.format("密码不能小于{0}个字 符")
                    },
                    confirm_password: {
                        required: "请输入确认密码",
                        minlength: "确认密码不能小于5个字符",
                        equalTo: "两次输入密码不一致不一致"
                    },
                });
                $('#confirmform').validate({
                    rules: {
                        password: {
                            required: true,
                            minlength: 5
                        },
                        confirm_password: {
                            required: true,
                            minlength: 5,
                            equalTo: "#password"
                        }
                    }
                });

            }
        });
        return v;
    });
