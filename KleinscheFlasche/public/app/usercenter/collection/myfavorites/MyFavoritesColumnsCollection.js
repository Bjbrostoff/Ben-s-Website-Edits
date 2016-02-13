/**
 * Created by cs on 2016/1/1.
 */
define('app/usercenter/collection/myfavorites/MyFavoritesColumnsCollection',
    [
        'underscore',
        'backbone',
        'jquery',

        'app/usercenter/model/MyFavoritesModel'
    ],
    function(_, Backbone, $, Model){
        var c = Backbone.Collection.extend({
            model:Model,
            url:'/favorites/columns'
        })
        return c;
    })
