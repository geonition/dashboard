from django.contrib.gis import admin
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

admin.site.register(Project, DashboardProjectAdmin)

