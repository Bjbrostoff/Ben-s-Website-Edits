/**
 * Created by Administrator on 2016/1/2.
 */
define('app/usercenter/model/home/CalendarModel',
    [
        'underscore',
        'backbone',
        'jquery'
    ],
    function(_, Backbone, $){
        var m = Backbone.Model.extend({
            defaults:{}
        });

        return m;
    })