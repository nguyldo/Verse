#!/usr/bin/env python3

import json

# Function: get parsed data from json file 
def getJsonData(filePath):
    with open(filePath) as jsonFile:
        data = json.load(jsonFile)

    return data

# Function: get analyzed data from file
# Return: the json dictionary of the requested data
def getFacebookData(userFileName):
    data = getJsonData("media/processedData/facebook/" + userFileName + "/analyzedFacebookData.json")
    return data

def getAppleData(userFileName):
    data = getJsonData("media/processedData/apple/" + userFileName + "/parsedAppleData.json")
    return data

def getGoogleData(userFileName):
    data = getJsonData("media/processedData/google/" + userFileName + "/analyzedGoogleData.json")
    return data

def getNetflixData(userFileName):
    data = getJsonData("media/processedData/netflix/" + userFileName)
    return data