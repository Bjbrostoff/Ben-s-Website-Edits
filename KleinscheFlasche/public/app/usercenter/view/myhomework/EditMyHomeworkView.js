/**
 * Created by Administrator on 2016/1/12.
 */
define('app/usercenter/view/myhomework/EditMyHomeworkView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/usercenter/template/myhomework/EditMyHomeworkView.ejs'
    ],
    function(_, Backbone, $, tmpl){
        var v = Backbone.View.extend({
            //el:'.sthomework-checkbox-field',
            events:{
                'click .myhomework-editview-close':'closeEidtView_handler',
                'click #myhomework-editview-submit':'sthCheckedSubmit_handler'
            },
            initialize:function(options){
                if (options.hasOwnProperty('eventBus')){
                    this.eventBus = options.eventBus;
                }
                this.template = _.template(tmpl);
                this.views = {};
                this.elems = {};

            },
            render:function(){
                $(this.el).html(this.template({
                    //fields:this.model
                }));
                return this;

            },
            closeEidtView_handler:function(){
                this.remove();
            },
            sthCheckedSubmit_handler:function(){

            }
        });
        return v;
    });
