from django.db import models
from django.contrib.gis.db import models as geomodels
from django.utils import translation
from django.contrib.auth.models import User
from django.db.models import Avg, Count
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.sites.managers import CurrentSiteManager
from django.contrib.sites.models import Site

# set the ugettext _ shortcut
_ = translation.ugettext

class ProjectSetting(models.Model):

    PROJECT_TYPES = (
        ('QU','Questionnaires'),
        ('PP','Plan Proposals'),
        ('IC','Idea Competition'),
    )
    
    site = models.ForeignKey(Site)
    project_type = models.CharField(max_length = 2, choices = PROJECT_TYPES)
    title = models.CharField(max_length = 40)
    description = models.TextField()
    project_url = models.URLField()
    location = geomodels.PolygonField(srid = getattr(settings, 'SPATIAL_REFERENCE_SYSTEM_ID', 4326))
    tooltip = models.CharField(max_length = 200)
    on_site = CurrentSiteManager()

    def __unicode__(self):
        return self.title


