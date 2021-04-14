from django.shortcuts import render
from .models import Student,Teacher,Link,Attendance,NotificationBlog,Subject,Events,QueryBlog
from .serializers import StudentS,TeacherS,LinkS,AttendanceS,NotificationBlogS,SubjectS,EventsS,QueryBlogS
from django.http import JsonResponse,HttpResponse
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
import jwt
from rest_framework import  viewsets 
from rest_framework.permissions import DjangoModelPermissions,IsAdminUser
from .secret import secret_key
import json
from datetime import datetime
from rest_framework.filters import SearchFilter,OrderingFilter
from rest_framework.pagination import PageNumberPagination
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from django.db.models import Q



def auth(data):
    try:
        if data["type"]=="student" and (not data["onlyteacher"]):
            value = jwt.decode(data["token"],secret_key,algorithms=["HS256"])
            print(value)
            if Student.objects.filter(username=value["username"],password=value["password"]):
                try:
                    if data["wantusername"] and data["wantsection"]:
                        return [True,value["section"],value["username"]]
                except:
                    try:
                        if data["wantusername"]:
                            return [True,value["username"]]
                    except:
                        try:
                            if data["wantsection"]:
                                return [True,value["section"]]
                        except:
                            return True
            else:
                return False
        elif data["type"]=="teacher":
            value = jwt.decode(data["token"],secret_key,algorithms=["HS256"])
            print(value)
            if Teacher.objects.filter(username=value["username"],password=value["password"]):
                try:
                    if data["wantusername"]:
                        return [True,value["username"]]
                except:
                    return True
            else:
                return False
    except:
        return False

