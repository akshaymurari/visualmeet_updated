from django.contrib import admin
from .models import Student,Teacher,Link,Attendance,NotificationBlog

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

