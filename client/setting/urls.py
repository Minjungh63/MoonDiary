from django.urls import path

from setting.views import SettingView

  
urlpatterns = [
    path('', SettingView.as_view()),
]