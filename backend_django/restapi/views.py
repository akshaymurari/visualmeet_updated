from django.shortcuts import render
from .models import Student,Teacher,Link,Attendance,NotificationBlog
from .serializers import StudentS,TeacherS,LinkS,AttendanceS,NotificationBlogS
from django.http import JsonResponse,HttpResponse
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
import jwt
from rest_framework import  viewsets 
from rest_framework.permissions import DjangoModelPermissions,IsAdminUser
from .secret import secret_key
import json
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt


def auth(data):
    try:
        if data["type"]=="student" and (not data["onlyteacher"]):
            value = jwt.decode(data["token"],secret_key,algorithms=["HS256"])
            print(value)
            if Student.objects.filter(username=value["username"],password=value["password"]):
                return True
            else:
                return False
        elif data["type"]=="teacher":
            value = jwt.decode(data["token"],secret_key,algorithms=["HS256"])
            print(value)
            if Teacher.objects.filter(username=value["username"],password=value["password"]):
                return True
            else:
                return False
    except:
        return False


class Login(APIView):
    def post(self,request):
        data = request.data
        try:
            if data["type"]=="teacher":
                user = Teacher.objects.get(username=data["username"],password=data["password"])
                user = TeacherS(user)
                token = jwt.encode(user.data,secret_key,algorithm="HS256")
                return JsonResponse({"token":token},status=200)
            elif data["type"]=="student":
                user = Student.objects.get(username=data["username"],password=data["password"])
                user = StudentS(user)
                token = jwt.encode(user.data,secret_key,algorithm="HS256")
                return JsonResponse({"token":token},status=200)
            else:
                return JsonResponse({"msg":"invalid details"},status=400)
        except:
            return JsonResponse({"msg":"invalid details"},status=400)


class VerifyToken(APIView):
    # authentication_classes = [TokenAuthentication]
    def post(self,request):
        data = request.data
        try:
            if data["type"]=="student":
                value = jwt.decode(data["token"],secret_key,algorithms=["HS256"])
                print(value)
                if Student.objects.filter(username=value["username"],password=value["password"]).exists():
                    return JsonResponse(value,status=200)
                else:
                    return JsonResponse({"msg":"invalid token"},status=400)
            elif data["type"]=="teacher":
                value = jwt.decode(data["token"],secret_key,algorithms=["HS256"])
                print(value)
                if Teacher.objects.filter(username=value["username"],password=value["password"]):
                    return JsonResponse(value,status=200)
                else:
                    return JsonResponse({"msg":"invalid token"},status=400)
        except:
            return JsonResponse({"msg":"invalid token"},status=400)


class AddLink(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        try:
            data = request.data
            print(data)
            value = auth({"token":request.data["token"],"type":request.data["type"],"onlyteacher":True})
            print(data,value)
            if value:
                instance = Teacher(username=data["username"])
                user = Link(username=instance,link=data["link"],subject=data["subject"],section=data["section"],start_at=data["start_at"],attendance_status=0)
                user.save()
                return JsonResponse({"msg":"success"},status=200)
            else:
                return JsonResponse({"msg":"invalid token"},status=400)
        except:
            return JsonResponse({"msg":"invalid token"},status=400)

class LinksByUsername(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        try:
            user = request.data["username"]
            print(user)
            value = auth({"token":request.data["token"],"type":request.data["type"],"onlyteacher":True})
            print(user,value)
            if value:
                data = Link.objects.get_queryset(username_id=user)
                serializer = LinkS(data,many=True)
                print(serializer.data)
                return JsonResponse({"msg":"success"},status=200)
            else:
                return JsonResponse({"msg":"invalid token"},status=400)
        except:
            return JsonResponse({"msg":"invalid token"},status=400)
    def delete(self,request,pk):
        value = auth({"token":request.data["token"],"type":request.data["type"],"onlyteacher":True})
        if value:
            print(value,request.data)
            obj = Link.objects.get(id=pk)
            obj.delete()
            return JsonResponse({"msg":"success"},status=200)
        else:
            return JsonResponse({"msg":"invalid token"},status=400)

@csrf_exempt
def GetLinks(request):
    if request.method == "POST" or request.method == "post":
        try:
            print(request.body)
            data = json.loads(request.body)
            print(data)
            value = auth({"token":data["token"],"type":data["type"],"onlyteacher":True})
            if value:
                date=datetime.now().strftime("%Y-%m-%d")
                obj = Link.objects.filter(username=data["username"],start_at__startswith=date)
                serializer = LinkS(obj,many=True)
                return JsonResponse(serializer.data,safe=False,status=200)
            else:
                return JsonResponse({"msg":"invalid"},status=400)
        except:
            return JsonResponse({"msg":"invalid"},status=400)
    else:
        print("ggk")
        return JsonResponse({"msg":"invalid"},status=400)


class AttendanceBlog(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        data = request.data
        value = auth({"token":data["token"],"type":data["type"],"onlyteacher":True})
        print(request.data)
        if value:
            for i in data.data:
                obj = Attendance(username=request.data["username"],subject=request.data["subject"],section=request.data["section"],present=request.data["present"])
                obj.save()
            return JsonResponse({"msg":"success"},status=200)
        else:
            return JsonResponse({"msg":"invalid"},status=400)

@csrf_exempt
def getAttendance(request):
    data = json.loads(request.body)
    print(data)
    value = auth({"token":data["token"],"type":data["type"],"onlyteacher":True})
    ans = []
    if value:
        obj = Student.objects.filter(section=data["section"])
        serializer = StudentS(obj,many=True)
        print(serializer.data)
        total_classes = len(Link.objects.filter(subject=data["subject"],attendance_status=1))
        for i in serializer.data:
            username = i["username"]
            obj = Attendance.objects.filter(username=i["username"],present=True,subject=data["subject"])
            ans.append({"id":i["username"],"total_classes":total_classes,"total_classes_attended":len(obj),"section":data["section"]})
        print(ans)
        return JsonResponse(ans,safe=False)

class NotificationBlogG(viewsets.ModelViewSet):
    queryset = NotificationBlog.objects.all()
    serializer_class = NotificationBlogS
    authentication_classes = [TokenAuthentication]
    permission_classes = [DjangoModelPermissions]

class getNotificationResponse(APIView):
    def post(self, request):
        ans=[]
        print(request.data)
        for i in request.data:
            if NotificationBlog.objects.filter(username=i["username"],seen=1,visibility_time=i["visibility_time"],title=i["title"]).exists():
                ans.append({"seen":True,"username":i["username"],"id":i["username"]})
            else:
                ans.append({"username":i["username"],"seen":False,"id":i["username"]})
        print(ans)
        return JsonResponse(ans,safe=False)    
    pass


class uploadAttendance(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        data = request.data
        print(data)
        
