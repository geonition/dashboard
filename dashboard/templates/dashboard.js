var map;
// Create a select feature control and add it to the map.
var select;
var popupDistanceRatio;
var externalGraphicRatio;
var geojsonFormat = new OpenLayers.Format.GeoJSON();

function init(){

    var style_map = new OpenLayers.StyleMap({
        "default": {
            strokeWidth: 1,
            strokeColor: $('body').css('background-color'),
            cursor: 'pointer',
            fillColor: $('body').css('background-color'),
            fillOpacity: 0.4
            },
        "select": {
            strokeWidth: 1,
            strokeColor: $('body').css('background-color'),
            cursor: 'pointer',
            fillColor: $('body').css('background-color'),
            fillOpacity: 0.7
        }
    });

    var PP_layer = new OpenLayers.Layer.Vector("Plan proposals layer", {
        styleMap: style_map,
        visibility: true
    });

    var IC_layer = new OpenLayers.Layer.Vector("Idea competitions layer", {
        styleMap: style_map,
        visibility: true
    });

    var QU_layer = new OpenLayers.Layer.Vector("Questionnaires layer", {
        styleMap: style_map,
        visibility: true
    });

    var questionnaires = geojsonFormat.read(projects_QU);
    QU_layer.addFeatures(questionnaires);

    var idea_competitions = geojsonFormat.read(projects_IC);;
    IC_layer.addFeatures(idea_competitions);

    var plan_projects = geojsonFormat.read(projects_PP);;
    IC_layer.addFeatures(plan_projects);

    //count the bounds for the map
    var bounds;
    for(var i = 0; i < idea_competitions.length; i++) {
        if(bounds === undefined) {
            bounds = idea_competitions[i].geometry.getBounds();
        } else {
            bounds.extend(idea_competitions[i].geometry.getBounds());
        }
    }

    for(var j = 0; j < questionnaires.length; j++) {
        if(bounds === undefined) {
            bounds = questionnaires[j].geometry.getBounds();
        } else {
            bounds.extend(questionnaires[j].geometry.getBounds());
        }
    }

    for(var k = 0; k < plan_projects.length; k++) {
        if(bounds === undefined) {
            bounds = plan_projects[k].geometry.getBounds();
        } else {
            bounds.extend(plan_projects[k].geometry.getBounds());
        }
    }

    if(bounds === undefined) {
        var city_ol_feature = geojsonFormat.read(city_polygon);
        bounds = city_ol_feature[0].geometry.getBounds();
    }

    var mapOptions = {
        maxResolution: 50,
        projection: "EPSG:3067",
        maxExtent: new OpenLayers.Bounds(89949.504,
                                         6502687.508,
                                         502203.000,
                                         7137049.802),
        maxResolution: 50,
        numZoomLevels: 10,
        tileSize: new OpenLayers.Size(512, 512)
    };

    map = new OpenLayers.Map('map', mapOptions);
    var base_layer = new OpenLayers.Layer.ArcGIS93Rest(
        "Map",
        "https://pehmogis.tkk.fi/ArcGIS/rest/services/suomi_grey/MapServer/export",
        {layers: "show:0,10,12,50", //"show:0,7,43,79,115,150,151,187,222,258,294,330", //show:0,10,12,48,50",
        TRANSPARENT: true},
        {isBaseLayer: true}
    );

    //TODO: should be site specific
    base_layer.setLayerFilter(50, "Kunta_ni1 = 'Järvenpää'");

    map.addLayers([base_layer, IC_layer, QU_layer, PP_layer]);
    map.zoomToExtent( bounds );

    var select = new OpenLayers.Control.SelectFeature(
        [QU_layer, IC_layer, PP_layer],
        {
            id: 'selectcontrol',
            hover: true,
            onSelect: function(event) {
                //connect the select feature with the list
                var id = event.fid;
                $('#' + id).addClass('hover');
                },
            onUnselect: function(event) {
                //connect the select feature with the list
                var id = event.fid;
                $('#' + id).removeClass('hover');
                }
        });
    map.addControl(select);
    select.activate();

    //connect the list hover with the feature
    $('.project-row').hover(function(event) {
        for(layer in map.layers) {
            if(map.layers[layer].getFeatureByFid) {
                var feature = map.layers[layer].getFeatureByFid(this.id);
                if(feature) {
                    map.getControl('selectcontrol').select(feature);
                    }
                }
            }
        },
        function(event) {
            for(layer in map.layers) {
                if(map.layers[layer].getFeatureByFid) {
                    var feature = map.layers[layer].getFeatureByFid(this.id);
                    if(feature) {
                        map.getControl('selectcontrol').unselect(feature);
                    }
                }
            }
        });
}
