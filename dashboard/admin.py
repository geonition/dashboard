from django.contrib.gis import admin
from django.core.urlresolvers import reverse_lazy
from dashboard.models import Project
from django.conf import settings
from modeltranslation.admin import TranslationAdmin


class DashboardProjectAdmin(admin.OSMGeoAdmin, TranslationAdmin):
    """
    This admin handles the dashboard projects
    """
    list_display = ('title',
                    'description',)

    default_lon = getattr(settings,
                          'ORGANIZATION_ADMIN_DEFAULT_MAP_SETTINGS',
                          {'default_lon': 0})['default_lon']
    default_lat = getattr(settings,
                          'ORGANIZATION_ADMIN_DEFAULT_MAP_SETTINGS',
                          {'default_lat': 0})['default_lat']
    default_zoom = getattr(settings,
                          'ORGANIZATION_ADMIN_DEFAULT_MAP_SETTINGS',
                          {'default_zoom': 4})['default_zoom']
    
    openlayers_url = '%s%s' % (getattr(settings, 'STATIC_URL', '/'),
                               'js/libs/OpenLayers.js')
    extra_js = (reverse_lazy('osmextra'),)
   

admin.site.register(Project, DashboardProjectAdmin)

