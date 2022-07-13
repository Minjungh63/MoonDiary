from django.urls import path
from .views import checkView, mainView, writeView, chooseView
  
urlpatterns = [
    path('', mainView.as_view()),
    path('write', writeView.as_view()),
    path('<int:diaryId>', checkView.as_view()),
    path('write/mood', chooseView.as_view())
]
