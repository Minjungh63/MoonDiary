from django.views.decorators.csrf import csrf_exempt
import json
from django.views import View
from django.http import HttpResponse, JsonResponse
from .models import Diary, AI
# Create your views here.

class mainView(View):
    def get(self, request):
        id = json.loads(request.body.userId)
        print(id)
        sdata = AI.objects.select_related('diaryId').get(diaryId=id)

        print(sdata)
        return JsonResponse(sdata, status=200)
    
class diaryView(View):
    def post(self, request):
        data = json.loads(request.body)
        id = data['userId'].replace('"','')
        
        date = data['date'].replace('"','')
        weather = data['weather'].replace('"','')
        title = data['title'].replace('"','')
        contents = data['userId'].replace('"','')

        
        print(sdata)
        return JsonResponse(sdata, status=200)