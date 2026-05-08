from django.urls import path

import views

urlpatterns = [path("recommend/", views.recommend_view, name="ai_recommend")]
