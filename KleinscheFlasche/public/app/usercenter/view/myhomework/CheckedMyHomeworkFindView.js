/**
 * Created by Administrator on 2016/1/19.
 */
define('app/usercenter/view/myhomework/CheckedMyHomeworkFindView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/usercenter/template/myhomework/CheckedMyHomeworkFindView.ejs'
    ],
    function(_, Backbone, $, tmpl){
        var v = Backbone.View.extend({
            //el:'.sthomework-checkbox-field',
            events:{
                'click .myhomework-checkedfindbox-close':'closeCheckedFindBoxView_handler'
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
            closeCheckedFindBoxView_handler:function(){
                this.remove();
            },
            sthCheckedSubmit_handler:function(){

            }
        });
        return v;
    });
