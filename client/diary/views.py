from django.views.decorators.csrf import csrf_exempt
import json
from django.views import View
from django.http import HttpResponse, JsonResponse
from .models import Diary, User
# Create your views here.

class mainView(View):
    def get(self, request):
        id = request.GET['userId']
        data = Diary.objects.raw('SELECT DIARY.diaryId, DIARY.date, AI.emotion FROM DIARY LEFT JOIN AI WHERE DIARY.diaryId = AI.diaryId AND userId = %s', [id])
        return JsonResponse(data, status=200)
    
class writeView(View):
    def post(self, request):
        temp = json.loads(request.body)
        print(temp)
        #data.userId = temp['userId']
        Diary.objects.create(userId=User.objects.get(userId="test"), contents=temp['contents'], weather=temp['weather'], title=temp['title'])

        return HttpResponse(status=201)
    
class checkView(View):#일기 확인 페이지
    def get(self, request):#일단 diary 테이블 데이터만 넘겨줌
        dId = request.GET['diaryId']
        data = Diary.objects.get(diaryId=dId)
        print(data)
        return JsonResponse(data,response=200)
        
    def post(self, request):#
        dId = request.GET['diaryId']
        data = Diary.objects.get(diaryId=dId)
        data.liked = 1
        data.save()
        return HttpResponse(status=201)