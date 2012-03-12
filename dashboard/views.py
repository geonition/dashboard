# Create your views here.

from django.template import RequestContext
from django.shortcuts import render_to_response
from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from base_page.models import CitySetting
from objects import *
from models import Project

def dashboard(request):
    """
    The main dashboard page
    """
    try:
        city_settings = CitySetting.on_site.all()[0]
    except IndexError:
        city_settings = {}

    PP_projects = Project.on_site.filter(project_type = 'PP')
    IC_projects = Project.on_site.filter(project_type = 'IC')
    QU_projects = Project.on_site.filter(project_type = 'QU')
    
    return render_to_response('dashboard.html',
                              {'PP_projects': PP_projects,
                               'IC_projects': IC_projects,
                               'QU_projects': QU_projects,
                               'city_settings': city_settings},
                              context_instance = RequestContext(request))


def dashboard_js(request):
    response = render_to_response('dashboard.js',
                                  {},
                                  context_instance = RequestContext(request))
    response['Content-type'] = 'application/javascript'
    return response

