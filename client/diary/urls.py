from django.urls import path
from .views import mainView, writeView
  
urlpatterns = [
    path('', mainView.as_view()),
    path('write', writeView.as_view()),
]