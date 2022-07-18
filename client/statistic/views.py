from datetime import  datetime
from django.views import View
from django.http import JsonResponse
from diary.models import Diary
from AI.models import AI
from django.db.models import Count
import json

# Create your views here.
class StatisticsView(View):
    def get(self, request):
        userId = request.GET['userId']
        month = Diary.objects.filter(date__contains=datetime.now().strftime("%Y-%m")).filter(userId=userId)
        emotion = AI.objects.filter(diaryId__in=month.values_list('diaryId')).values('emotion').annotate(day=Count('emotion'))
        res = []
        for i in range(len(emotion)):
            temp = {
                "emotion": emotion[i]['emotion'],
                "day": emotion[i]['day']
            }
            res.append(temp)
        jsonObj = json.dumps(res, default=str)
        sdata = json.loads(jsonObj)
        return JsonResponse(sdata, status=200, safe=False)