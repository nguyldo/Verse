from django.shortcuts import render
from django.http import HttpResponse
from django.template import Context, loader
from django.core.files.storage import FileSystemStorage
#from pprint import pprint

# Create your views here.

def index(request):
    template = loader.get_template("index.html")
    return HttpResponse(template.render())

def upload(request):
    if request.method == "POST":
        uploadedFile = request.FILES["document"]
        # print(uploadedFile.read())
        # print(uploadedFile.read().decode("utf-8"))  <-- THIS LINE PRINTS OUT THE UPLOADED FILE
        fss = FileSystemStorage()
        fss.save(uploadedFile.name, uploadedFile)
    return render(request, "upload.html")