/**
 * Created by Administrator on 2015/12/30.
 */
define('app/usercenter/view/home/InfoView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/usercenter/template/home/Info.ejs'
    ],
    function(_, Backbone, $, tmpl){
        var v = Backbone.View.extend({
            initialize:function(option){
                this.eventBus = option.eventBus;
                this.template = _.template(tmpl);
            },
            render:function(resp){
                $(this.el).html(this.template({
                    info:this.collection.toJSON()
                    //info:resp

                }));
                return this;
            },
            addListeners:function(){
                this.collection.on('add', this._addMsg, this);
            },
            _addMsg:function(){

                this.render();
            }
        });
        return v;
    })