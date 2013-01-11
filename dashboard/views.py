# Create your views here.

from django.template import RequestContext
from django.shortcuts import render_to_response
from base_page.models import OrganizationSetting
from dashboard.models import Project
from django.conf import settings

# we need srid of dashboard map
from maps.models import Map

def dashboard(request):
    """
    The main dashboard page
    """
    # At the moment dashboard always use map named dashboard.
    # This should not be hardcoded
    map_srid = int(Map.objects.get(slug_name = 'dashboard').projection)
    try:
#        org_settings = OrganizationSetting.on_site.all()[0]
        org_settings = OrganizationSetting.objects.filter(site=settings.SITE_ID).transform(map_srid)[0]
    except IndexError:
        org_settings = {}

#     PP_projects = Project.on_site.filter(project_type = 'PP').order_by('-pk')
#     IC_projects = Project.on_site.filter(project_type = 'IC').order_by('-pk')
#     QU_projects = Project.on_site.filter(project_type = 'QU').order_by('-pk')
    PP_projects = Project.objects.filter(
                        site=settings.SITE_ID).filter(
                        project_type = 'PP').transform(map_srid).order_by('-pk')
    IC_projects = Project.objects.filter(
                        site=settings.SITE_ID).filter(
                        project_type = 'IC').transform(map_srid).order_by('-pk')
    QU_projects = Project.objects.filter(
                        site=settings.SITE_ID).filter(
                        project_type = 'QU').transform(map_srid).order_by('-pk')
                            
    return render_to_response('dashboard.html',
                              {'PP_projects': PP_projects,
                               'IC_projects': IC_projects,
                               'QU_projects': QU_projects,
                               'org_settings': org_settings},
                              context_instance = RequestContext(request))


def dashboard_js(request):
    response = render_to_response('dashboard.js',
                                  {},
                                  context_instance = RequestContext(request))
    response['Content-type'] = 'application/javascript'
    return response

