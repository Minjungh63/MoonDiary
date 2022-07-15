from datetime import  datetime
from django.views import View
from django.core import serializers
from rest_framework.response import Response
from diary.models import Diary
from AI.models import AI
from django.db.models import Count
# Create your views here.
class StatisticsView(View):
    def get(self, request):
        userId = request.GET['userId']
        # emotionRank = Diary.objects.raw(f"SELECT emotion as id, count(*) as day FROM DIARY INNER JOIN AI using(diaryId) where strftime('%Y-%m',date)=strftime('%Y-%m', datetime('now')) AND userId = 'test' group by emotion")
        month = Diary.objects.filter(date__contains=datetime.now().strftime("%Y-%m")).filter(userId=userId)
        emotion = AI.objects.filter(diaryId__in=month.values('diaryId')).values('emotion').annotate(day=Count('emotion'))
        # data = serializers.serialize("json", emotionRankList)
        return Response(data =emotion, status=200)

# class Statistics:
#     diaryid=''
#     year=''
#     month=''
#     emotion=''
#     def __init__(self, diaryId, year, month, emotion):
#         self.diaryId = diaryId
#         self.year = year
#         self.month = month
#         self.emotion = emotion
    

# statistics = []
# diaryId = data.diaryId
# year = str(data.date).split("-")[0]
# month = str(data.date).split("-")[1]
# emotion = data.emotion
# statistics = Statistics(diaryId=diaryId, year=year, month=month, emotion=emotion)
# statisticsList.append(statistics)