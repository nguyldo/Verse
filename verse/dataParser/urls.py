from django.urls import path
from django.template import loader

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('upload/', views.upload, name='upload'),
    path('facebookData/<userFileName>/', views.facebookDataAPI),
    
    path('appleGeneralData/<userFileName>/', views.appleGeneralDataAPI),
    path('appleMusicData/<userFileName>/', views.appleMusicDataAPI),
    path('appleAppsGamesData/<userFileName>/', views.appleAppsGamesDataAPI),

    path('googleData/<userFileName>/', views.googleDataAPI),

    path('netflixData/<userFileName>/', views.netflixDataAPI),
]
