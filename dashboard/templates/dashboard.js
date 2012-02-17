var map;
var layer;
// Create a select feature control and add it to the map.
var select;

var vectorLayerOrange1;
var vectorLayerBlue;
var mapScale;
var defaultMapScale = 3937278600;
var popupDistanceRatio;
var externalGraphicRatio;
var geojsonFormat = new OpenLayers.Format.GeoJSON();

function init(){


    var mapOptions = {
        //Vaasa
        maxExtent: new OpenLayers.Bounds(199949.504,6977073.508,259925.896,7037049.802),
        //Jarvenpaa
        //maxExtent: new OpenLayers.Bounds(363251.26491573383,6696188.33735,416499.0660842652,6718179.50765),
        maxResolution: 50,
        projection: "EPSG:3067"
    };

        map = new OpenLayers.Map('map', mapOptions);
        layer = new OpenLayers.Layer.ArcGIS93Rest(
        "ArcGIS Server Layer",
                "https://pehmogis.tkk.fi/ArcGIS/rest/services/suomi_grey/MapServer/export",
        {layers: "show:0,12,50", TRANSPARENT: true},
                {isBaseLayer: true}
    );

    layer.setLayerFilter(50, "Kunta_ni1 = 'Vaasa'");
        map.addLayer(layer);

    var vectorStyleMapOrange = new OpenLayers.StyleMap({
                            "default": new OpenLayers.Style({
                                externalGraphic: "{{STATIC_URL}}images/evaluation_pointer.png",
                pointRadius: 50
                            }),
                            "select": new OpenLayers.Style({
                                externalGraphic: "{{STATIC_URL}}images/evaluation_pointer_hover.png",
                pointRadius: 50

                            })
                       });
    vectorLayerOrange1 = new OpenLayers.Layer.Vector("Orange Features Layer", {
            styleMap: vectorStyleMapOrange,
            displayInLayerSwitcher: true,
            visibility: true
    });
    var vectorStyleMapBlue = new OpenLayers.StyleMap({
                            "default": new OpenLayers.Style({
                                externalGraphic: "{{STATIC_URL}}images/questionair_pointer.png",
                pointRadius: 50
                            }),
                            "select": new OpenLayers.Style({
                                externalGraphic: "{{STATIC_URL}}images/questionair_pointer_hover.png",
                pointRadius: 50
                            })
    });

    vectorLayerBlue = new OpenLayers.Layer.Vector("Blue Features Layer", {
            styleMap: vectorStyleMapOrange,
            displayInLayerSwitcher: true,
            visibility: true
    });

    // Create vector layer, style it, and populate it with GeoJSON features
    vectorLayerBlue.addFeatures(geojsonFormat.read(projects_QU));
    map.addLayer(vectorLayerBlue);
    vectorLayerOrange1.addFeatures(geojsonFormat.read(projects_IC));
    map.addLayer(vectorLayerOrange1);



        map.addControl( new OpenLayers.Control.MousePosition() );
    //Vaasa
    map.setCenter(new OpenLayers.LonLat(228121,7007438), 0);
        //map.setCenter(new OpenLayers.LonLat(389875.16549999954, 6707183.922499999), 0); jarvenpaa

    layer.events.register( "moveend", layer, zoomEvent);
    map.zoomToScale(defaultMapScale);
    }


function onFeatureSelect(feature){
    $("svg g g image").click(function() {window.location.assign(feature.attributes.url)});
    popupLon = feature.geometry.getBounds().getCenterLonLat().lon - 2000*(popupDistanceRatio);
    popupLat = feature.geometry.getBounds().getCenterLonLat().lat + 1500*(popupDistanceRatio);
        popup = new OpenLayers.Popup ("popup",
                                      new OpenLayers.LonLat(popupLon, popupLat),
                                      new OpenLayers.Size(300,50), null, null, false, null);

    var content = "<div style=color:white;>"+ feature.attributes.title + "</div>";
    popup.setContentHTML(content);
        popup.setOpacity(0.8);
    popup.setBackgroundColor("black");
    popup.panMapIfOutOfView = true;
    feature.popup = popup;
    map.addPopup(popup);

}

