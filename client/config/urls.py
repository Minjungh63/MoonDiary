from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('users.urls')),
    path('diary/', include('diary.urls')),
    path('statistics/', include('statistic.urls'))
]
