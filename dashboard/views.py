# Create your views here.

from django.template import RequestContext
from django.shortcuts import render_to_response
from base_page.models import OrganizationSetting
from dashboard.models import Project

import urllib2
import json

def dashboard(request):
    """
    The main dashboard page
    """
    try:
        org_settings = OrganizationSetting.on_site.all()[0]
    except IndexError:
        org_settings = {}

    url = 'http://localhost:8000/geoforms/active/'
    resp = urllib2.urlopen(url)
    if resp.getcode() == 200:
        response_dict = json.load(resp)
    if response_dict['projectType'] == 'questionnaires':
        QU_projects = response_dict['content']
        
    
    PP_projects = Project.on_site.filter(project_type = 'PP').order_by('-pk')
    IC_projects = Project.on_site.filter(project_type = 'IC').order_by('-pk')
#    QU_projects = Project.on_site.filter(project_type = 'QU').order_by('-pk')
#    print ('===================================')
#    print (QU_projects)
    #import ipdb; ipdb.set_trace()
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

