define('app/usercenter/model/coursemanage/CourseModel',
[
    'underscore',
    'backbone',
    'jquery'
],
function(_, Backbone, $){
    var m = Backbone.Model.extend({
        defaults:{

        },
        verifyAndSave:function(crs){
            var self = this;
            $.ajax({
                url:'/users/createNewCourse',
                type:'post',
                data:{data:JSON.stringify(crs)},
                success:function(json){
                    self.trigger('manage-course-save-complete', {
                        data:crs,
                        msg:json,
                        state:'success'
                    })
                },
                error:function(err){
                    self.trigger('manage-course-save-complete', {
                        data:crs,
                        msg:err,
                        state:'fail'
                    })
                }
            })
        },
        commitCourse:function(crsid){
            var self = this;
            $.ajax({
                url:'/users/commitCourse',
                data:{
                    courseid:crsid
                },
                type:'post',
                success:function(json){
                    self.trigger('manage-course--commit-complete', {
                        data:json.data,
                        msg:json.msg,
                        state:json.state
                    })
                },
                error:function(err){
                    self.trigger('manage-course-commit-complete', {
                        data:crsid,
                        msg:"网络请求失败",
                        state:'fail'
                    })
                }
            });
        }
    });
    return m;
})
