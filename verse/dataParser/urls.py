from django.urls import path
from django.template import loader

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('upload/', views.upload, name='upload'),
    path('testapi/', views.testApi, name='testApi')
]
