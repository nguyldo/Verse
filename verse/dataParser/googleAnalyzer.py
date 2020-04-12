#!/usr/bin/env python3

import os
import pandas as pd
import numpy as np
import operator

#TODO: uncomment first if running through django and second if through python
#from dataParser import genericParser
import genericParser

def analyzeGoogleData(googleUserFileName):
    #TODO: uncomment first if running through django and second if through python
    data = genericParser.getParsedJson("./media/processedData/google/" + googleUserFileName + "/parsedGoogleData.json")
    #data = genericParser.getParsedJson("../media/processedData/google/" + googleUserFileName + "/parsedGoogleData.json")

    Dict = {}

    Dict["total_size_bignum"] = data["totalSizeInGB"]

    Dict["personal_info_header"] = data["profile_info"]

    Dict["bookmarks_list"] = data["bookmarks"]
    Dict["saved_places_map"] = data["saved_places"]

    Dict["ads_timeline"] = data["ads_activity"]
    Dict["maps_timeline"] = data["maps_activity"]
    Dict["search_timeline"] = data["search_activity"]
    Dict["youtube_timeline"] = data["youtube_activity"]

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