"""backend_django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from webapi import views
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register('NotificationBlogG',views.NotificationBlogG,basename='notifications')
router.register('PostQueryQ',views.QueryBlogQ,basename='querypost') 


urlpatterns = [
    path("",include(router.urls)),
    path("getmyposts/",views.getmyposts.as_view()),
    path("AddQuery/",views.AddQuery.as_view()),
    path("deletequery/",views.deletequery.as_view()),
    path("AddQuery/<str:pk>/",views.AddQuery.as_view()),
    path("getQuery/",views.AddQuery.as_view()),
    path("AddEvents/",views.AddEvents.as_view()),
    path("EventsBlog/",views.EventsBlog.as_view()),
    path("subWiseAttendance/",views.subWiseAttendance.as_view()),
    path("getsubjects/",views.getSubjects.as_view()),
    path("attendpercentage/",views.attendPercentage.as_view()),
    path("onSearchLinkBlog/",views.onSearchLinkBlog.as_view()),
    path("getlinks/",views.getLinks.as_view()),
    path('getNotifications/',views.getnotification.as_view()),
    path("getnotificationLen/",views.getnotificationLen.as_view()),
    path('uploadattendance/',views.uploadAttendance.as_view()),
    path('getNotificationResponse/',views.getNotificationResponse.as_view()),
    path("login/",views.Login.as_view(), name="login"),
    path("verifytoken/",views.VerifyToken.as_view(), name="verifytoken"),
    path("addlink/",views.AddLink.as_view(), name="addlink"),
    path("deletelink/<str:pk>/",views.LinksByUsername.as_view(),name="deletelink"),
    path("attendanceBlog/",views.getAttendance,name="attendanceblog"),
    path("postattendance/",views.AttendanceBlog.as_view(),name="postattendance"),
    path("getlink/",views.GetLink, name="GetLinks"),
    path('admin/', admin.site.urls),
]
