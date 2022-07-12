from django.views.decorators.csrf import csrf_exempt
import json
from django.views import View
from django.http import HttpResponse, JsonResponse
from .models import User
# Create your views here.

class joinView(View):
    # def get(self,request):
    #     return JsonResponse({'message': "요청 전송"}, status=200)
    def post(self,request):
        data = json.loads(request.body)
        id = data['userId']
        pw = data['password']
        name = data['name']
        
        try:
            #이미 등록된 아이디
            if User.objects.filter(userId = id).exists():
                return HttpResponse(status=409)
            User.objects.create(
                userId = id,
                name = name,
                password = pw,
                imageYN = 1,
                commentYN = 1
            )
            HttpResponse(status=201)
        except KeyError:
            return JsonResponse({"message":"INVALID_KEYS"}, status=400)

class loginView(View):
    def post(self, request):
        data = json.loads(request.body)
        id = data['userId'].replace('"','')
        pw = data['password'].replace('"','')
        
        if User.objects.filter(userId = id).exists():
            user = User.objects.get(userId = id)
            if user.password == pw:
                return JsonResponse({'message':'success'},status = 200)
            else :
                return JsonResponse({'message':'pw error'},status = 401)

        return JsonResponse({'message':'id error'},status=400)