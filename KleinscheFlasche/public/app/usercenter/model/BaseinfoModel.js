define('app/usercenter/model/BaseinfoModel',
[
    'underscore',
    'backbone',
    'jquery'
],
function(_, Backbone, $){
    var m = Backbone.Model.extend({
        url:'/users/basicinfo'
    });
    return m;
});
