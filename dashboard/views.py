#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Create your views here.
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.template import RequestContext
from django.template import loader
from django.shortcuts import render_to_response
from django.shortcuts import redirect
from django.conf import settings
from django.utils import translation
from django.utils.translation import ugettext as _
from django.core.urlresolvers import reverse
from objects import *
from models import Feedback
from forms import FeedbackForm

def home(request):
    """
    The main dashboard page
    """
    projects = []
    #projects.append(Project(u"Palosaaren elinympäristö", u"Questionnaires", u"Palosaaren suunnittelua varten kerätään asukkailta tietoa omasta elinympäristöstä", "https://pehmo.tkk.fi/soft/main"))
    projects.append(Project(_(u"Vaasan keskustastrategia"),
                            u"Questionnaires",
                            _(u"Kerro meille, millainen on Vaasan keskusta ja "
                            u"vaikuta elinympäristöösi! Näillä sivuilla pääset "
                            u"kertomaan, millainen paikka Vaasan keskusta on "
                            u"asua ja elää. Kysely on osa Vaasan kaupungin "
                            u"keskustastrategiatyötä, jota tehdään yhdessä "
                            u"kaupunkilaisten ja eri toimijoiden kanssa. "
                            u"Strategiatyön tavoitteena on turvata keskustan "
                            u"viihtyisyys myös tulevaisuudessa sekä kehittää "
                            u"keskustasta entistä vetovoimaisempi ja elävämpi "
                            u"alue."),
                            "http://www.pehmogis.fi/vaasa_keskusta"))
    #projects.append(Project(u"Vaasan keskustan kehittämis ideoita: projekti 1", u"Planning feedback", u"Anna omia ehdotuksia kuinka Vaasan keskustaa tulisi kehittää", "../planning-project/project-1"))
    #projects.append(Project(u"Vaasan keskustan kehittämis ideoita: projecti 2", u"Planning feedback", u"Anna omia ehdotuksia kuinka Vaasan keskustaa tulisi kehittää", "../planning-project/project-2"))
    projects.append(Project(_(u"Palosaaren ideakilpailu"),
                            u"Planning feedback",
                            _(u"Tällä sivulla sinun on mahdollista tutustua "
                            u"kilpailutöihin sekä palkintolautakunnan "
                            u"yleisarvioon kilpailusta ja yksittäisistä töistä. "
                            u"Asukkaiden arvostelut ovat nyt myös nähtävillä."),
                            "https://pehmo.tkk.fi/soft/idea_competition/evaluation/"))
    
    return render_to_response('home.html',
                              {'projects': projects},
                              context_instance = RequestContext(request))
    
def test(request):
    
    return render_to_response('test.html',
                              {},
                              context_instance = RequestContext(request))
    
def dashboard_js(request):
    response = render_to_response('dashboard.js',
                                  {},
                                  context_instance = RequestContext(request))
    response['Content-type'] = 'application/javascript'
    return response

def set_language(request):

    language = 'fi'
    if request.method == 'GET' and 'lang' in request.GET:
        language = request.GET['lang']
        request.session['language'] = language
        
    elif 'language' in request.session:
        language = request.session['language']
    
    else:
        language = translation.get_language_from_request(request)
    
    
    for lang in settings.LANGUAGES:
        if lang[0] == language:
            translation.activate(language)
                
    request.LANGUAGE_CODE = translation.get_language()

    #get current page   
    referer = request.META.get('HTTP_REFERER', '/')
    
    response = HttpResponseRedirect(referer)
    
    response.set_cookie(getattr(settings,
                                "LANGUAGE_COOKIE_NAME",
                                "ContinousPlanningLang"),
                        language)
    return response



def feedback_form(request):
    
    """
    This function handles the feedback form
    """
    if (request.method == 'GET'):
        form = FeedbackForm();
            
        return render_to_response('feedback.html', {
            'form': form,
        },
        context_instance=RequestContext(request)
        )
            
    elif (request.method == 'POST'):
        form = FeedbackForm(request.POST)
        
        if form.is_valid():
            
            cleaned_data = form.cleaned_data
            cleaned_data['content'] = "%s %s" % (cleaned_data['content'], request.META.get('HTTP_USER_AGENT', 'unknown'))
            if request.user.is_authenticated():
                cleaned_data['content'] = "%s %s" % (cleaned_data['content'], request.user.email)
            
            feedback = Feedback(content = cleaned_data['content'])
            feedback.save()
            
            return HttpResponseRedirect(reverse('dashboard'))
        

            
            
            #username = form.cleaned_data['username']
            #password = form.cleaned_data['password1']
            #
            #user = authenticate(username=username, password=password)

