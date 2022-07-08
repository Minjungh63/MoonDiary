from django.urls import path
from .views import mainView, diaryView
  
urlpatterns = [
    path('', mainView.as_view()),
    path('write', diaryView.as_view()),
]