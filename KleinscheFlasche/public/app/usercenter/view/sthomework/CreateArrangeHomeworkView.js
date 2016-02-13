/**
 * Created by Administrator on 2016/1/19.
 */
define('app/usercenter/view/sthomework/CreateArrangeHomeworkView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/usercenter/template/sthomework/CreateArrangeHomeworkView.ejs',
        'summernote'
    ],
    function(_, Backbone, $, tmpl){
        var v = Backbone.View.extend({
            events:{

            },
            initialize:function(options){
                //if (options.hasOwnProperty('eventBus')){
                //    this.eventBus = options.eventBus;
                //}
                this.template = _.template(tmpl);

                this.elems = {
                }
            },
            render:function(){
                $(this.el).html(this.template({
                    //fields:this.model
                }));
                return this;
            },
            save:function(){

            },
            cancel:function(){

            },
            closeView_handler:function(){
                this.remove();
            }
        });
        return v;
    });