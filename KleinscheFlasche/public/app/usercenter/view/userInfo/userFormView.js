define('app/usercenter/view/userinfo/UserFormView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/usercenter/template/userInfo/UserFormView.ejs',
        'app/usercenter/view/userinfo/BaseModalView',
        'jquery.validate',
        'bootstrap-datepicker'

    ],
    function(_, Backbone, $, tmpl,BaseModalView){
        var v = Backbone.View.extend({
            events:{
                'click #baseinfo-modifycode-btn':'baseinfo_editPwdHandler'
            },
            initialize:function(option){
               // this.eventBus = option.eventBus;
                this.template = _.template(tmpl);
                this.elems = {
                    'modifyBtn':'#baseinfo-modifycode-btn',
                    'userForm':'#form'
                }
            },
            render:function(){
                $(this.el).html(this.template(this.model.toJSON()));
                $.extend($.validator.messages, {
                    required: "必选字段",
                    remote: "请修正该字段",
                    email: "请输入正确格式的电子邮件,如:XXX@163.com",
                    url: "请输入合法的网址",
                    date: "请输入合法的日期",
                    dateISO: "请输入合法的日期 (ISO).",
                    number: "请输入合法的数字",
                    digits: "只能输入整数",
                    creditcard: "请输入合法的信用卡号",
                    equalTo: "请再次输入相同的值",
                    accept: "请输入拥有合法后缀名的字符串",
                    maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),
                    minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
                    rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
                    range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
                    max: jQuery.validator.format("请输入一个最大为{0} 的值"),
                    min: jQuery.validator.format("请输入一个最小为{0} 的值")
                });
                var a = $(this.elems.userForm).validate({
                    rules: {
                        password: {
                            required: true,
                            minlength: 6
                        },
                        email:{
                            required: true,
                            email: true
                        },
                        min: {
                            required: true,
                            minlength: 6
                        },
                        max: {
                            required: true,
                            maxlength: 4
                        },
                        name:{
                            required:true,
                            minlength:1,
                            maxlength:20
                        },
                        phone:{
                            required:true,
                            number: true,
                            minlength:11,
                            maxlength:11
                        },
                        city:{
                            required:true,
                            minlength:1,
                            maxlength:20
                        },
                        nationality:{
                            required:true,
                            minlength:1,
                            maxlength:30
                        }
                    }
                });
                return a;

                this.datepicker_handler();

                return this;
            },
            baseinfo_editPwdHandler:function() {
                console.log('modal');

                var modal = new BaseModalView({
                    modalData: {
                        title: '提示'
                    }
                });
                modal.show({
                    show: true
                });
                modal.setValidate;


            },
            datepicker_handler:function(){

                $('#data_1').datepicker({
                    todayBtn: "linked",
                    keyboardNavigation: true,
                    forceParse: false,
                    calendarWeeks: true,
                    autoclose: true,
                    todayHighlight : true
                });
            },
            modifyBtn_clickHandler:function(){

            }
        });
        return v;
    });