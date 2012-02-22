var map;
// Create a select feature control and add it to the map.
var select;
var popupDistanceRatio;
var externalGraphicRatio;
var geojsonFormat = new OpenLayers.Format.GeoJSON();

function init(){

    var style_map_PP = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            externalGraphic: "../img/evaluation_pointer.png",
            pointRadius: 50
            }),
        "select": new OpenLayers.Style({
            externalGraphic: "../img/evaluation_pointer_hover.png",
            pointRadius: 50
            })
    });

    var PP_layer = new OpenLayers.Layer.Vector("Idea competitions layer", {
        styleMap: style_map_IC,
        visibility: true
    });

    var style_map_IC = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            externalGraphic: "../img/evaluation_pointer.png",
            pointRadius: 50
            }),
        "select": new OpenLayers.Style({
            externalGraphic: "../img/evaluation_pointer_hover.png",
            pointRadius: 50
            })
    });

    var IC_layer = new OpenLayers.Layer.Vector("Idea competitions layer", {
        styleMap: style_map_IC,
        visibility: true
    });

    var style_map_QU = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            externalGraphic: "../img/questionair_pointer.png",
            pointRadius: 50
        }),
        "select": new OpenLayers.Style({
            externalGraphic: "../img/questionair_pointer_hover.png",
            pointRadius: 50
            })
    });

    var QU_layer = new OpenLayers.Layer.Vector("Questionnaires layer", {
            styleMap: style_map_QU,
            visibility: true
    });

    var questionnaires = geojsonFormat.read(projects_QU);
    QU_layer.addFeatures(questionnaires);

    var idea_competitions = geojsonFormat.read(projects_IC);;
    IC_layer.addFeatures(idea_competitions);

    var plan_projects = geojsonFormat.read(projects_PP);;
    IC_layer.addFeatures(plan_projects);

    //count the bounds for the map
    console.log(idea_competitions);
    var bounds;
    for(var i = 0; i < idea_competitions.length; i++) {
        if(bounds === undefined) {
            bounds = idea_competitions[i].geometry.getBounds();
        } else {
            bounds.extend(idea_competitions[i].geometry.getBounds());
        }
    }

    console.log(questionnaires);
    for(var j = 0; j < questionnaires.length; j++) {
        if(bounds === undefined) {
            bounds = questionnaires[j].geometry.getBounds();
        } else {
            bounds.extend(questionnaires[j].geometry.getBounds());
        }
    }
    console.log(plan_projects);
    for(var k = 0; k < plan_projects.length; k++) {
        if(bounds === undefined) {
            bounds = plan_projects[k].geometry.getBounds();
        } else {
            bounds.extend(plan_projects[k].geometry.getBounds());
        }
    }
    console.log(bounds);
    console.log(city_polygon);
    var city_ol_feature = geojsonFormat.read(city_polygon);
    console.log(city_ol_feature[0]);
    bounds.extend(city_ol_feature[0].geometry.getBounds());

    var mapOptions = {
        //maxExtent: new OpenLayers.Bounds(199949.504,6977073.508,259925.896,7037049.802), //bounds
        maxResolution: 50,
        projection: "EPSG:3067"
    };

    map = new OpenLayers.Map('map', mapOptions);
    var base_layer = new OpenLayers.Layer.ArcGIS93Rest(
        "Map",
        "https://pehmogis.tkk.fi/ArcGIS/rest/services/suomi_grey/MapServer/export",
        {layers: "show:0,12,50", TRANSPARENT: true},
        {isBaseLayer: true}
    );

    map.addLayers([base_layer, IC_layer, QU_layer, PP_layer]);

    map.setCenter( bounds.getCenterLonLat() , 0);
    map.zoomToScale(3937278600);
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

=======
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

>>>>>>> fafd0e0c67117ed57d4a19ea892e6f7579cc5830
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
