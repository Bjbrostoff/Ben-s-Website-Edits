/**
 * Created by Administrator on 2015/12/30.
 */
define('app/usercenter/model/userinfo/UserinfoModel',
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
    });
