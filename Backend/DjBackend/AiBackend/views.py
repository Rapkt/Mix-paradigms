from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from Helpers import models


# Create your views here.
def Reccomend_View(request: HttpRequest):
    if request.method == "POST":
        data = request.POST
        AIrequest = models.AIRequest(
            name = data.get("name"),
            profession = data.get("profession"),
            prerequisits = data.get("prerequisits"),
        )
