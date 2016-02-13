define('app/searchc/model/CourseModel',
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
