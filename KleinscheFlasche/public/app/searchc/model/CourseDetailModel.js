/**
 * Created by xiaoguo on 16/1/8.
 */
define('app/searchc/model/CourseDetailModel',
    [
        'underscore',
        'backbone',
        'jquery'
    ],
    function(_, Backbone, $){
        var m = Backbone.Model.extend({
            defaults:{


            },
            url:'/'
        });
        return m;
    })

