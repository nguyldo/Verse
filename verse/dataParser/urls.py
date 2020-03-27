from django.urls import path
from django.template import loader

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('upload/', views.upload, name='upload'),
    path('facebookDataGroups/', views.facebook_dataGroupAPI, name='facebook_dataGroupAPI'),
    
    path('appleGeneralDataGroups/', views.apple_generalDataGroupAPI, name='apple_generalDataGroupAPI'),
    path('appleMusicDataGroups/', views.apple_musicDataGroupAPI, name='apple_musicDataGroupAPI'),
    path('appleAppsGamesDataGroups/', views.apple_appsGamesDataGroupAPI, name='apple_gameDataGroupAPI'),

    path('testapi/', views.testApi, name='testApi')
]
