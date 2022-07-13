from django.forms import ModelChoiceField
from django.views.decorators.csrf import csrf_exempt
import json
from django.views import View
from django.http import HttpResponse, JsonResponse
from users.models import User
from AI.models import AI
from diary.models import Diary

# Create your views here.

class mainView(View):
    def post(self, request):
        data = json.loads(request.body)        
        id = data['userId']
        
        data = AI.objects.select_related('diaryId').values_list('diaryId','emotion','diaryId__date').filter(diaryId__userId=id)
        
        return HttpResponse(data, status=200)
    
class writeView(View):
    def post(self, request):
        temp = json.loads(request.body)
        print(temp)
        #data.userId = temp['userId']
        new = Diary.objects.create(userId=User.objects.get(userId="test"), contents=temp['contents'], weather=temp['weather'], title=temp['title'])
        
        id = Diary.objects.get(contents=temp['contents'])
        did = id.diaryId
        print(did)
        sdata = {
            "diaryId": did
        }
        return JsonResponse(sdata, status=201)
    
class checkView(View):#일기 확인 페이지
    def get(self, request):#일단 diary 테이블 데이터만 넘겨줌
        dId = request.GET['diaryId']
        data = Diary.objects.get(diaryId=dId)
        print(data)
        return JsonResponse(data,response=200)
        
    def post(self, request):#
        dId = request.POST['diaryId']
        data = Diary.objects.get(diaryId=dId)
        data.liked = 1
        data.save()
        return HttpResponse(status=201)
    
class chooseView(View):
    def get(self, request):
        dId = request.GET['diaryId']
        emotion = AI.objects.raw('SELECT emotion FROM AI WHERE diaryId = %s', [dId])
        return JsonResponse(emotion, status=200)
    
    def post(self, request):
        dId = request.POST['diaryId']
        data = Diary.objects.get(diaryId=dId)
    
    
class QS:
    diaryId=''
    year=''
    month=''
    day=''
    emotion=''
    
    def __init__(self, diaryId, year, month, day, emotion):
        self.diaryId = diaryId
        self.year = year
        self.month = month
        self.day = day
        self.emotion = emotion
