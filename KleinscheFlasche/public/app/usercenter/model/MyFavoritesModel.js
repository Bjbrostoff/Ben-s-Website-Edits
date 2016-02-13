/**
 * Created by cs on 2016/1/1.
 */
define('app/usercenter/model/MyFavoritesModel',
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
