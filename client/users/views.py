from django.views.decorators.csrf import csrf_exempt
import json
from django.views import View
from django.http import HttpResponse, JsonResponse
from .models import User
# Create your views here.

class joinView(View):
    def post(self,request):
        data = json.loads(request.body)
        id = data['userId']
        pw = data['password']
        name = data['name']
        
        try:
            #이미 등록된 아이디
            if User.objects.filter(userId = id).exists():
                return JsonResponse({"message":"exist id"}, status=409)
            User.objects.create(
                userId = id,
                name = name,
                password = pw,
                imageYN = 1,
                commentYN = 1
            )
            return JsonResponse({"message":"success"}, status=201)
        except KeyError:
            return JsonResponse({"message":"INVALID_KEYS"}, status=400)

class loginView(View):
    def post(self, request):
        data = json.loads(request.body)
        id = data['userId']
        pw = data['password']
        
        if User.objects.filter(userId = id).exists():
            user = User.objects.get(userId = id)
            if user.password == pw:
                sdata = {
                    "userId": id,
                    "name": user.name,
                    "imageYN": user.imageYN,
                    "commentYN": user.commentYN
                }
                return JsonResponse(sdata,status = 200)
            else :
                return JsonResponse({'message':'pw error'},status = 401)

        return JsonResponse({'message':'id error'},status=400)