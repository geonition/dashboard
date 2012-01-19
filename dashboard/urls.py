from django.conf.urls.defaults import patterns
from django.conf.urls.defaults import url

urlpatterns = patterns('dashboard.views',
    url(r'^$',
        'dashboard',
        name="dashboard"),
    
    url(r'^dashboard.js$',
        'dashboard_js',
        name="dashboard_js"),

    )
