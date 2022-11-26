from django.urls import path

from soph.pages import views

urlpatterns = [
    path('', views.home)
]