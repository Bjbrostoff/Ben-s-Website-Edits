/**
 * Created by xiaoguo on 16/1/8.
 */
define('app/searcht/model/TeacherDetailModel',
    [
        'underscore',
        'backbone',
        'jquery'
    ],
    function(_, Backbone, $){
        var m = Backbone.Model.extend({
            defaults:{

                uuid: "id000001",
                name: "",
                sex:"male",
                age:"25",
                nationality: "nationality",
                city: "杭州",
                portrait: "/inspinia/img/a1.jpg",
                starlevel:"一星级",
                degree:"学位",
                servexerti:[],
                optioninfo:{
                    mothertongue:{
                        value:'英语',
                        pub:'1'
                    },
                    language:{
                        value:'英语',
                        pub:'1'
                    },
                    skilledcourse:{
                        value:'日常英语',
                        pub:'1'
                    },
                    info:{
                        value:"来吧同学.来吧同学来吧同学来吧同学来吧同学",
                        pub:'1'
                    }
                }
            },
            url:'/'
        });
        return m;
    })

