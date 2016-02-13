/**
 * Created by apple on 16/1/8.
 */
define('app/usercenter/view/mycourse/MyCourseOverClassView',
	[
		'underscore',
		'backbone',
		'jquery',
		'text!/app/usercenter/template/mycourse/MyCourseOverClass.ejs',
		'app/usercenter/view/mycourse/TeacherDetailView',
		'app/usercenter/view/mycourse/CourseDetailView'

	],
	function(_, Backbone, $, tmpl,TeacherDetailView,CourseDetailView){
		var v = Backbone.View.extend({
			el:this.el,
			events:{
				"click #mycourse_end_mark_course":"mycourse_end_mark_course_handler",
				"click #mycourse_end_mark_teacher":"mycourse_end_mark_teacher_handler"
			},
			initialize:function(option){
				console.log('结束课程');

				this.template = _.template(tmpl);
				this.elems = {

				};
				this.views = {};
				this.models = {};

			},
			render:function(){
				console.log(this.collection);
				console.log("xxxxxx");
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
			_CollectionChange:function(){

				this.render();
			},
			addActionListener:function(){
				this.collection.on('change', this._CollectionChange, this);
			},
			mycourse_end_mark_course_handler:function(evt){
				var ucrelid =  $(evt.currentTarget).attr("keyvalue");
				var mm = this.collection.get(ucrelid);
				var courseid = mm.attributes.courceid._id;
				console.log(courseid);
				var that = this;
				$.ajax({
					"url":"/users/getCourseInfo",
					type:"get",
					data:{"ucrelid":ucrelid,"courseid":courseid},
					success:function(data){
						that.showDetailCourseView(data);
					},error:function(data){
						alert("系统错误;")
					}
				})
			},
			showDetailCourseView:function(data){
				if(this.views.detailCourseView){
					this.views.detailCourseView.remove();
				}
				this.views.detailCourseView = new CourseDetailView({
					model:data
				})
				$(this.el).append(this.views.detailCourseView.render(data).el);
			},
			showDetailTeacherView:function(data){
				if(this.views.detailTeacherView){
					this.views.detailTeacherView.remove();
				}
				this.views.detailTeacherView = new TeacherDetailView({
					model:data
				});
				$(this.el).append(this.views.detailTeacherView.render(data).el);

			}
			,
			mycourse_end_mark_teacher_handler:function(evt){
				var ucrelid =  $(evt.currentTarget).attr("keyvalue");
				var mm = this.collection.get(ucrelid);
				var teacher = mm.attributes.teacherid;
				if(teacher == undefined){
					return;
				}
				var teacherid = mm.attributes.teacherid._id;
				var that = this;
				$.ajax({
					"url":"/users/getTeacherInfo",
					type:"get",
					data:{"ucrelid":ucrelid,"teacherid":teacherid},
					success:function(data){
						that.showDetailTeacherView(data);
					},error:function(data){
						alert("系统错误;")
					}
				})

			}


		});
		return v;
	});
