/**
 * Created by Administrator on 2016/1/10.
 */
define('app/usercenter/view/sthomework/CreateCheckBoxView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/usercenter/template/sthomework/CreateCheckBoxView.ejs'
    ],
    function(_, Backbone, $, tmpl){
        var v = Backbone.View.extend({
            //el:'.sthomework-checkbox-field',
            events:{
                'click .sth-check-box-close':'closeBoxView_handler',
                'click .sth-checked-submit':'sthCheckedSubmit_handler'
            },
            initialize:function(options){
                //if (options.hasOwnProperty('eventBus')){
                //    this.eventBus = options.eventBus;
                //}
                this.template = _.template(tmpl);
                this.views = {};

                this.elems = {

                }
            },
            render:function(){
                $(this.el).html(this.template({
                    //fields:this.model
                }));
                return this;
            },
            closeBoxView_handler:function(){
                this.remove();
            },
            sthCheckedSubmit_handler:function(){

            }
        });
        return v;
    });
