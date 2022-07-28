import base64
import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views import View
from users.models import User
from diary.models import Diary

class SettingView(View):
    def get(self, request):
        userId = request.GET['userId']
        user = User.objects.get(userId=userId)
        sdata = {
                "imageYN": user.imageYN,
                "commentYN":user.commentYN
                }

        return JsonResponse(sdata, status=200, safe=False)

    def post(self, request):
        temp = json.loads(request.body)
        userId = temp['userId']

        print(temp)
          
        if 'font' in temp:
            font = temp['font']
            User.objects.filter(userId=userId).update(font = font)
            return HttpResponse(status=201)
        
        if 'imageYN' in temp:
            imageYN = temp['imageYN']
            User.objects.filter(userId=userId).update(imageYN = imageYN)
            return JsonResponse(status=201)
        
        if 'commentYN' in temp:
            print('comm update')
            commentYN = temp['commentYN']
            User.objects.filter(userId=userId).update(commentYN = commentYN)
            return HttpResponse(status=201)
        
        if 'deleteDiary' in temp:
            Diary.objects.filter(userId=userId).delete()
            return HttpResponse(status=201)
        
        if 'deleteAll' in temp:
            User.objects.filter(userId=userId).delete()
            return HttpResponse(status=201)
        
        return JsonResponse({'message':'fail'}, status=400)
