/**
 * Created by apple on 16/1/8.
 */
define('app/usercenter/view/StHomeworkView',
[
    'underscore',
    'backbone',
    'jquery',
    'text!/app/usercenter/template/StHomeworkView.ejs',
    'app/usercenter/view/sthomework/CreateUncheckedView',
    'app/usercenter/view/sthomework/CreateCheckedView',
    'app/usercenter/view/sthomework/CreateCheckBoxView',
    'app/usercenter/view/sthomework/CreateArrangeHomeworkView',
    'summernote',
    'dropzone'
],
function(_, Backbone, $, tmpl, CreateUncheckedView, CreateCheckedView,CreateCheckBoxView, CreateArrangeHomeworkView){
    var v = Backbone.View.extend({
        el:'.sthomework-container',
        events:{
            'click .sth-check-pencil-tab':'sthCheckHandler'
        },
        initialize:function(){
            this.template = _.template(tmpl);
            this.elems = {
                'sthuncheckedview':'#sthomework-unchecked-acting-tab',
                'sthcheckedview':'#sthomework-checked-acting-tab',
                'stharrangehomeworkview':'#sthomework-arrange-acting-tab',
                'sthcheckbox':'#sthomework-checkbox-field',
                'sthomeworkcheckboxfield':'#sthomework-checkbox-field'
            };
            this.views = {};

            this.models = {

            };
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
        showuncheckedview:function(){
            if (!this.views.unCheckedView) {
                this.views.unCheckedView = new CreateUncheckedView({
                    eventBus: this.eventBus,
                    el: this.elems.sthuncheckedview
                   // model: this.models.baseinfoModel
                });
            }
            $(this.elems.sthuncheckedview).append(this.views.unCheckedView.render().el);

            ////$(this.elems.userInfo).append(this.views.myUserFormView.render().el);
            //var self = this;
            //this.models.baseinfoModel.fetch().complete(function () {
            //
            //
            //});
        },
        showcheckedview:function(){
            if (!this.views.CheckedView) {
                this.views.CheckedView = new CreateCheckedView({
                    eventBus: this.eventBus,
                    el: this.elems.sthcheckedview
                    // model: this.models.baseinfoModel
                });
            }
            $(this.elems.sthcheckedview).append(this.views.CheckedView.render().el);

            ////$(this.elems.userInfo).append(this.views.myUserFormView.render().el);
            //var self = this;
            //this.models.baseinfoModel.fetch().complete(function () {
            //
            //
            //});
        },
        showArrangeHomeworkView:function(){
            if (!this.views.ArrangeHomeworkView) {
                this.views.ArrangeHomeworkView = new CreateArrangeHomeworkView({
                    eventBus: this.eventBus,
                    el: this.elems.stharrangehomeworkview
                    // model: this.models.baseinfoModel
                });
            }
            $(this.elems.stharrangehomeworkview).append(this.views.ArrangeHomeworkView.render().el);
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
            $(document).ready(function(){

                Dropzone.options.myAwesomeDropzone = {

                    autoProcessQueue: false,
                    uploadMultiple: true,
                    parallelUploads: 100,
                    maxFiles: 100,

                    // Dropzone settings
                    init: function() {
                        var myDropzone = this;

                        this.element.querySelector("button[type=submit]").addEventListener("click", function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            myDropzone.processQueue();
                        });
                        this.on("sendingmultiple", function() {
                        });
                        this.on("successmultiple", function(files, response) {
                        });
                        this.on("errormultiple", function(files, response) {
                        });
                    }

                }

            });
        },
        sthCheckHandler:function(){
            //    this.views.createCheckBoxView = new CreateCheckBoxView();
            //$(this.elems.sthomeworkcheckboxfield).append(this.views.createCheckBoxView.render().el);

            if (this.views.createCheckBoxView) this.views.createCheckBoxView.remove();
            if (!this.views.createCheckBoxView) {
                this.views.createCheckBoxView = new CreateCheckBoxView({
                    eventBus: this.eventBus
                    //model: this.models.baseinfoModel
                });
            }

            $(this.el).append(this.views.createCheckBoxView.render().el);
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
        }
    });
    return v;
})
