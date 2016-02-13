/**
 * Created by apple on 16/1/8.
 */
define('app/usercenter/view/MyHomeworkView',
[
    'underscore',
    'backbone',
    'jquery',
    'text!/app/usercenter/template/MyHomeworkView.ejs',
    'app/usercenter/view/myhomework/ActingMyHomeworkView',
    'app/usercenter/view/myhomework/EditMyHomeworkView',
    'app/usercenter/view/myhomework/SubmitedMyHomeworkView',
    'app/usercenter/view/myhomework/FindMyHomeworkBoxView',
    'app/usercenter/view/myhomework/CheckedMyHomeworkView',
    'app/usercenter/view/myhomework/CheckedMyHomeworkFindView'
],
function(_, Backbone, $, tmpl, ActingMyHomeworkView, EditMyHomeworkView,
         SubmitedMyHomeworkView,FindMyHomeworkBoxView, CheckedMyHomeworkView,CheckedMyHomeworkFindView){
    var v = Backbone.View.extend({
        el:'.myhomework-container',
        events:{
            'click .mhw-edit-pencil-tab':'myhEdit_Handler',
            'click .mhw-find-view-tab':'myhFindBox_Handler',
            'click .mhw-checked-find-view-tab':'myhCheckedFindBox_Handler'
        },
        initialize:function(option){
            this.eventBus = option.eventBus || {};
            this.template = _.template(tmpl);
            this.elems = {
                'myhomeworkactingview':'#myhomework-homework-acting-tab',
                'myhomeworkpushedview':'#myhomework-homework-pushed-tab',
                'myhomeworkcheckedview':'#myhomework-homework-checked-tab'
            };
            this.views = {};
            this.models = {};
        },
        render:function(){
            $(this.el).html(this.template({}));
            return this;
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
        },
        showactingmhwview:function(){
            if (!this.views.actingMyHomeworkView) {
                this.views.actingMyHomeworkView = new ActingMyHomeworkView({
                    eventBus: this.eventBus,
                    el: this.elems.myhomeworkactingview
                    // model: this.models.baseinfoModel
                });
            }
            $(this.elems.myhomeworkactingview).append(this.views.actingMyHomeworkView.render().el);
        },
        showSubmitedMyhView:function(){
            if (!this.views.submitedMyHomeworkView) {
                this.views.submitedMyHomeworkView = new SubmitedMyHomeworkView({
                    eventBus: this.eventBus,
                    el: this.elems.myhomeworkpushedview
                    // model: this.models.baseinfoModel
                });
            }
            $(this.elems.myhomeworkpushedview).append(this.views.submitedMyHomeworkView.render().el);
        },
        showcheckedmyhomeworkview:function(){
            if (!this.views.checkedMyHomeworkView) {
                this.views.checkedMyHomeworkView = new CheckedMyHomeworkView({
                    eventBus: this.eventBus,
                    el: this.elems.myhomeworkcheckedview
                    // model: this.models.baseinfoModel
                });
            }
            $(this.elems.myhomeworkcheckedview).append(this.views.checkedMyHomeworkView.render().el);
        },
        myhEdit_Handler:function(){
            if (this.views.editMyHomeworkView) this.views.editMyHomeworkView.remove();
            if (!this.views.editMyHomeworkView) {
                this.views.editMyHomeworkView = new EditMyHomeworkView({
                    eventBus: this.eventBus
                    //model: this.models.baseinfoModel
                });
            }

            $(this.el).append(this.views.editMyHomeworkView.render().el);
            $('.summernote').summernote({
                lang: 'zh-CN', // default: 'en-US'
                height:1000,
                onImageUpload: function(files, editor, welEditable) {
                    sendFile(files[0],editor,welEditable);
                },
                toolbar: [
                    //['style', ['style']], // no style button
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['height', ['height']]
                    //['insert', ['picture', 'link']], // no insert buttons
                    //['table', ['table']], // no table button
                    //['help', ['help']] //no help button
                ]

            });
        },
        myhFindBox_Handler:function(){
            if (this.views.findBoxMyHomeworkView) this.views.findBoxMyHomeworkView.remove();
            if (!this.views.findBoxMyHomeworkView) {
                this.views.findBoxMyHomeworkView = new FindMyHomeworkBoxView({
                    eventBus: this.eventBus
                    //model: this.models.baseinfoModel
                });
            }

            $(this.el).append(this.views.findBoxMyHomeworkView.render().el);

        },
        myhCheckedFindBox_Handler:function(){
            if (this.views.checkedFindMyHomeworkView) this.views.checkedFindMyHomeworkView.remove();
            if (!this.views.checkedFindMyHomeworkView) {
                this.views.checkedFindMyHomeworkView = new CheckedMyHomeworkFindView({
                    eventBus: this.eventBus
                    //model: this.models.baseinfoModel
                });
            }

            $(this.el).append(this.views.checkedFindMyHomeworkView.render().el);
        }
    });
    return v;
});
