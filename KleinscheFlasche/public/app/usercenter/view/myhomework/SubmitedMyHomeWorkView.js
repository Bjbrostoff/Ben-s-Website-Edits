define('app/usercenter/view/myhomework/SubmitedMyHomeworkView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/usercenter/template/myhomework/SubmitedMyHomeworkView.ejs'
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

            }
        });
        return v;
    });
