from django.urls import path

from . import views

urlpatterns = [
    path("ai/recommend/", views.ai_recommend_view, name="ai_recommend"),
    path("prolog/recommend/", views.prolog_recommend_view, name="prolog_recommend"),
]
