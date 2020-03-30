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

from dataParser import visualizationData
from dataParser import facebookParser, appleParser, facebookAnalyzer, appleAnalyzer

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
    return Response(status=status.HTTP_200_OK, data={"data": data})
    
#----- APPLE APIs -----

@api_view(["GET"])
def appleGeneralDataAPI(request, userFileName):
    data = visualizationData.getAnalyzedAppleData(userFileName, "general")
    return Response(status=status.HTTP_200_OK, data={"data": data})

@api_view(["GET"])
def appleMusicDataAPI(request, userFileName):
    data = visualizationData.getAnalyzedAppleData(userFileName, "music")
    return Response(status=status.HTTP_200_OK, data={"data": data})

@api_view(["GET"])
def appleAppsGamesDataAPI(request, userFileName):
    data = visualizationData.getAnalyzedAppleData(userFileName, "appsGames")
    return Response(status=status.HTTP_200_OK, data={"data": data})

#----- GOOGLE APIs -----


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
        fss.save(uploadedFiles.name, uploadedFiles)

        #dev-connectAPIs
        zipPath = fss.location + "/" + uploadedFiles.name
        mediaDirPath = fss.location + "/unzippedFiles/" + serviceName + "/" + uploadedFiles.name[:-4]        

            # from: https://stackoverflow.com/questions/3451111/unzipping-files-in-python #
        with zipfile.ZipFile(zipPath, "r") as zip_ref:
            zip_ref.extractall(mediaDirPath)        

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
            appleAnalyzer.analyzeGeneralAppleData(fileName)
            appleAnalyzer.analyzeMusicAppleData(fileName)
            appleAnalyzer.analyzeAppsGamesAppleData(fileName)

        #elif serviceName == "google":
        
        else: print("service name not recognized")


        #TODO: implement progress bar on frontend

        #default_storage.delete(uploadedFile.name)

        print(fileName)
        return Response(status=status.HTTP_200_OK, data={"fileName" : fileName})