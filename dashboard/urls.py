from django.conf.urls.defaults import patterns
from django.conf.urls.defaults import url

urlpatterns = patterns('dashboard.views',
    url(r'^$',
        'home',
        name="dashboard"),    
    
    #change language
    url(r'^setlang/$',
        'set_language',
        name="set_language"),
    
    url(r'^dashboard.js$',
        'dashboard_js',
        name="dashboard_js"),

    url(r'^feedback/$',
        'feedback_form',
        name="feedback_form"),
    )
