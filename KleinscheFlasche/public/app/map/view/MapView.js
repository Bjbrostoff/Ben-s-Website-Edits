define('app/map/view/MapView',
    [
        'underscore',
        'jquery',
        'backbone',
        'leaflet',

        'app/map/collection/MapMarkerCollection'
    ],
    function(_, $, Backbone, L,
             MapMarkerCollection){
        var v = Backbone.View.extend({
            initialize:function(options){
                this.options = {
                    mapDomId:'map',
                    locateZoomLevel:13,
                    locateRadius:2000,
                    locateColor:'#1020f0',
                    locateWeight:2,
                    locateFillColor:'#1020f0',
                    locateFillOpacity:0.2,
                    locateIconUrl:'/app/map/template/LocationDisplay@2x.png',
                    locateIconSize:[32,32],
                    defaultIconUrl:'/leaflet/dist/images/marker-icon-2x.png',
                    defaultIconSize:[20,32]
                };

                _.extend(this.options, options);

                this.map = null;

                this.collections = {};

                this.collections.markerSourceCollection = new MapMarkerCollection();

                this.collections.markerSourceCollection.on('add', this._addMarker, this);
                this.collections.markerSourceCollection.on('remove', this._removeMarker, this);

                this.markers = [];
                this.myMarker = null;
                this.myCircle = null;
                this.myIcon = L.icon({
                    iconUrl: this.options.locateIconUrl,
                    iconSize: this.options.locateIconSize
                });

                this.defaultMarkerIcon = L.icon({
                    iconUrl: this.options.defaultIconUrl,
                    iconSize: this.options.defaultIconSize
                });
            },
            render:function(){
                this.map = L.map(this.options.mapDomId).setView([30.25,120.25],13);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    {
                        attribution:'&copy; OpenStreetMap'
                    })
                    .addTo(this.map);


                return this;
            },
            addMarker:function(json){
                this.collections.markerSourceCollection.add(json);
            },
            setMarkers:function(json){
                this.collections.markerSourceCollection.set(json);
            },
            clearMarkers:function(){
                this.collections.markerSourceCollection.reset();

                for (var i=0; i<this.markers.length;i++){
                    var marker = this.markers[i];
                    this.map.removeLayer(marker);
                }

            },
            locateMe:function(){
                if (!navigator.geolocation){
                    alert('浏览器不支持定位');
                }

                var self = this;
                navigator.geolocation.getCurrentPosition(function(position){
                    var point = {
                        latitude:position.coords.latitude,
                        longitude:position.coords.longitude
                    }
                    self._locateUpdate(point);
                });
            },
            show:function(){
                $(this.el).css({
                    'display':'block'
                });
            },
            hide:function(){
                $(this.el).css({
                    'display':'none'
                });
            },
            _addMarker:function(json){
                var marker = L.marker([json.get('lttd'), json.get('lgtd')], {
                    icon:this.defaultMarkerIcon
                })
                    .addTo(this.map)
                    .bindPopup("<b>"+json.get('name')+"</b>");

                this.markers.push(marker);
            },
            _removeMarker:function(json){

            },
            _locateUpdate:function(position){
                var self = this;
                var lgtd = position.longitude;
                var lttd = position.latitude;
                self.map.setView([lttd, lgtd], 13);

                self.myMarker = L.marker([lttd, lgtd], {
                        icon:self.myIcon
                    })
                    .addTo(self.map);
                L.circle([lttd, lgtd], 10000, {
                        color:'yellow',
                        weight:3,
                        fillColor:'yellow',
                        fillOpacity:0.1
                    })
                    .addTo(self.map);
                L.circle([lttd, lgtd], 5000, {
                        color:'#00ff00',
                        weight:3,
                        fillColor:'#00ff00',
                        fillOpacity:0.1
                    })
                    .addTo(self.map);
                self.myCircle = L.circle([lttd, lgtd], self.options.locateRadius, {
                        color:self.options.locateColor,
                        weight:self.options.locateWeight,
                        fillColor:self.options.locateFillColor,
                        fillOpacity:self.options.locateFillOpacity
                    })
                    .addTo(self.map);

            }
        });

        return v;
    })