class getmyposts(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        data = request.data
        if data["type"]=="teacher":
            value = auth({"token":data["token"],"type":"teacher","wantusername":True})
            if value[0]:
                obj = QueryBlog.objects.filter(posted_by=value[1])
                ans = QueryBlogS(obj,many=True)
                ans = ans.data
                p = Paginator(ans,data["records"])
                page = p.page(data["page"])
                result = page.object_list
                # print(result,p.count)
                return JsonResponse({"count":len(obj),"result":result},status=200)
        elif data["type"]=="student":
            value = auth({"token":data["token"],"type":"student","onlyteacher":False,"wantusername":True})
            if value[0]:
                obj = QueryBlog.objects.filter(posted_by=value[1])
                ans = QueryBlogS(obj,many=True)
                ans = ans.data
                p = Paginator(ans,data["records"])
                page = p.page(data["page"])
                result = page.object_list
                # print(result,p.count)
                return JsonResponse({"count":len(obj),"result":result},status=200)
        pass        



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
            elif data["type"]=="any":
                value = jwt.decode(data["token"],secret_key,algorithms=["HS256"])
                print(value)
                if Student.objects.filter(username=value["username"],password=value["password"]).exists():
                    return JsonResponse(value,status=200)
                else:
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
def GetLink(request):
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
            obj = NotificationBlog.objects.filter(username=i["username"],seen=1,visibility_time=i["visibility_time"],title=i["title"])
            if obj.exists():
                obj.delete()
                ans.append({"seen":True,"username":i["username"],"id":i["username"]})
            else:
                ans.append({"username":i["username"],"seen":False,"id":i["username"]})
        print(ans)
        return JsonResponse(ans,safe=False)    
    pass


class uploadAttendance(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        data = request.data["rows"]
        value = auth({"token":request.data["token"],"type":request.data["type"],"onlyteacher":True})
        print(data)
        if value:
            for i in data:
                print(data)
                obj = Attendance(username_id=i["id"],section=i["section"],subject=i["subject"],present=i["present"],class_time=i["class_time"])
                obj.save()
            try:
                obj = Link.objects.get(id=request.data["id"])
                obj.attendance_status=True
                obj.save()
                try:
                    obj = Subject(section=i["section"],subject=i["subject"])
                    obj.save()
                except:
                    pass
            except:
                for i in data:
                    obj = Attendance(username_id=i["id"],section=i["section"],subject=i["subject"],present=i["present"],class_time=i["class_time"])
                    obj.delete()
                return JsonResponse({"msg":"success"},status=400)
            return JsonResponse({"msg":"success"},status=200)


class getnotification(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self, request):
        data = request.data
        value = auth({"token":data["token"],"type":data["type"],"onlyteacher":False,"wantusername":True})
        if value[0]:
            obj = NotificationBlog.objects.filter(seen=False,username=value[1])
            ans = NotificationBlogS(obj,many=True)
            for i in obj:
                i.seen=True
                i.save()
            print(ans.data)
            return JsonResponse(ans.data,status=200,safe=False)


class getnotificationLen(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        data = request.data
        value = auth({"token":data["token"],"type":data["type"],"onlyteacher":False,"wantusername":True})
        if value[0]:
            obj = NotificationBlog.objects.filter(seen=False,username=value[1])
            ans = NotificationBlogS(obj,many=True)
            print(ans.data)
            return JsonResponse(ans.data,status=200,safe=False)

class getLinks(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        data = request.data
        value = auth({"token":data["token"],"type":data["type"],"onlyteacher":False,"wantsection":True})
        if value[0]:
            date = datetime.now().strftime("%Y-%m-%d")
            obj = Link.objects.filter(section=value[1],start_at__startswith=date)
            ans = LinkS(obj,many=True)
            return JsonResponse(ans.data,safe=False,status=200)


class onSearchLinkBlog(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        data = request.data
        value = auth({"token":data["token"],"type":data["type"],"onlyteacher":False,"wantsection":True})
        if value[0]:
            print(request.data)
            obj = Link.objects.filter(subject__contains=request.data["subject"],section=value[1])
            serializer = LinkS(obj,many=True)
            print(serializer.data)
            return JsonResponse(serializer.data,safe=False,status=200)
            pass

class attendPercentage(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        data = request.data
        value = auth({"token":data["token"],"type":data["type"],"onlyteacher":False,"wantsection":True,"wantusername":True})
        if value[0]:
            total_classes = len(Link.objects.filter(section=value[1],attendance_status=True))
            total_classes_attended = len(Attendance.objects.filter(username=value[2],present=True))
            return JsonResponse({"total_classes":total_classes,"total_classes_attended":total_classes_attended},status=200)


class getSubjects(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        data = request.data
        value = auth({"token":data["token"],"type":data["type"],"onlyteacher":False,"wantsection":True,"wantusername":True})
        if value[0]:
            obj = Subject.objects.filter(section=value[1])
            ans = SubjectS(obj,many=True)
            return JsonResponse(ans.data,safe=False,status=200)

class subWiseAttendance(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        data = request.data
        value = auth({"token":data["token"],"type":data["type"],"onlyteacher":False,"wantsection":True,"wantusername":True})
        if value[0]:
            classesTaken = len(Link.objects.filter(subject=data["subject"],section=value[1],attendance_status=True))
            classsesAttended = len(Attendance.objects.filter(subject=data["subject"],section=value[1],present=True))
            return JsonResponse({"classsesAttended":classsesAttended,"classesTaken":classesTaken},status=200)

class EventsBlog(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        data = request.data
        if data["type"]=="teacher":
            value = auth({"token":data["token"],"type":"teacher"})
            if value:
                obj = Events.objects.all()
                ans=EventsS(obj,many=True)
                return JsonResponse(ans.data,safe=False,status=200)
        elif data["type"]=="student":
            value = auth({"token":data["token"],"type":"student","onlyteacher":False})
            if value:
                obj = Events.objects.all()
                ans=EventsS(obj,many=True)
                return JsonResponse(ans.data,safe=False,status=200)
            
class AddEvents(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        data = request.data
        value = auth({"token":data["token"],"type":"teacher"})
        if value:
            obj = Events(Event_on=data["Event_on"],EventName=data["EventName"],EventDescription=data["EventDescription"])
            obj.save()
            return JsonResponse({"msg":"success"},status=200)


class AddQuery(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        data = request.data
        print(data)
        if data["password"]=="":
            data["password"]="p"
        if data["type"]=="teacher":
            value = auth({"token":data["token"],"type":"teacher","wantusername":True})
            if value[0]:
                obj = QueryBlog(title=data["title"],description=data["description"],room_type=data["room_type"],password=data["password"],posted_by=value[1],type=data["type"])
                obj.save()
                return JsonResponse({"msg":"success"},status=200)
        elif data["type"]=="student":
            value = auth({"token":data["token"],"type":"student","onlyteacher":False,"wantusername":True})
            if value[0]:
                obj = QueryBlog(title=data["title"],description=data["description"],room_type=data["room_type"],password=data["password"],type=data["type"],posted_by=value[1])
                obj.save()
                return JsonResponse({"msg":"success"},status=200)
    def get(self,request,pk):
        data = pk
        obj = QueryBlog.objects.filter(title=data).exists()
        if obj:
            return JsonResponse({"msg":"title exists"},status=200)
        else:
            return JsonResponse({"msg":"ok"},status=400)
    def delete(self,request):
        data = request.data
        

class getQuery(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        data = request.data
        if data["type"]=="teacher":
            value = auth({"token":data["token"],"type":"teacher"})
            if value:
                obj = QueryBlog.objects.all()
                obj = QueryBlogS(obj,many=True)
                return JsonResponse(obj.data,safe=False,status=200)
        elif data["type"]=="student":
            value = auth({"token":data["token"],"type":"student","onlyteacher":False,"wantusername":True})
            if value[0]:
                obj = QueryBlog.objects.filter(Q(posted_by=value[1])|Q(room_type="public")|Q(room_type="secret"))
                obj = QueryBlogS(obj,many=True)
                return JsonResponse(obj.data,safe=False,status=200)

class Page(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'pagerecords'


class GetQueryQ(viewsets.ModelViewSet):
    serializer_class = QueryBlogS
    authentication_classes = [TokenAuthentication]
    permission_classes = [DjangoModelPermissions]
    filter_backends = [SearchFilter]
    search_fields = ['posted_by','type','title']
    pagination_class = Page
    def get_queryset(self):
        print(self.kwargs)
        return QueryBlog.objects.filter(posted_by=self.kwargs['pk'])

class QueryBlogQ(viewsets.ModelViewSet):
    queryset = QueryBlog.objects.all()
    serializer_class = QueryBlogS
    authentication_classes = [TokenAuthentication]
    permission_classes = [DjangoModelPermissions]
    filter_backends = [SearchFilter]
    search_fields = ['title','posted_by','type','description']
    pagination_class = Page


class deletequery(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        data = request.data
        value = auth({"token":data["token"],"type":"teacher"})
        if value:
            obj = QueryBlog(title=data["title"])
            obj.delete()
            return JsonResponse({"msg":"success"},status=200)

# class postquestion(viewsets.ModelViewSet):
#     authentication_classes = [TokenAuthentication]
#     def post(self,request):
#         data = request.data
#         if data["type"]=="teacher":
#             value = auth({"token":data["token"],"type":"teacher"})
#             if value:
#                 pass
#         elif data["type"]=="student":
#             value = auth({"token":data["token"],"type":"student","onlyteacher":False})
#             if value:
#                 pass
