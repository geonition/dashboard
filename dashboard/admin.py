from django.contrib.gis import admin
from models import ProjectSetting

class Location(admin.OSMGeoAdmin):
    default_lon = 2407221.77716 
    default_lat = 9123608.26437
    default_zoom = 12   

admin.site.register(ProjectSetting, Location)
