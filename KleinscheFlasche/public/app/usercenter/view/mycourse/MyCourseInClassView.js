/**
 * Created by apple on 16/1/8.
 */
define('app/usercenter/view/mycourse/MyCourseInClassView',
	[
		'underscore',
		'backbone',
		'jquery',
		'text!/app/usercenter/template/mycourse/MyCourseInClass.ejs'

	],
	function(_, Backbone, $, tmpl){
		var v = Backbone.View.extend({
			el:this.el,
			events:{

			},
			initialize:function(option){
				console.log(11);

				this.template = _.template(tmpl);
				this.elems = {

				};
				this.views = {};
				this.models = {};

				this.collection.on('change', this._modelChange, this);
			},
			render:function(){
				$(this.el).html(this.template({datas:this.collection.toJSON()}));
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
			_modelChange:function(){
				this.render();
			}

		});
		return v;
	});
