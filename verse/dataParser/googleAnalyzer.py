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


    bookmarks = []
    bookmarks = data["bookmarks"]

    bookmarks.remove("Bookmark Bar")
    bookmarks.remove("Other Bookmarks")
    bookmarks.remove("Synced Bookmarks")

    ad_waffle_data = []
    ad_values = {}

    for i in data["ads_activity"]:
        pos = i[1].find(' ')
        month = i[1][:pos]

        month_num = ""

        if month == "Jan":
            month_num = "01"
        elif month == "Feb":
            month_num = "02"
        elif month == "Mar":
            month_num = "03"
        elif month == "Apr":
            month_num = "04"
        elif month == "May":
            month_num = "05"
        elif month == "Jun":
            month_num = "06"
        elif month == "Jul":
            month_num = "07"
        elif month == "Aug":
            month_num = "08"
        elif month == "Sep":
            month_num = "09"
        elif month == "Oct":
            month_num = "10"
        elif month == "Nov":
            month_num = "11"
        else:
            month_num = "12"

        comma = i[1].find(',')
        pos += 1
        day = i[1][pos:comma]

        day_str = day

        if int(day) < 10:
            day_str = "0" + str(day)

        comma = comma + 2
        new_str = i[1][comma:]

        comma = new_str.find(',')

        year = new_str[:comma]

        full_date = year + "-" + month_num + "-" + day_str

        if full_date in ad_values:
            ad_values[full_date] += 1
        else:
            ad_values[full_date] = 1

        
    for i in ad_values:
        ad_waffle_data.append({"day": i, "value": ad_values[i]})

    
    Dict["ad_waffle_data"] = ad_waffle_data

    Dict["ads_timeline"] = data["ads_activity"]
    Dict["maps_timeline"] = data["maps_activity"]
    Dict["search_timeline"] = data["search_activity"]

    google_search_waffle_data = []
    google_search_values = {}

    for i in data["search_activity"]["searches"]:
        pos = i[2].find(' ')
        month = i[2][:pos]

        month_num = ""

        if month == "Jan":
            month_num = "01"
        elif month == "Feb":
            month_num = "02"
        elif month == "Mar":
            month_num = "03"
        elif month == "Apr":
            month_num = "04"
        elif month == "May":
            month_num = "05"
        elif month == "Jun":
            month_num = "06"
        elif month == "Jul":
            month_num = "07"
        elif month == "Aug":
            month_num = "08"
        elif month == "Sep":
            month_num = "09"
        elif month == "Oct":
            month_num = "10"
        elif month == "Nov":
            month_num = "11"
        else:
            month_num = "12"

        comma = i[2].find(',')
        pos += 1
        day = i[2][pos:comma]

        day_str = day

        if int(day) < 10:
            day_str = "0" + str(day)

        comma = comma + 2
        new_str = i[2][comma:]

        comma = new_str.find(',')

        year = new_str[:comma]

        full_date = year + "-" + month_num + "-" + day_str

        if full_date in google_search_values:
            google_search_values[full_date] += 1
        else:
            google_search_values[full_date] = 1

        
    for i in google_search_values:
        google_search_waffle_data.append({"day": i, "value": google_search_values[i]})

    
    Dict["google_search_waffle_data"] = google_search_waffle_data

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
        if count == 10:
            break
        else:
            pie_format_chan.append({"id": count, "label": i[0], "value": i[1]})
            count += 1

    Dict["youtube_pie_chart"] = pie_format_chan

    youtube_search_waffle_data = []
    youtube_search_values = {}

    for i in data["youtube_activity"]["searches"]:
        pos = i[2].find(' ')
        month = i[2][:pos]

        month_num = ""

        if month == "Jan":
            month_num = "01"
        elif month == "Feb":
            month_num = "02"
        elif month == "Mar":
            month_num = "03"
        elif month == "Apr":
            month_num = "04"
        elif month == "May":
            month_num = "05"
        elif month == "Jun":
            month_num = "06"
        elif month == "Jul":
            month_num = "07"
        elif month == "Aug":
            month_num = "08"
        elif month == "Sep":
            month_num = "09"
        elif month == "Oct":
            month_num = "10"
        elif month == "Nov":
            month_num = "11"
        else:
            month_num = "12"

        comma = i[2].find(',')
        pos += 1
        day = i[2][pos:comma]

        day_str = day

        if int(day) < 10:
            day_str = "0" + str(day)

        comma = comma + 2
        new_str = i[2][comma:]

        comma = new_str.find(',')

        year = new_str[:comma]

        full_date = year + "-" + month_num + "-" + day_str

        if full_date in youtube_search_values:
            youtube_search_values[full_date] += 1
        else:
            youtube_search_values[full_date] = 1

        
    for i in youtube_search_values:
        youtube_search_waffle_data.append({"day": i, "value": youtube_search_values[i]})

    
    Dict["youtube_search_waffle_data"] = youtube_search_waffle_data

    #write analyzed data dictionary to json file
    genericParser.writeToJsonFile(Dict, "./media/processedData/google/" + googleUserFileName + "/analyzedGoogleData.json")

"""
def main():
    root = "google-lisa"
    analyzeGoogleData(root)

if __name__ == "__main__":
    main() 
"""