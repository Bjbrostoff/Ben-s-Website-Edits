/**
 * Created by cs on 2016/1/21.
 */
define('app/usercenter/model/myteachers/MyTeacherListItemModel',
    [
        'underscore',
        'backbone',
        'jquery'
    ],
    function(_, Backbone, $){
        var m = Backbone.Model.extend({
            defaults:{
                name : 'teacher',
                portrait:'/inspinia/img/a1.jpg',
                email:'@email',
                phone:'13088888888',
                state: {
                    type: 0,
                    name: "正在授课"
                },
                //课程
                course:{
                    score:60
                }
            }
        });
        return m;
    })
