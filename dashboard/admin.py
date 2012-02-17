from django.contrib.gis import admin
from models import ProjectSetting

admin.site.register(ProjectSetting, admin.GeoModelAdmin)
