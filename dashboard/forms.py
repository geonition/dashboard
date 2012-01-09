from django.forms import ModelForm
from models import Feedback

class FeedbackForm(ModelForm):
    """
    This form is used to validate and send
    feedback email from user to administrator
    """
    
    class Meta:
        model = Feedback
