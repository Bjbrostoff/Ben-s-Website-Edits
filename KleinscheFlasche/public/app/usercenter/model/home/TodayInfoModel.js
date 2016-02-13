/**
 * Created by Administrator on 2016/1/15.
 */
define('app/usercenter/model/home/TodayInfoModel',
    [
        'underscore',
        'backbone',
        'jquery'
    ],
    function(_, Backbone, $){
        var m = Backbone.Model.extend({
            defaults:{
            }
        });
        return m;
    })