function onFeatureUnSelect(feature){
    $("svg g g image").off("click");
    if (feature.popup != null) {
    map.removePopup(feature.popup);
    feature.popup.destroy();
    feature.popup = null;
    }

}

			$(function() {
			    var layer_style = {}
			$(".1")
				.mouseover(function() {
					var fid = $(this).attr("class");
					var feature = vectorLayerBlue.getFeatureByFid(fid);
					layer_style.externalGraphic = "{{STATIC_URL}}images/questionair_pointer_hover.png";
					layer_style.pointRadius = 55*(externalGraphicRatio);
					feature.style = layer_style;
					vectorLayerBlue.redraw();
					
				})
				.mouseout(function() {
					var fid = $(this).attr("class");
					var feature = vectorLayerBlue.getFeatureByFid(fid);
					feature.style = null;
					vectorLayerBlue.redraw();
				});
			$(".2")
				.mouseover(function() { 
					var fid = $(this).attr("class");
					var feature = vectorLayerOrange1.getFeatureByFid(fid);
					layer_style.externalGraphic = "{{STATIC_URL}}images/evaluation_pointer_hover.png";
					layer_style.pointRadius = 55*(externalGraphicRatio);
					feature.style = layer_style;
					vectorLayerOrange1.redraw();;
				})
				.mouseout(function() {
					var fid = $(this).attr("class");
					var feature = vectorLayerOrange1.getFeatureByFid(fid);
					feature.style = null;
					vectorLayerOrange1.redraw();
				});	
		});
			
            $(function() {
                var layer_style = {}
            $(".1")
                .mouseover(function() {
                        var fid = $(this).attr("class");
                    var feature = vectorLayerBlue.getFeatureByFid(fid);
                    layer_style.externalGraphic = "{{STATIC_URL}}images/questionair_pointer_hover.png";
                    layer_style.pointRadius = 55*(externalGraphicRatio);
                    feature.style = layer_style;
                    vectorLayerBlue.redraw();

                })
                .mouseout(function() {
                        var fid = $(this).attr("class");
                    var feature = vectorLayerBlue.getFeatureByFid(fid);
                    feature.style = null;
                    vectorLayerBlue.redraw();
                });
            $(".2")
                .mouseover(function() {
                        var fid = $(this).attr("class");
                    var feature = vectorLayerOrange1.getFeatureByFid(fid);
                    layer_style.externalGraphic = "{{STATIC_URL}}images/evaluation_pointer_hover.png";
                    layer_style.pointRadius = 55*(externalGraphicRatio);
                    feature.style = layer_style;
                    vectorLayerOrange1.redraw();;
                })
                .mouseout(function() {
                        var fid = $(this).attr("class");
                    var feature = vectorLayerOrange1.getFeatureByFid(fid);
                    feature.style = null;
                    vectorLayerOrange1.redraw();
                });
        });

 function zoomEvent(evt)
 {
   if(evt.zoomChanged)
    {
	    mapScale = map.getScale()
	    
	    if(mapScale < 7874557200) {
		popupDistanceRatio = mapScale/defaultMapScale
	    }
	    else {
		popupDistanceRatio = 0.8*mapScale/defaultMapScale
	    }
	    
	    if (mapScale > 7874557200) {
		externalGraphicRatio = 0.4;
	    }
	    else if (mapScale > 1968639300 && mapScale <= 7874557200) {
		externalGraphicRatio = defaultMapScale/mapScale;
	    }
	    else {
		externalGraphicRatio = 1;
	    }
	    var vectorStyleMapOrange = getVectorStyleMap("{{STATIC_URL}}images/evaluation_pointer.png", "{{STATIC_URL}}images/evaluation_pointer_hover.png");
	    var vectorStyleMapBlue = getVectorStyleMap("{{STATIC_URL}}images/questionair_pointer.png", "{{STATIC_URL}}images/questionair_pointer_hover.png");
	    var featureOrange = vectorLayerOrange1.getFeatureByFid(2);
	    var featureBlue = vectorLayerBlue.getFeatureByFid(1);
	    onFeatureUnSelect(featureOrange);
	    onFeatureUnSelect(featureBlue);
	    vectorLayerOrange1.destroy();
	    vectorLayerBlue.destroy();
	    vectorLayerOrange1 = getVectorLayer(vectorStyleMapOrange, pointersOrange);
	    vectorLayerBlue = getVectorLayer(vectorStyleMapBlue, pointersBlue);
	    
	    map.addLayer(vectorLayerOrange1);
	    map.addLayer(vectorLayerBlue);
	    
	    // Create a select feature control and add it to the map.
	    select = new OpenLayers.Control.SelectFeature([vectorLayerBlue,vectorLayerOrange1], {hover: true, onSelect: onFeatureSelect, onUnselect: onFeatureUnSelect});
	    map.addControl(select);
	    select.activate();
    }
 }
 
 function getVectorStyleMap(defauldGraphURL, selectGraphURL) {
	    var vectorStyleMap = new OpenLayers.StyleMap({
			    "default": new OpenLayers.Style({
				externalGraphic: defauldGraphURL,
				pointRadius: 55*(externalGraphicRatio)
			    }),
			    "select": new OpenLayers.Style({
				externalGraphic: selectGraphURL,
				pointRadius: 55*(externalGraphicRatio)
			    })
		       });
	    return vectorStyleMap;
 }
 
 function getVectorLayer(vectorStyleMap, layerCode) {
	
	mapScale = map.getScale()

                if(mapScale < 7874557200) {
                    popupDistanceRatio = mapScale/defaultMapScale
                }
                else {
                    popupDistanceRatio = 0.8*mapScale/defaultMapScale
                }

                if (mapScale > 7874557200) {
                    externalGraphicRatio = 0.4;
                }
                else if (mapScale > 1968639300 && mapScale <= 7874557200) {
                    externalGraphicRatio = defaultMapScale/mapScale;
                }
                else {
                    externalGraphicRatio = 1;
                }
                var vectorStyleMapOrange = getVectorStyleMap("{{STATIC_URL}}images/evaluation_pointer.png", "{{STATIC_URL}}images/evaluation_pointer_hover.png");
                var vectorStyleMapBlue = getVectorStyleMap("{{STATIC_URL}}images/questionair_pointer.png", "{{STATIC_URL}}images/questionair_pointer_hover.png");
                var featureOrange = vectorLayerOrange1.getFeatureByFid(2);
                var featureBlue = vectorLayerBlue.getFeatureByFid(1);
                onFeatureUnSelect(featureOrange);
                onFeatureUnSelect(featureBlue);
                vectorLayerOrange1.destroy();
                vectorLayerBlue.destroy();
                vectorLayerOrange1 = getVectorLayer(vectorStyleMapOrange, projects_IC);
                vectorLayerBlue = getVectorLayer(vectorStyleMapBlue, projects_QU);

                map.addLayer(vectorLayerOrange1);
                map.addLayer(vectorLayerBlue);

                // Create a select feature control and add it to the map.
                select = new OpenLayers.Control.SelectFeature([vectorLayerBlue,vectorLayerOrange1], {hover: true, onSelect: onFeatureSelect, onUnselect: onFeatureUnSelect});
                map.addControl(select);
                select.activate();
    }



