from django.db import models


# Create your models here.
class MoodOfPhrase(models.Model):
    phrase = models.CharField(max_length=10000)