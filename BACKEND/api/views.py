from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
from django.http import JsonResponse

def hello(request):
    return JsonResponse({"message": "Hello World"})

def login(request, user_identifier):
    return JsonResponse(request.body)
