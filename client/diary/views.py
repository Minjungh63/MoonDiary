from urllib import response
from django.views.decorators.csrf import csrf_exempt
import json
from django.views import View
from django.http import HttpResponse, JsonResponse
from .models import Diary, AI
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
        data = Diary()
        data.contents = request.POST['contents']
        data.weather = request.POST['weather']
        data.userId = request.POST['userId']
        data.title = request.POST['title']
        data.save()
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