from django.contrib import admin
from .models import Student,Teacher,Link,Attendance,NotificationBlog,Subject,Events,QueryBlog

@admin.register(Student)
class Student(admin.ModelAdmin):
    list_display=["username","password","section"]

@admin.register(Teacher)
class Teacher(admin.ModelAdmin):
    list_display=["username","password"]

@admin.register(Link)
class LinkAdmin(admin.ModelAdmin):
    list_display = ['username','link',"section",'subject','uploaded_on','start_at','attendance_status']

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ['username',"section",'subject','present','class_time']

@admin.register(NotificationBlog)
class NotificationBlogAdmin(admin.ModelAdmin):
    list_display = ['username',"seen",'title','description','visibility_time','posted_on']

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ['section','subject']

@admin.register(Events)
class EventAdmin(admin.ModelAdmin):
    list_display = ['EventName','EventDescription','posted_time','Event_on']

@admin.register(QueryBlog)
class QueryBlogAdmin(admin.ModelAdmin):
    list_display = ['title','description','room_type','password',"type","posted_by"]
