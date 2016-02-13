/**
 * Created by apple on 16/1/17.
 */
define('app/audit/collection/AuditCourseCollection',
[
    'underscore',
    'jquery',
    'backbone'
],
function(_, $, Backbone){
    var c = Backbone.Collection.extend({
        //获取审核课程集合
        getAuditCourses:function(type){
            var url = '/users/waitAuditCourses';
            switch(type){
                case 'wait':
                    url = '/users/waitAuditCourses';
                    break;
                case 'act':
                    url = '/users/actAuditCourses';
                    break;
                case 'done':
                    url = '/users/doneAuditCourses';
                    break;
            };
            var self = this;
            $.ajax({
                url:url,
                success:function(json){
                    self.set(json.data);
                    self.trigger('get-audit-courses',{
                        type:type,
                        state:'success',
                        msg:'获取数据成功'
                    })
                },
                error:function(){
                    self.trigger('get-audit-courses',{
                        type:type,
                        state:'fail',
                        msg:'获取数据失败'
                    })
                }
            })
        },
        //待审核转审核列表 审核员id标记进入待审核对象
        actingAuditCourse:function(codes){
            var self = this;
            console.log(codes);
            $.ajax({
                url:'/users/actingAuditCourse',
                type:'post',
                data:{data:JSON.stringify(codes)},
                success:function(json){
                    console.log(json);
                },
                error:function(json){
                    console.log(json);
                }
            })
        }

    });
    return c;
})
