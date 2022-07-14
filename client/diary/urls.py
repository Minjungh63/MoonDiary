from django.urls import path
from .views import checkView, mainView, writeView, chooseView, likeView
  
urlpatterns = [
    path('', mainView.as_view()),
    path('write', writeView.as_view()),
    path('<int:diaryId>', checkView.as_view()),
    path('write/mood', chooseView.as_view()),
    path('diary/like', likeView.as_view())
]
