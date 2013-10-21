/*global $, OpenLayers, gnt, projects_IC, projects_QU, projects_PP, map, city_polygon */

/*
 Dashboard UI namespace

 gnt.dashboard
*/
gnt.dashboard = {};
gnt.map_loaded = false;
// Create a select feature control and add it to the map.
//gnt.dashboard.select;
gnt.dashboard.geojsonFormat = new OpenLayers.Format.GeoJSON();

gnt.after_map_loaded = function(){
    var style_map = new OpenLayers.StyleMap({
        "default": {
            strokeWidth: 1,
            strokeColor: $('body').css('background-color'),
            cursor: 'pointer',
            fillColor: $('body').css('background-color'),
            fillOpacity: 0.1
        },
        "select": {
            strokeWidth: 1,
            strokeColor: $('body').css('background-color'),
            cursor: 'pointer',
            fillColor: $('body').css('background-color'),
            fillOpacity: 0.7
        }
    }),
        PP_layer = new OpenLayers.Layer.Vector("Plan proposals layer", {
            styleMap: style_map,
            visibility: true
            }),
        IC_layer = new OpenLayers.Layer.Vector("Idea competitions layer", {
            styleMap: style_map,
            visibility: true
            }),
        QU_layer = new OpenLayers.Layer.Vector("Questionnaires layer", {
            styleMap: style_map,
            visibility: true
        }),
        questionnaires = gnt.dashboard.geojsonFormat.read(projects_QU),
        idea_competitions = gnt.dashboard.geojsonFormat.read(projects_IC),
        plan_projects = gnt.dashboard.geojsonFormat.read(projects_PP),
        bounds,
        i,
        j,
        k;
        map.addLayers([IC_layer, QU_layer, PP_layer]);
        var select = new OpenLayers.Control.SelectFeature(
            [QU_layer, IC_layer, PP_layer],
            {
                id: 'selectcontrol',
                hover: true,
                onSelect: function (event) {
                    //connect the select feature with the list
                    var id = event.fid;
                    $('#' + id).addClass('hover');
                },
                onUnselect: function (event) {
                    //connect the select feature with the list
                    var id = event.fid;
                    $('#' + id).removeClass('hover');
                }
            }
        );
        map.addControl(select);
        select.activate();

        //Project geometries to map projection
        // We assume that all projects are in the same coordinate system
        var source_proj_code = 'EPSG:4326',
            source_proj,
            target_proj,
            city_ol_feature;
        if(projects_IC.crs !== undefined) {
            source_proj_code = projects_IC.crs.properties.code;
        }
        else if(projects_QU.crs !== undefined) {
            source_proj_code = projects_QU.crs.properties.code;
        }
        else if(projects_PP.crs !== undefined) {
            source_proj_code = projects_PP.crs.properties.code;
        }
        else if (city_polygon.crs !== undefined){ // fallback to Organization area
            source_proj_code = city_polygon.crs.properties.code;
        }
        source_proj = new OpenLayers.Projection(source_proj_code);
        target_proj = new OpenLayers.Projection(map.getProjection());
    
        for (i = 0; i < idea_competitions.length; i++) {
            idea_competitions[i].geometry.transform(source_proj, target_proj);
        }
        for (j = 0; j < questionnaires.length; j++) {
            questionnaires[j].geometry.transform(source_proj, target_proj);
        }
        for (k = 0; k < plan_projects.length; k++) {
            plan_projects[k].geometry.transform(source_proj, target_proj);
        }
    
        {% if request.META.HTTP_HOST != "oregonstateparks.maptionnaire.com" %}
        QU_layer.addFeatures(questionnaires);
        IC_layer.addFeatures(idea_competitions);
        IC_layer.addFeatures(plan_projects);
        {% endif %}
        //count the bounds for the map
        for (i = 0; i < idea_competitions.length; i++) {
            if (bounds === undefined) {
                bounds = idea_competitions[i].geometry.getBounds();
            } else {
                bounds.extend(idea_competitions[i].geometry.getBounds());
            }
        }
        for (j = 0; j < questionnaires.length; j++) {
            if (bounds === undefined) {
                bounds = questionnaires[j].geometry.getBounds();
            } else {
                bounds.extend(questionnaires[j].geometry.getBounds());
            }
        }
        for (k = 0; k < plan_projects.length; k++) {
            if (bounds === undefined) {
                bounds = plan_projects[k].geometry.getBounds();
            } else {
                bounds.extend(plan_projects[k].geometry.getBounds());
            }
        }
        if (bounds === undefined) {
            city_ol_feature = gnt.dashboard.geojsonFormat.read(city_polygon);
            city_ol_feature[0].geometry.transform(source_proj, target_proj);
            bounds = city_ol_feature[0].geometry.getBounds();
        }
    
    
    
    
    
        {% if request.META.HTTP_HOST == "oregonstateparks.maptionnaire.com" %}
        map.setCenter(new OpenLayers.LonLat(-13575293.937978, 5709272.0092249),10);
        {% else %} 
        map.zoomToExtent(bounds);
        {% endif %}
        //connect the list hover with the feature
        if (questionnaires.length < 2){
            $('li.project').css('background','white');
        } else {
            $('.project').hover(function (event) {
                var layer,feature;
                for (layer in map.layers) {
                    if (map.layers[layer].getFeatureByFid) {
                        feature = map.layers[layer].getFeatureByFid(this.id);
                        if (feature) {
                            map.getControl('selectcontrol').select(feature);
                        }
                    }
                }
            },
                function (event) {
                var layer,
                    feature;
                    for (layer in map.layers) {
                        if (map.layers[layer].getFeatureByFid) {
                            feature = map.layers[layer].getFeatureByFid(this.id);
                            if (feature) {
                                map.getControl('selectcontrol').unselect(feature);
                            }
                        }
                    }
                });
        }
        //this is for setting links on features
        $('.olMapViewport').click(function (event) {
            if ($('.project.hover div.begin a').length > 0) {
                window.location = $('.project.hover div.begin a')[0].href;
            }
        });
        $('ul.nav li a').click(
            function(e) {
                e.preventDefault();
                e.stopPropagation();
                $('body').removeClass('main map settings');
                $('body').addClass(this.parentNode.classList[0]);
        });
    
    };

gnt.dashboard.init = function () {

    gnt.map_loaded = gnt.maps.create_map('map');
    if (gnt.map_loaded){
        gnt.after_map_loaded();
    }

};

