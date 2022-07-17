import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from users.models import User
# Create your views here.
class SettingView(View):
    def get(self, request):
        userId = request.GET['userId']
        user = User.objects.filter(userId=userId)
        data = {
                "imageYN": user[0].imageYN,
                "commentYN":user[0].commentYN
            }

        jsonObj = json.dumps(data, default=str)
        sdata = json.loads(jsonObj)
        return JsonResponse(sdata, status=200, safe=False)