from django.urls import path

from statistic.views import StatisticsView
  
urlpatterns = [
    path('/', StatisticsView.as_view()),
]