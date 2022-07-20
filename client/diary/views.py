from django.views.decorators.csrf import csrf_exempt
import json
from django.views import View
from django.http import HttpResponse, JsonResponse
from users.models import User
from AI.models import AI
from diary.models import Diary
from django.core import serializers
from AI import ai

# Create your views here.
async def AI(doc,did,emo):
    comm = await ai.run_comment(doc)
    #image = await ai.run_picture(doc)
    await AI.objects.create(diaryId=did, comment = comm, emotion = emo)

class mainView(View):
    def post(self, request):
        data = json.loads(request.body)
        id = data['userId']

        data = AI.objects.select_related('diaryId').values_list(
            'diaryId', 'emotion', 'diaryId__date').filter(diaryId__userId=id)
        res = []
        for i in range(len(data)):
            temp = {
                "diaryId": data[i][0],
                "emotion": data[i][1],
                "date": data[i][2]
            }
            res.append(temp)

        jsonObj = json.dumps(res, default=str)
        sdata = json.loads(jsonObj)
        return JsonResponse(sdata, status=200, safe=False)


class writeView(View):
    async def post(self, request):
        temp = json.loads(request.body)
        uId = temp.userId
        Diary.objects.create(userId=User.objects.get(
            userId=uId), contents=temp['contents'], weather=temp['weather'], title=temp['title'])        
        did = Diary.objects.filter(userId=uId).last()
        doc = temp['contents']
        emo, commemo = ai.run_emotion(doc)
        sdata = {
            "diaryId": did.diaryId,
            "emotion": emo
        }
        
        AI(doc,did,emo)
        return JsonResponse(sdata, status=201)


class checkView(View):  # 일기 확인 페이지
    def get(self, diaryId):  # 일단 diary 테이블 데이터만 넘겨줌
        data = Diary.objects.get(diaryId=diaryId)
        sdata = {
            "diaryId": data.diaryId,
            "date": data.date,
            "weather": data.weather,
            "title": data.title,
            "contents": data.contents,
            "liked": data.liked
        }
        return JsonResponse(sdata, status=200)

    def put(self, request):
        return JsonResponse()


class moodView(View):
    def get(self, request, diaryId):
        emotion = AI.objects.get(diaryId=diaryId)
        sdata = {
            "emotions": emotion.emotion
        }
        return JsonResponse(sdata, status=200)

    def post(self, request):
        data = json.loads(request.body)
        dId = data['diaryId']
        semo = data['emotion']
        newemo = AI.objects.get(diaryId=dId)
        newemo.emotion = semo
        newemo.save()
        return HttpResponse(status=201)


class likeView(View):  # 즐겨찾기 페이지
    def get(self, request):
        id = request.GET['userId']
        data = AI.objects.select_related('diaryId').values_list(
            'diaryId', 'emotion', 'comment', 'diaryId__date', 'diaryId__weather', 'diaryId__title').filter(diaryId__userId=id, diaryId__liked=1)
        res = []
        for i in range(len(data)):
            temp = {
                "diaryId": data[i][0],
                "emotion": data[i][1],
                "comment": data[i][2],
                "date": data[i][3],
                "weather": data[i][4],
                "title": data[i][5],
            }
            res.append(temp)

        jsonObj = json.dumps(res, default=str)
        sdata = json.loads(jsonObj)
        return JsonResponse(sdata, status=200, safe=False)

    def post(self, request):
        data = json.loads(request.body)
        dId = data['diaryId']
        dlike = data['liked']
        adata = Diary.objects.get(diaryId=dId)
        adata.liked = dlike
        adata.save()
        return JsonResponse({"message": "update success"}, status=201)


class resultView(View):
    def get(self, request):
        dId = request.GET['diaryId']
        if AI.objects.only('image').get(diaryId=dId) == NULL:
            return JsonResponse({"message: not yet"}, status=200)

        else:
            data = AI.objects.get(diaryId=dId)
            jsonObj = json.dumps(data)
            return JsonResponse(jsonObj, status=200)