from rest_framework import serializers
from .models import MoodOfPhrase


class MoodOfPhraseSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodOfPhrase
        fields = ['id', 'phrase']
