from django.urls import path
from .views import hello
from . import views

urlpatterns = [
    path('helper/', hello, ),
    path('com.gamestart/v1/home/userauthentication/login/<str:user_identifier>', views.login, name='login'),
    path("com.gamestart/v1/home/userauthentication/register/<str:user_info>",views.register, name="register",),
    path("com.gamestart/v1/ai/recommendation", views.aichat_recommendation, name="ai_recommendation"),
    path("com.gamestart/v1/ai/models", views.list_groq_models, name="list_models"),
]
