/**
 * Created by cs on 2016/1/1.
 */
define('app/usercenter/collection/myfavorites/MyFavoritesDataCollection',
    [
        'underscore',
        'backbone',
        'jquery',

        'app/usercenter/model/MyFavoritesModel'
    ],
    function(_, Backbone, $, Model){
        var c = Backbone.Collection.extend({
            model:Model,
            url:'/mod/user/queryFavorite',
            initialize: function () {
                this.on({ "add":this.addFunc,
                           "get":this.getFunc,
                           "where":this.whereFunc});
            },
            addFunc:function(){
              //  alert('add');
            },
            getFunc:function(){
                alert('get');
            },
            whereFunc:function(){
                alert('where');
            }
        });
        return c;
    })
