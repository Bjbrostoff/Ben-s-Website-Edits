define('app/usercenter/view/BaseinfoView',
[
  'underscore',
  'backbone',
  'jquery',
  'text!/app/usercenter/template/BaseinfoView.ejs',
    'app/usercenter/view/userinfo/UserFormView',
    'app/usercenter/model/BaseinfoModel'


],
function(_, Backbone, $,tmpl,
         UserFormView,BaseinfoModel){
    var v = Backbone.View.extend({
        el: '.userinfo-container',
        events:{
            'click #baseinfo-save-btn':'baseinfo_saveHandler',
            'click #baseinfo-modifycode-btn':'baseinfo_editPwdHandler'
        },
        initialize:function(){
            this.template = _.template(tmpl);
            this.elems = {
                'userInfo':'#user-form'

            };
            this.views = {};

            this.models = {

            };

            this.models.baseinfoModel = new BaseinfoModel();
        },
        render:function(){
            //console.log(this.model.toJSON());
            $(this.el).html(_.template(tmpl));
            return this;
        },
        showuserInfo:function(){
            if (!this.views.myUserFormView) {
                this.views.myUserFormView = new UserFormView({
                    eventBus: this.eventBus,
                    el: this.elems.userInfo,
                    model: this.models.baseinfoModel
                });
            }

            //$(this.elems.userInfo).append(this.views.myUserFormView.render().el);
            var self = this;
            this.models.baseinfoModel.fetch().complete(function () {
                $(self.elems.userInfo).append(self.views.myUserFormView.render().el);

            });

        },
        baseinfo_saveHandler:function(evt){
            //var name = $(this.elems.nameField).val();
            //var email = $(this.elems.emailField).val();
            //var phone = $(this.elems.phoneField).val();
            //var age = $(this.elems.ageField).val();
            //var sex = $(this.elems.sexField).val();
            //var birth = $(this.elems.birthField).val();
            //var nationality = $(this.elems.nationalityField).val();
            //var city = $(this.elems.cityField).val();
            ////this.checkForm();
            //console.log(name);
            //console.log(email);
            //console.log(phone);
            //console.log(age);
            //console.log(sex);
            //console.log(birth);
            //console.log(nationality);
            //console.log(city);
            ////var b = this.validate();
            ////if (b){
            ////    $.ajax({
            ////
            ////    });
            ////}
        },

        checkForm:function(){
        },
        validate:function(){

        },
        hide:function(){
            $(this.el).css({
                'display':'none'
            });
        },
        show:function(){
            $(this.el).css({
                'display':'block'
            });
        }
    });
    return v;
});
