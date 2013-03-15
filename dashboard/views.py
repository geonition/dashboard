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
        
    QU_projects = []
    PP_projects = []
    IC_projects = []
    
    # Default url construction
    url_prefix = 'http://'
    if request.is_secure():
        url_prefix = 'https://'
    host = request.get_host()
    # this is needed if applications are not in the root of the server
    path_prefix = request.path.split(request.path_info)[0]
    default_urls = [url_prefix + host + path_prefix + '/geoforms/active/', 
                    url_prefix + host + path_prefix + '/planning/active/',]

    projects = Project.on_site.order_by('-pk')
    urls = []
    for project in projects:
        urls.append(project.project_url)
    urls.extend(default_urls)
    #TODO remove possible duplicates
    for url in urls:
        if not '/active/' in url[-8:]:
            continue
            
        resp = urllib2.urlopen(url)
        if resp.getcode() == 200:
            response_dict = json.load(resp)
        else:
            continue
        if response_dict['projectType'] == 'questionnaires':
            QU_projects.extend(response_dict['content'])
        elif response_dict['projectType'] == 'planningProjects':
            PP_projects.extend(response_dict['content'])
        elif response_dict['projectType'] == 'ideaCompetitions':
            IC_projects.extend(response_dict['content'])
        
#    PP_projects = Project.on_site.filter(project_type = 'PP').order_by('-pk')
#    IC_projects = Project.on_site.filter(project_type = 'IC').order_by('-pk')
#    QU_projects = Project.on_site.filter(project_type = 'QU').order_by('-pk')

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

