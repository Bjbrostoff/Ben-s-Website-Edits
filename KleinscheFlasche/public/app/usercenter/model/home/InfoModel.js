/**
 * Created by Administrator on 2015/12/30.
 */
define('app/usercenter/model/home/InfoModel',
    [
        'underscore',
        'backbone',
        'jquery'
    ],
    function(_, Backbone, $){
        var m = Backbone.Model.extend({
            defaults:{
                imgUrl:'/images/test/touxiang.jpg'
            }
        });
        return m;
    })
