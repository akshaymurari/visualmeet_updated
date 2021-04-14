from django.db import models
from datetime import datetime

class Student(models.Model):
    username = models.CharField(max_length=50,default="",primary_key=True)
    password = models.CharField(max_length=100,default="")
    section = models.CharField(max_length=30)

class Teacher(models.Model):
    username = models.CharField(max_length=50,default="",primary_key=True)
    password = models.CharField(max_length=100,default="")

class Link(models.Model):
    username = models.ForeignKey(Teacher,on_delete=models.PROTECT)
    link = models.CharField(max_length=255,default="")
    subject = models.CharField(max_length=30,default="")
    section = models.CharField(max_length=30,default="")
    uploaded_on = models.DateTimeField(auto_now_add=True)
    start_at = models.DateTimeField(default="")
    attendance_status = models.BooleanField(default=False)

class Attendance(models.Model):
    username = models.ForeignKey(Student,on_delete=models.CASCADE)
    subject = models.CharField(max_length=30,default="")
    section = models.CharField(max_length=30,default="")
    present = models.BooleanField(default=False)
    class_time = models.CharField(default=None,max_length=20)

class NotificationBlog(models.Model):
    username = models.CharField(max_length=100)
    seen = models.BooleanField(default=False)
    title = models.CharField(max_length=255,default=None)
    description = models.TextField(default=None)
    visibility_time = models.DateTimeField(default=None)
    posted_on = models.DateTimeField(auto_now_add=True)
