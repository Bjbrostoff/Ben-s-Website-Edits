/**
 * Created by Administrator on 2016/1/6.
 */
define('app/usercenter/model/home/DetailInfoModel',
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