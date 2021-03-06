# Create your views here.

from django.template import RequestContext
from django.shortcuts import render_to_response,redirect
from base_page.models import OrganizationSetting
from dashboard.models import ExtraProjectUrl
from django.conf import settings
from django.utils.translation import get_language
from django.utils.translation import to_locale
from django.utils.translation import ugettext as _
from django.core.cache import cache

import urllib2
import json

def dashboard(request):
    if request.get_host().startswith('demo'):
        return redirect('http://maptionnaire.com/', permanent=True)
    lang = to_locale(get_language()).lower()
    cache_id = 'dashboard_resp_{0}_{1}'.format(request.META['HTTP_HOST'],lang)
    resp = cache.get(cache_id)
    if not request.user.is_authenticated() and resp is not None:
        return resp


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
        PP_projects.extend(get_planning_projects()['content'])
    if "geoforms" in settings.INSTALLED_APPS:
        QU_projects.extend(get_questionnaires()['content'])

    resp = render_to_response('dashboard.html',
                              {'PP_projects': PP_projects,
                               'IC_projects': IC_projects,
                               'QU_projects': QU_projects,
                               'org_settings': org_settings,
                               'PHOTO_COLLAGE' : getattr(settings,'PHOTO_COLLAGE',''),
                               'EMPTY_DASHBOARD_MESSAGE' : getattr(
                                   settings,
                                   'EMPTY_DASHBOARD_MESSAGE',
                                   {lang:_('Currently there are no open questionnaires. Please come back later!')})[lang],
                               'DO_NOT_ADD_AREA_ON_DASHBOARD_MAP' : getattr(settings,'DO_NOT_ADD_AREA_ON_DASHBOARD_MAP',False),
                               'DO_NOT_SHOW_DASHBOARD_MAP' : getattr(settings,'DO_NOT_SHOW_DASHBOARD_MAP',False),
                               'CUSTOM_DASHBOARD_IMAGE_FILE' : getattr(settings,'CUSTOM_DASHBOARD_IMAGE_FILE',''),
                               'LOGIN_REDIRECT_URL': settings.LOGIN_REDIRECT_URL },
                              context_instance = RequestContext(request))
    if not request.user.is_authenticated():
        cache.set(cache_id, resp, 1800)
    return resp


def dashboard_js(request):
    response = render_to_response('dashboard.js',
                                  {},
                                  context_instance = RequestContext(request))
    response['Content-type'] = 'application/javascript'
    return response

def get_questionnaires():
    from geoforms.views import get_active_questionnaires
    return json.loads(get_active_questionnaires('').content)


def get_planning_projects():
    from plan_proposals.views import get_active_planning_projects
    return json.loads(get_active_planning_projects('').content)


