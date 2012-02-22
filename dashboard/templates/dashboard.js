var map;
var layer;
// Create a select feature control and add it to the map.
var select;

var mapScale;
var defaultMapScale = 3937278600;
var popupDistanceRatio;
var externalGraphicRatio;
var geojsonFormat = new OpenLayers.Format.GeoJSON();

function init(){

    var mapOptions = {      
        maxResolution: 50
    };
    map = new OpenLayers.Map('map', mapOptions);
    osm_layer = new OpenLayers.Layer.OSM("OSM",
                                     "http://tile.openstreetmap.org/${z}/${x}/${y}.png",
                                     {isBaseLayer : true
                                     });
                        
    var layer_style_IC = new OpenLayers.StyleMap({
                            "default": new OpenLayers.Style({
                                externalGraphic: "../images/evaluation_pointer.png",
                                pointRadius: 50
                            }),
                            "select": new OpenLayers.Style({
                                externalGraphic: "../images/evaluation_pointer_hover.png",
                                pointRadius: 50
                            })
                       });
    var layer_IC = new OpenLayers.Layer.Vector("Idea competitions", {
            styleMap: layer_style_IC,
            displayInLayerSwitcher: true,
            visibility: true
    });
    var layer_style_QU = new OpenLayers.StyleMap({
                            "default": new OpenLayers.Style({
                                externalGraphic: "../images/questionair_pointer.png",
                                pointRadius: 50
                            }),
                            "select": new OpenLayers.Style({
                                externalGraphic: "../images/questionair_pointer_hover.png",
                                pointRadius: 50
                            })
    });

    var layer_QU = new OpenLayers.Layer.Vector("Questionnaires", {
            styleMap: layer_style_QU,
            displayInLayerSwitcher: true,
            visibility: true
    });

    // Create vector layer, style it, and populate it with GeoJSON features
    layer_QU.addFeatures(geojsonFormat.read(projects_QU));
    layer_IC.addFeatures(geojsonFormat.read(projects_IC));
    
    map.addLayers([osm_layer, layer_QU, layer_IC]);

    //map.addControl( new OpenLayers.Control.MousePosition() );

    //osm_layer.events.register( "moveend", osm_layer, zoomEvent);
    map.setCenter(new OpenLayers.LonLat(2390950.5915014,
                                        9127498.3290794), 12);
    }


/*
function onFeatureSelect(feature){
    $("svg g g image").click(function() {window.location.assign(feature.attributes.url)});
    popupLon = feature.geometry.getBounds().getCenterLonLat().lon - 2000*(popupDistanceRatio);
    popupLat = feature.geometry.getBounds().getCenterLonLat().lat + 1500*(popupDistanceRatio);
<<<<<<< HEAD

    popup = new OpenLayers.Popup ("popup",
                                  new OpenLayers.LonLat(popupLon, popupLat),
                                  new OpenLayers.Size(300,50), null, null, false, null);
=======
        popup = new OpenLayers.Popup ("popup",
                                      new OpenLayers.LonLat(popupLon, popupLat),
                                      new OpenLayers.Size(300,50), null, null, false, null);
>>>>>>> 6056b94520fc2b5bc5cbf2ed4f42c07ea8da99f4

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

<<<<<<< HEAD
$(function() {
    var layer_style = {}
    $(".1").mouseover(function() {
=======
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
>>>>>>> 6056b94520fc2b5bc5cbf2ed4f42c07ea8da99f4
                        var fid = $(this).attr("class");
                        var feature = layer_QU.getFeatureByFid(fid);
                        layer_style.externalGraphic = "../images/questionair_pointer_hover.png";
                        layer_style.pointRadius = 55*(externalGraphicRatio);
                        feature.style = layer_style;
                        layer_QU.redraw();

                })
                .mouseout(function() {
                    var fid = $(this).attr("class");
                    var feature = layer_QU.getFeatureByFid(fid);
                    feature.style = null;
                    layer_QU.redraw();
                });
            $(".2")
                .mouseover(function() {
                    var fid = $(this).attr("class");
                    var feature = layer_IC.getFeatureByFid(fid);
                    layer_style.externalGraphic = "../images/evaluation_pointer_hover.png";
                    layer_style.pointRadius = 55*(externalGraphicRatio);
                    feature.style = layer_style;
                    layer_IC.redraw();;
                })
                .mouseout(function() {
                    var fid = $(this).attr("class");
                    var feature = layer_IC.getFeatureByFid(fid);
                    feature.style = null;
                    layer_IC.redraw();
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
                var featureOrange = layer_IC.getFeatureByFid(2);
                var featureBlue = layer_IC.getFeatureByFid(1);
                onFeatureUnSelect(featureOrange);
                onFeatureUnSelect(featureBlue);
                layer_IC.destroy();
                layer_QU.destroy();
                layer_IC = getVectorLayer(vectorStyleMapOrange, projects_IC);
                layer_QU = getVectorLayer(vectorStyleMapBlue, projects_QU);

                map.addLayers([layer_IC, layer_QU]);
                
                // Create a select feature control and add it to the map.
                select = new OpenLayers.Control.SelectFeature([layer_QU,layer_IC], {hover: true, onSelect: onFeatureSelect, onUnselect: onFeatureUnSelect});
                map.addControl(select);
                select.activate();
    }


<<<<<<< HEAD
 function getVectorLayer(vectorStyleMap, layerCode) {
    var vectorLayer = new OpenLayers.Layer.Vector("Vector Layer", {
            styleMap: vectorStyleMap,
            displayInLayerSwitcher: true,
            visibility: true
    });
    vectorLayer.addFeatures(geojsonFormat.read(layerCode));
    return vectorLayer;
 }
 
 */
=======

>>>>>>> 6056b94520fc2b5bc5cbf2ed4f42c07ea8da99f4
