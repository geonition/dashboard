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

class Project(models.Model):

    PROJECT_TYPES = (
        ('QU', _('Questionnaires')),
        ('PP', _('Plan Proposals')),
        ('IC', _('Idea Competition')),
    )

    site = models.ForeignKey(Site,
                             default = getattr(settings, 'SITE_ID', 1),
                             editable = False)
    project_type = models.CharField(max_length = 2, choices = PROJECT_TYPES)
    title = models.CharField(max_length = 40)
    description = models.TextField()
    project_url = models.URLField(help_text = _('This is the link to the project page. The link has to be a full link starting with http:// or https://'),
                                  verbose_name = _('Link to project'))
    location = geomodels.PolygonField(srid = getattr(settings, 'SPATIAL_REFERENCE_SYSTEM_ID', 4326),
                                      help_text = _('This is the location of the project that is shown on the dashboard. The area will be clickable and work as a link that takes the user to the project.'))
    modify_date = models.DateField(auto_now = True)
    on_site = CurrentSiteManager()

    def __unicode__(self):
        return self.title


