define('app/searchc/SearchCoursesApp',
[
    'underscore',
    'backbone',
    'jquery',
    'app/searchc/controller/Router'
],
function(_, Backbone, $,  Router){
    function initialize(){
        var app = new Router();
        Backbone.history.start();
    };

    return {
        initialize:initialize
    };
})
