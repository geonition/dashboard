# Create your views here.

from django.template import RequestContext
from django.shortcuts import render_to_response
from base_page.models import OrganizationSetting
from dashboard.models import ExtraProjectUrl
from django.conf import settings
from datetime import date
from django.core.urlresolvers import reverse

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
    
    if "plan_proposals" in settings.INSTALLED_APPS:
        PP_projects.extend(get_active_planning_projects()['content'])
    if "geoforms" in settings.INSTALLED_APPS:
        QU_projects.extend(get_active_questionnaires()['content'])

    print 'pp', PP_projects
    return render_to_response('dashboard.html',
                              {'PP_projects': PP_projects,
                               'IC_projects': IC_projects,
                               'QU_projects': QU_projects,
                               'org_settings': org_settings,
                               'LOGIN_REDIRECT_URL': settings.LOGIN_REDIRECT_URL },
                              context_instance = RequestContext(request))


def dashboard_js(request):
    response = render_to_response('dashboard.js',
                                  {},
                                  context_instance = RequestContext(request))
    response['Content-type'] = 'application/javascript'
    return response

def get_active_questionnaires():
    from geoforms.models import Questionnaire
    today = date.today()
    active_quests = Questionnaire.on_site.filter(start_date__lte=today).filter(end_date__gte=today)
    questionnaires = []
    for quest in active_quests:
        cur_quest = {}
        cur_feature = {"type": "Feature",
                       "id": quest.id,
                       "geometry": json.loads(quest.area.json),
                       "crs": {"type": "name",
                              "properties": {
                                  "code": "EPSG:" + str(quest.area.srid)
                             }}  
                       }   
        cur_quest['name'] = quest.name
        cur_quest['description'] = quest.description
        cur_quest['area'] = cur_feature
        cur_quest['project_url'] = reverse('questionnaire', kwargs={'questionnaire_slug': quest.slug})
        questionnaires.append(cur_quest)

    return {'projectType': 'questionnaires',
            'content': questionnaires}

def get_active_planning_projects():
    from plan_proposals.models import PlanningProject
    today = date.today()
    active_projects = PlanningProject.on_site.filter(start_date__lte=today).filter(end_date__gte=today)
    projects = []
    for project in active_projects:
        cur_project = {}
        cur_feature = {"type": "Feature",
                       "id": project.id,
                       "geometry": json.loads(project.area.json),
                       "crs": {"type": "name",
                              "properties": {
                                  "code": "EPSG:" + str(project.area.srid)
                             }}  
                       }   
        cur_project['name'] = project.name
        cur_project['description'] = project.description
        cur_project['area'] = cur_feature
        proposals = project.proposal_set.all()
        if len(proposals) > 0:
            proposal = proposals[0]
            # NOTE: This is the url to the only proposal
            cur_project['project_url'] = reverse('plan_proposal', 
                                                 kwargs={'project_slug': project.slug,
                                                         'proposal_slug': proposal.slug})
        else:
            cur_project['project_url'] = reverse('planning_project', 
                                                 kwargs={'project_slug': project.slug})

        projects.append(cur_project)

    return {'projectType': 'planningProjects',
            'content': projects}


