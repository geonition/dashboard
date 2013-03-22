from django.contrib.gis import admin as gisAdmin
from django.core.urlresolvers import reverse_lazy
from dashboard.models import Project
from django.conf import settings
from modeltranslation.admin import TranslationAdmin
from django.utils.translation import ugettext as _


from django.contrib import admin
from dashboard.models import ExtraProjectUrl


class DashboardProjectAdmin(gisAdmin.OSMGeoAdmin, TranslationAdmin):
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
    
 
#admin.site.register(Project, DashboardProjectAdmin)

class DashboardExtraUrlAdmin(admin.ModelAdmin):
    list_display = ('project_url',
                    'url_description',)
    fieldsets = (
        (_('Advanced options'), {
            'fields': ('url_description', 'project_url'),
            'classes': ('collapse','wide',),
            'description': 'Url is only needed if applications are not installed on their default locations.'
        }),
    )

admin.site.register(ExtraProjectUrl, DashboardExtraUrlAdmin)
