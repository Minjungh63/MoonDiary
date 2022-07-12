from django.views.decorators.csrf import csrf_exempt
import json
from django.views import View
from django.http import HttpResponse, JsonResponse
from .models import Diary, User
# Create your views here.

class mainView(View):
    def get(self, request):
        id = request.GET['userId']
        print(id)
        sdata = AI.objects.select_related('diaryId').get(diaryId=id)

        print(sdata)
        return JsonResponse(sdata, status=200)
    
class writeView(View):
    def post(self, request):
        temp = json.loads(request.body)
        print(temp)
        #data.userId = temp['userId']
        Diary.objects.create(userId=User.objects.get(userId="test"), contents=temp['contents'], weather=temp['weather'], title=temp['title'])

        return HttpResponse(status=201)
    
class checkView(View):
    def get(self, request):#일단 diary 테이블 데이터만 넘겨줌
        dId = request.GET['diaryId']
        data = Diary.objects.get(diaryId=dId)
        return JsonResponse(data,response=200)
        
    def post(self, request):
        dId = request.GET['diaryId']
        data = Diary.objects.get(diaryId=dId)
        data.liked = 1
        data.save()
        return HttpResponse(status=201)