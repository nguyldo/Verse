from django.urls import path
from django.template import loader

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('upload/', views.upload, name='upload'),
    path('facebookData/<userFileName>/', views.facebookDataAPI),
    path('appleData/<userFileName>/', views.appleDataAPI),
    path('netflixData/<userFileName>/', views.netflixDataAPI),
    path('googleData/<userFileName>/', views.googleDataAPI),

]
