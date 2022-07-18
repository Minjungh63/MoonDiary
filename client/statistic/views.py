from django.http import JsonResponse
from django.views import View
from diary.models import Diary
# Create your views here.
    
class StatisticsView(View):
    def get(self, request):
        userId = request.GET['userId']
        dataList = Diary.objects.raw('SELECT DIARY.diaryId, DIARY.date, AI.emotion FROM DIARY LEFT JOIN AI WHERE DIARY.diaryId = AI.diaryId AND userId = %s', [userId])
        
        statisticsList = []
        for data in dataList:
            statistics = []
            diaryId = data.diaryId
            year = str(data.date).split("-")[0]
            month = str(data.date).split("-")[1]
            emotion = data.emotion
            statistics = Statistics(diaryId, year, month, emotion)
            statisticsList.append(statistics)

        return JsonResponse(statisticsList, status=200)
    
class Statistics:
    diaryid=''
    year=''
    month=''
    emotion=''
    def __init__(self, diaryId, year, month, emotion):
        self.diaryId = diaryId
        self.year = year
        self.month = month
        self.emotion = emotion
    
