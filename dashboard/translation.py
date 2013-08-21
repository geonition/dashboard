from modeltranslation.translator import translator, TranslationOptions
from dashboard.models import Project as DashboardProject


#dashboard
class DashboardProjectTranslationOptions(TranslationOptions):
    fields = ('title',
              'description',
              )

translator.register(DashboardProject, DashboardProjectTranslationOptions)

