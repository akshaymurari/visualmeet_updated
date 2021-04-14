from rest_framework import serializers
from .models import Student,Teacher,Link,Attendance,NotificationBlog

class StudentS(serializers.ModelSerializer):
    class Meta:
        model=Student
        fields = "__all__"

class TeacherS(serializers.ModelSerializer):
    class Meta:
        model=Teacher
        fields = "__all__"

class LinkS(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = "__all__"

class AttendanceS(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = "__all__"

class NotificationBlogS(serializers.ModelSerializer):
    class Meta:
        model = NotificationBlog
        fields = "__all__"