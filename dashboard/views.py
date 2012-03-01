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

    project_setting = Project.on_site.all().order_by('project_type')
    try:
        city_settings = CitySetting.on_site.all()[0]
    except IndexError:
        city_settings = {}

    return render_to_response('dashboard.html',
                              {'project_setting': project_setting,
                              'city_settings': city_settings},
                              context_instance = RequestContext(request))


def dashboard_js(request):
    response = render_to_response('dashboard.js',
                                  {},
                                  context_instance = RequestContext(request))
    response['Content-type'] = 'application/javascript'
    return response

