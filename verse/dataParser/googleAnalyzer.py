#!/usr/bin/env python3

import os
import pandas as pd
import numpy as np
import operator

#TODO: uncomment first if running through django and second if through python
from dataParser import genericParser
#import genericParser

def analyzeGoogleData(googleUserFileName):
    #TODO: uncomment first if running through django and second if through python
    data = genericParser.getParsedJson("./media/processedData/google/" + googleUserFileName + "/parsedGoogleData.json")
    #data = genericParser.getParsedJson("../media/processedData/google/" + googleUserFileName + "/parsedGoogleData.json")

    Dict = {}

    inOut = {}
    inOut["totalSizeInGB"] = "total_size_bignum"
    inOut["profile_info"] = "personal_info_header"
    inOut["bookmarks"] = "bookmarks_list"
    inOut["saved_places"] = "saved_places_map"
    inOut["ads_activity"] = "ads_timeline"
    inOut["maps_activity"] = "maps_timeline"
    inOut["search_activity"] = "search_timeline"
    inOut["youtube_activity"] = "youtube_timeline"

    for key in inOut:
        if key in data.keys():
            Dict[key] = inOut[key]
        else: print(key + " does not exist in parsed data dictionary")

    #write analyzed data dictionary to json file
    genericParser.writeToJsonFile(Dict, "./media/processedData/google/" + googleUserFileName + "/analyzedGoogleData.json")
    #genericParser.writeToJsonFile(Dict, "../media/processedData/google/" + googleUserFileName + "/analyzedGoogleData.json")

"""
def main():
    root = "google-lisa"
    analyzeGoogleData(root)

if __name__ == "__main__":
    main() 
"""