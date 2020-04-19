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

    Dict["total_size_bignum"] = data["totalSizeInGB"]

    Dict["personal_info_header"] = data["profile_info"]

    bookmarks = []
    bookmarks = data["bookmarks"]

    bookmarks.remove("Bookmark Bar")
    bookmarks.remove("Other Bookmarks")
    bookmarks.remove("Synced Bookmarks")

    Dict["bookmarks_list"] = bookmarks

    Dict["saved_places_map"] = data["saved_places"]

    Dict["ads_timeline"] = data["ads_activity"]
    Dict["maps_timeline"] = data["maps_activity"]
    Dict["search_timeline"] = data["search_activity"]

    year = {}

    for i in data["search_activity"]["searches"]:
        pos = i[2].find(' ')
        month = i[2][:pos]

        if month in year:
            year[month] += 1
        else:
            year[month] = 1
    
    line_data = [{"x": "Jan", "y": year["Jan"]},
                 {"x": "Feb", "y": year["Feb"]},
                 {"x": "Mar", "y": year["Mar"]},
                 {"x": "Apr", "y": year["Apr"]},
                 {"x": "May", "y": year["May"]},
                 {"x": "Jun", "y": year["Jun"]},
                 {"x": "Jul", "y": year["Jul"]},
                 {"x": "Aug", "y": year["Aug"]},
                 {"x": "Sep", "y": year["Sep"]},
                 {"x": "Oct", "y": year["Oct"]},
                 {"x": "Nov", "y": year["Nov"]},
                 {"x": "Dec", "y": year["Dec"]}]

    line_format_year = [{"id": "year", "color": "hsl(327, 70%, 50%)", "data": line_data}]
    

    Dict["line_year_searches"] = line_format_year

    Dict["youtube_timeline"] = data["youtube_activity"]

    channels = {}

    for i in data["youtube_activity"]["watches"]:
        if i[2] in channels:
            channels[i[2]] += 1
        else:
            channels[i[2]] = 1

    sorted_chan = sorted(channels.items(), reverse=True, key=operator.itemgetter(1))

    pie_format_chan = []

    count = 0
    for i in sorted_chan:
        pie_format_chan.append({"id": count, "label": i[0], "value": i[1]})
        count += 1

    Dict["youtube_pie_chart"] = pie_format_chan

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