#!/usr/bin/env python3

import json

# Function: get parsed data from json file 
def getJsonData(filePath):
    with open(filePath) as jsonFile:
        data = json.load(jsonFile)

    return data

# Function: get analyzed data from file
# Return: the json dictionary of the requested data
def getAnalyzedFacebookData(userFileName):
    
    data = getJsonData("media/processedData/facebook/" + userFileName + "/analyzedFacebookData.json")
    
    return data

def getAnalyzedAppleData(userFileName, dataCategory):
    data = {}
    if dataCategory == "general":
        data = getJsonData("media/processedData/apple/" + userFileName + "/analyzedGeneralAppleData.json")
        
    elif dataCategory == "music":
        data = getJsonData("media/processedData/apple/" + userFileName + "/analyzedMusicAppleData.json")
        
    elif dataCategory == "appsGames":    
        data = getJsonData("media/processedData/apple/" + userFileName + "/analyzedAppsGamesAppleData.json")
    
    else:
        print("data category name invalid")

    return data

def getAnalyzedGoogleData(userFileName):
    data = getJsonData("media/processedData/google/" + userFileName + "/analyzedGoogleData.json")

    return data