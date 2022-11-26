from django.urls import path

from soph.apps.pages import views

urlpatterns = [
    path('', views.HomePageView.as_view())
]