import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views import View
from AI.tasks import test
from config.celery import oneSeconds, twoSeconds
from config.celery import hello
from config.celery import add
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

    def post(self, request):
        temp = json.loads(request.body)
        userId = temp['userId']
        imageYN = temp['imageYN']
        commentYN = temp['commentYN']
        User.objects.filter(userId=userId).update(imageYN = imageYN, commentYN = commentYN)

        
        # r = add.apply_async((2, 2), link=add.s(16))
        # a = add.apply_async((2, 2), link=add.s(16))
        # b = add.apply_async((2, 2), link=add.s(16))
        # c = add.apply_async((2, 2), link=add.s(16))
       
        r=test.apply_async(())
        r=test.apply_async(())
        r=test.apply_async(())
        r=test.apply_async(())
        r=test.apply_async(())
        print(r.get())
        # def on_raw_message(body):
        #     print(body)

        # a, b = 1, 1
        # c = twoSeconds.apply_async(args=(a, b))
        # r = oneSeconds.apply_async(args=(a, b))
        # print(c.get(on_message=on_raw_message, propagate=False))
        # print(r.get(on_message=on_raw_message, propagate=False))
        


        return HttpResponse(status=201)