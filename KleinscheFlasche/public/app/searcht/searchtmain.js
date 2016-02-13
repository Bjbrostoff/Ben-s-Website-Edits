require.config({
    paths:{
        jquery:'/jquery/dist/jquery.min',
        underscore:'/underscore/underscore-min',
        backbone:'/backbone/backbone-min',
        text:'/text/text',
        d3:'/d3/d3.min',
        'leaflet':'/leaflet/dist/leaflet',
        app:'/app',
        'jquery.slimscroll':'/Inspinia/js/plugins/slimscroll/jquery.slimscroll.min'
    },
    shim:{
        'jquery.slimscroll':['jquery']
    }
});

require(
[
    'underscore',
    'backbone',
    'jquery',
    'app/searcht/SearchTeachersApp'
],function(_, Backbone, $, App){
    App.initialize();
})
