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

def dashboard(request):
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
    
    return render_to_response('dashboard.html',
                              {'projects': projects},
                              context_instance = RequestContext(request))
    
def dashboard_js(request):
    response = render_to_response('dashboard.js',
                                  {},
                                  context_instance = RequestContext(request))
    response['Content-type'] = 'application/javascript'
    return response

