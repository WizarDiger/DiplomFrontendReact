from django.urls import path
from . import views

urlpatterns = [
    path('api/getmood/', views.getmood, name='getmood-api'),
]
