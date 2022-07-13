from django.urls import path
from .views import checkView, mainView, writeView
  
urlpatterns = [
    path('', mainView.as_view()),
    path('write', writeView.as_view()),
    path('<int:diaryId>', checkView.as_view())
]