from django.shortcuts import render
from django.http import HttpResponse
from django.template import Context, loader
from django.core.files.storage import FileSystemStorage, default_storage
from dataParser import facebookParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view


# from django.contrib messages
import zipfile # this module allows us to easily unzip items
#from pprint import pprint

# Create your views here.

def index(request):
    template = loader.get_template("index.html")
    return HttpResponse(template.render())

@api_view(["GET"])
def testApi(request):
    str = "This request worked :))"
    return Response(status=status.HTTP_200_OK, data={"data": str})


@api_view(["POST"])
def upload(request):

    # WHEN A FILE IS UPLOADED, A POST REQUEST IS MADE AND THIS CODE IS RUN #
    if request.method == "POST":

        uploadedFile = request.data.get("file")
        #return Response(status=status.HTTP_200_OK, data={request.data.get("filename")})
        #try:
        #    uploadedFile = request.FILES["document"]
        #except:
        #    return render(request, "upload.html")
        
        # print(uploadedFile.read())
        # print(uploadedFile.read().decode("utf-8"))  <-- THIS LINE PRINTS OUT THE UPLOADED FILE

        # FileSystemStorage modules from Django #
        # Documentation can be found here: https://docs.djangoproject.com/en/3.0/ref/files/storage/ #
        fss = FileSystemStorage()
        fss.save(uploadedFile.name, uploadedFile)
        zipfileLocation = fss.location + "/" + uploadedFile.name

        #TODO: implement progress bar on frontend

        # find name of company
        nameOfCompany = ""
        if uploadedFile.name.find("facebook") >= 0:
            nameOfCompany = "facebook"
        # as more parsers are added, more companies will be accounted for here


        # IMPLEMENTATION FOUND HERE: https://stackoverflow.com/questions/3451111/unzipping-files-in-python #
        with zipfile.ZipFile(zipfileLocation, "r") as zip_ref:
            zip_ref.extractall(fss.location + "/" +  "/unzippedFiles/" + nameOfCompany + "/" + uploadedFile.name[:-4])

        default_storage.delete(uploadedFile.name)

        counter = 0
        for i in uploadedFile.name:
            counter = counter + 1
            if i == 'f' :
                break
            
        counter = counter - 1
        fileName = uploadedFile.name[counter:-4]

        facebookParser.parseFacebookData(fileName)

    return Response(status=status.HTTP_200_OK, data={"Success :)"})
    # return render(request, "upload.html