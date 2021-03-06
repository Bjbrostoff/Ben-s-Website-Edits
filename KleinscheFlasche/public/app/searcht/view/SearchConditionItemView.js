
/**
 * Created by xiaoguo on 16/1/1.
 */
define('app/searcht/view/SearchConditionItemView',
    [
        'underscore',
        'backbone',
        'jquery',
        'text!/app/searcht/template/SearchConditionItemView.ejs'
    ],
    function(_, Backbone, $, tmpl){
        var v = Backbone.View.extend({
            events:{
                'click li.search-t-condi-li':'searchTCondiLi_clickHandler'
            },
            initialize:function(options){
                // if (this.hasOwnProperty('eventBus')){
                //     this.eventBus = options.eventBus;
                // }
                this.template = _.template(tmpl);
                this.elems = {
                    'conditionLi':'.search-t-condi-li'
                };
            },
            render:function(){
                //console.log(this.model);
                $(this.el).html(this.template({
                    condition:this.model.toJSON()
                }));
                return this;
            },
            searchTCondiLi_clickHandler:function(evt){
                var condition = $(evt.currentTarget).attr('cate');
                console.log(condition);
                $(this.elems.conditionLi+'[cate='+condition+']').removeClass('on');
                $(evt.currentTarget).addClass('on');

                var m = this._collectConditionValues();

                this.trigger('condition-did-collect', {arr:m});
            },
            _collectConditionValues:function(){
                var all = $(this.elems.conditionLi+'.on');
                var m = [];
                for (var i = 0; i < all.length; i++){
                    var cate = $(all[i]).attr('cate');
                    var cvalue = $(all[i]).attr('cvalue');
                    m.push({
                        cate:cate,
                        cvalue:cvalue
                    })
                }

                return m;

            }
        });
        return v;
    })
