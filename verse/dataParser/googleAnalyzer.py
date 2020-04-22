#!/usr/bin/env python3

import os
import pandas as pd
import numpy as np
import operator

from dataParser import genericParser

def analyzeGoogleData(googleUserFileName):
    data = genericParser.getParsedJson("./media/processedData/google/" + googleUserFileName + "/parsedGoogleData.json")

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

    for key in keys:
        if key in data.keys():
            Dict[key] = data[key]


    #write analyzed data dictionary to json file
    genericParser.writeToJsonFile(Dict, "./media/processedData/google/" + googleUserFileName + "/analyzedGoogleData.json")

"""
def main():
    root = "google-lisa"
    analyzeGoogleData(root)

if __name__ == "__main__":
    main() 
"""