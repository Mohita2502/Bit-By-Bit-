from django.urls import path
from .views import hello, login

urlpatterns = [
    path('helper/', hello, ),
    path('com.gamestart/v1/home/userauthentication/login/<str:user_identifier>', login, ),
]
