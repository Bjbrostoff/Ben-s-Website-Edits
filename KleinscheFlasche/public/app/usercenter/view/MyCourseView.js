define('app/usercenter/view/MyCourseView',
[
    'underscore',
    'backbone',
    'jquery',
    'text!/app/usercenter/template/MyCourseView.ejs',
	'app/usercenter/collection/mycourse/MyActiveCourseInClassCollection',
	'app/usercenter/view/mycourse/MyCourseInClassView',
	'app/usercenter/view/mycourse/MyCourseOverClassView',
	'app/usercenter/view/mycourse/MyCourseInSignView'

],
function(_, Backbone, $, tmpl,MyActiveCourseInClassCollection,MyCourseInClassView, MyCourseOverClassView
				,MyCourseInSignView){
    var v = Backbone.View.extend({
        el:'.mycourse-container',
	    events:{
		    "click #mycourseinclass":"myCourseInCalss_handler",
		    "click #mycourseinsign":"myCourseInSign_handler",
		    "click #mycourseoverclass":"myCourseOutCalss_handler"


	    },
        initialize:function(){
            this.views = {};
	        this.collection = {};
	        this.collection.MyActiveCourseInClassCollection = new MyActiveCourseInClassCollection({
		        url: '/users/getStuCourse?type=2'
	        });
			this.collection.MyInSignCourseCollection = new MyActiveCourseInClassCollection({
		        url: '/users/getStuCourse?type=1'
	        });

	        this.collection.MyEndCourseOverClassCollection = new MyActiveCourseInClassCollection({
		        url:'/users/myStuEndCourse?type=3'
	        });
	        console.log(this.collection);
	        this.elems = {
		        'mycourseinclass':'#mycourseinclass',
		        'mycourseinsign':'#mycourseinsign',
		        'mycourseoutclass':'#mycourseoverclass',
		        'my_course_act_tab':'#my_course_act_tab',
		        'my_course_signed_tab':"#my_course_signed_tab",
		        'my_course_end_tab':"#my_course_end_tab"
	        };
            this.template = _.template(tmpl);

        },
        render:function(){
            $(this.el).html(this.template({}));

			this.myCourseInCalss_handler();

            return this;
        },
        hide:function(){
            this._hide();
        },
        show:function(){
            this._show();
        },
        _hide:function(){
            $(this.el).css({
                'display':'none'
            })
        },
        _show:function(){
            $(this.el).css({
                'display':'block'
            });
        },
	    myCourseInCalss_handler:function(){

		    if (!this.views.myCourseInClass) {
			    this.views.myCourseInClass = new MyCourseInClassView({
				    collection:this.collection.MyActiveCourseInClassCollection,
				    el: this.elems.my_course_act_tab
			    });
		    }
		    var self = this;
		    this.collection.MyActiveCourseInClassCollection.fetch({
				    data:{

				    },
				    success:function(){
					    $(self.elems.my_course_act_tab).append(self.views.myCourseInClass.render().el);
				    }
		    });
	    },
	    myCourseInSign_handler:function(){
		    if(!this.views.myCourseInSign){

			    this.views.myCourseInSign = new MyCourseInSignView({
				    collection:this.collection.MyInSignCourseCollection,
				    el:this.elems.my_course_signed_tab
			    });
			    var self = this;

			    this.collection.MyInSignCourseCollection.fetch({
				    data:{
					    date:new Date()
				    } ,
				    success:function(){
					    console.log("数据加载成功");
					    $(self.elems.my_course_signed_tab).append(self.views.myCourseInSign.render().el);
				    },error:function(){
					    console.log(1111);
				    }

			    });
			    this.views.myCourseInSign.addActionListener();
		    }

	    },
	    myCourseOutCalss_handler:function(){


		    if(!this.views.myCourseOverClass){

			    this.views.myCourseOverClass = new MyCourseOverClassView({
				    collection:this.collection.MyEndCourseOverClassCollection,
				    el:this.elems.my_course_end_tab
			    });
			    var self = this;

			    this.collection.MyEndCourseOverClassCollection.fetch({
				   data:{
						date:new Date()
				   } ,
				    success:function(){

				        $(self.elems.my_course_end_tab).append(self.views.myCourseOverClass.render().el);
				    },error:function(){
					    console.log(1111);
				    }

			    });
			    this.views.myCourseOverClass.addActionListener();
		    }
	    }
    });
    return v;
})
