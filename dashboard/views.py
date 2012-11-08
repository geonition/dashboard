# Create your views here.

from django.template import RequestContext
from django.shortcuts import render_to_response
from base_page.models import OrganizationSetting
from dashboard.models import Project
from datetime import datetime
from kateva.models import KatevaQ

def dashboard(request):
    """
    The main dashboard page
    """
    try:
        org_settings = OrganizationSetting.on_site.all()[0]
    except IndexError:
        org_settings = {}

    PP_projects = Project.on_site.filter(project_type = 'PP').order_by('-pk')
    IC_projects = Project.on_site.filter(project_type = 'IC').order_by('-pk')
    #QU_projects = Project.on_site.filter(project_type = 'QU').order_by('-pk')
    QU_projects = KatevaQ.objects.filter(
            launchDate__lte=datetime.now(),
            endDate__gte=datetime.now()).order_by('-pk')
    
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

