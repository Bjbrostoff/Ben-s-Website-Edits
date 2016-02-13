define('app/usercenter/view/myhomework/FindMyHomeworkBoxView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/usercenter/template/myhomework/FindMyHomeworkBoxView.ejs'
    ],
    function(_, Backbone, $, tmpl){
        var v = Backbone.View.extend({
            //el:'.sthomework-checkbox-field',
            events:{
                'click .myhomework-findbox-close':'closeFindBoxView_handler'
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
            closeFindBoxView_handler:function(){
                this.remove();
            },
            sthCheckedSubmit_handler:function(){

            }
        });
        return v;
    });
