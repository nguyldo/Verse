from django.urls import path
from django.template import loader

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('upload/', views.upload, name='upload'),
    path('userName/', views.facebook_UserNameAPI, name='facebook_UserNameAPI'),
    path('testapi/', views.testApi, name='testApi')
]
