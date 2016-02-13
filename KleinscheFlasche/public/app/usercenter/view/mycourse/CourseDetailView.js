/**
 * Created by apple on 16/1/8.
 */
define('app/usercenter/view/mycourse/CourseDetailView',
	[
		'underscore',
		'backbone',
		'jquery',
		'text!/app/usercenter/template/mycourse/CourseDetailView.ejs'
	],
	function(_, Backbone, $, tmpl
	         ){
		var v = Backbone.View.extend({
			events:{
				'click .teacher-detail-close':'closeView_handler',
				'click #profile-button':'openProfileView_handler'
			},
			initialize:function(options){

				this.template = _.template(tmpl);

				this.els = {

				};
				this.model = {};

			},
			render:function(json){
				$(this.el).html(this.template({
					course:json
				}));

				return this;
			},

			closeView_handler:function(){
				//console.log('11');
				this.remove();
			},
			addSlimScroll:function(){
				$('.full-height-scroll').slimscroll({
					height: '100%'
				});
			},
			openProfileView_handler:function(){
				//console.log(this.model.attributes);
				this.trigger('open-profile-view', {userid:this.model.attributes.uuid});
			}
		});
		return v;
	})
