/**
 * Created by Administrator on 2016/1/11.
 */
define('app/usercenter/view/myhomework/ActingMyHomeworkView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/usercenter/template/myhomework/ActingMyHomeworkView.ejs'

    ],
    function(_, Backbone, $, tmpl ){
        var v = Backbone.View.extend({
            events:{

            },
            initialize:function(options){
                //if (options.hasOwnProperty('eventBus')){
                //    this.eventBus = options.eventBus;
                //}
                this.template = _.template(tmpl);
                this.views = {};
                this.elems = {
                   // 'sthomeworkcheckboxfield':'sthomework-checkbox-field'
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
