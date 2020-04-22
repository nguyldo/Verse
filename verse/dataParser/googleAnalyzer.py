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

    keys = ["total_size_GB", 
            "profile_info_header",
            "bookmarks_list",
            "saved_places_map",
            "youtube_playlists",
            "youtube_subscriptions",
            "ads_activity",
            "maps_activity",
            "search_activity",
            "youtube_activity"]

    print("Google:\n\tparser keys:\n\t\t")
    print(data.keys())
    print("\n\t\tanalyzer keys:\n\t\t")
    print(keys)

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