from django.urls import path
from .views import mainView, writeView, moodView, likeView, resultView
  
urlpatterns = [
    path('', mainView.as_view()),
    path('write', writeView.as_view()),
    path('mood/', moodView.as_view()),
    path('like/', likeView.as_view()),
    path('result', resultView.as_view())
]
