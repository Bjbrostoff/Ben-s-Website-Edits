/**
 * Created by Administrator on 2015/12/30.
 */
define('app/usercenter/collection/home/InfoCollection',
    [
        'underscore',
        'backbone',
        'jquery',

        'app/usercenter/model/home/InfoModel'
    ],
    function(_, Backbone, $, Model){
        var c = Backbone.Collection.extend({
            model:Model,
            url:'/users/info'
        })
        return c;
    })
