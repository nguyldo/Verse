from django.shortcuts import render
from django.http import HttpResponse
from django.template import Context, loader
#from pprint import pprint

# Create your views here.

def index(request):
    template = loader.get_template("index.html")
    return HttpResponse(template.render())

def upload(request):
    if request.method == "POST":
        uploadedFile = request.FILES["document"]
        #print(uploadedFile.read())
        print(uploadedFile.read().decode("utf-8"))
    return render(request, "upload.html")