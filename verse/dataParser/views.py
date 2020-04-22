#!/usr/bin/env python3

from django.shortcuts import render
from django.http import HttpResponse
from django.template import Context, loader
from django.core.files.storage import FileSystemStorage, default_storage
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
import os

import zipfile 

from dataParser import visualizationData, genericParser
from dataParser import facebookParser, appleParser, googleParser, facebookAnalyzer, googleAnalyzer, netflixParser

def index(request):
    if request.session.test_cookie_worked():
        print("The test cookie worked!!!")
        request.session.delete_test_cookie()

    template = loader.get_template("index.html")
    return HttpResponse(template.render())

#----- FACEBOOK APIs -----

@api_view(["GET"])
def facebookDataAPI(request, userFileName):
    data = visualizationData.getAnalyzedFacebookData(userFileName)
    genericParser.deleteData("./media/unzippedFiles/facebook/" + userFileName)
    return Response(status=status.HTTP_200_OK, data={"data": data})
    
#----- APPLE APIs -----

@api_view(["GET"])
def appleDataAPI(request, userFileName):
    data = visualizationData.getAppleData(userFileName)
    genericParser.deleteData("./media/unzippedFiles/apple/" + userFileName)
    return Response(status=status.HTTP_200_OK, data={"data": data})

#----- GOOGLE APIs -----

@api_view(["GET"])
def googleDataAPI(request, userFileName):
    data = visualizationData.getAnalyzedGoogleData(userFileName)
    genericParser.deleteData("./media/unzippedFiles/google/" + userFileName)
    return Response(status=status.HTTP_200_OK, data={"data": data})

#----- NETFLIX APIs -----
@api_view(["GET"])
def netflixDataAPI(request, userFileName):
    data = visualizationData.getAnalyzedNetflixData(userFileName)
    return Response(status=status.HTTP_200_OK, data={"data": data})

#----- UPLOAD API -----

@api_view(["POST"])
def upload(request):
    request.session.set_test_cookie()

    # WHEN A FILE IS UPLOADED, A POST REQUEST IS MADE AND THIS CODE IS RUN #
    if request.method == "POST":

        serviceName = request.data.get("company")
        uploadedFiles = request.data.get("files")
        userId = request.session.session_key

        # save and unzip files
        fss = FileSystemStorage()

        #print("Debug: " + uploadedFiles)
        #for uploadedFile in uploadedFiles:
        #    fss.save(uploadedFile.name, uploadedFile)

        if serviceName != "netflix":
            fss.save(uploadedFiles.name, uploadedFiles)

            #dev-connectAPIs
            zipPath = fss.location + "/" + uploadedFiles.name
            mediaDirPath = fss.location + "/unzippedFiles/" + serviceName + "/" + uploadedFiles.name[:-4]

            # from: https://stackoverflow.com/questions/3451111/unzipping-files-in-python #
            with zipfile.ZipFile(zipPath, "r") as zip_ref:
                zip_ref.extractall(mediaDirPath)        
        else:
            mediaDirPath = fss.location + "/unzippedFiles/" + serviceName
            fss = FileSystemStorage(location=mediaDirPath)
            fss.save(uploadedFiles.name, uploadedFiles)


        # call the parser corresponding to the service
        fileName = ""
        if serviceName == "facebook":
            fileName = uploadedFiles.name[:-4]
            facebookParser.parseFacebookData(fileName)
            facebookAnalyzer.analyzeFacebookData(fileName)

        elif serviceName == "apple":
            # take all the uploaded files and put it in another directory
            # TODO: multi file support for sprint 3
            """
            newDirName = "apple-" + userId
            os.makedirs(newDirName)
            
            for uploadedFile in uploadedFiles:
                currPath = fss.location + "/unzippedFiles/" + serviceName + "/" + uploadedFiles.name[:-4]
                newPath = fss.location + "/unzippedFiles/" + serviceName + "/" + newDirName + "/" + uploadedFiles.name[:-4]
                os.rename(currPath, newPath)

            fileName = newDirName
            """

            fileName = uploadedFiles.name[:-4]
            appleParser.parseAppleData(fileName)

        elif serviceName == "netflix":
            fileName = uploadedFiles.name
            netflixParser.parseNetflixData(fileName)

        elif serviceName == "google":
            fileName = uploadedFiles.name[:-4]
            googleParser.parseGoogleData(fileName)
            googleAnalyzer.analyzeGoogleData(fileName)

        else: print("service name not recognized")

        fss.delete(uploadedFiles.name)

        #TODO: implement progress bar on frontend

        print(fileName)
        return Response(status=status.HTTP_200_OK, data={"fileName" : fileName})