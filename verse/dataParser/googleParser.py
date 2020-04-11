#!/usr/bin/env python3

import os
import string
import sqlite3 as lite 
from sqlite3 import Error

import pandas as pd
from bs4 import BeautifulSoup

#TODO: uncomment first if running through django and second if through python
#from dataParser import genericParser  
import genericParser

# Function: extracts json data from the root directory of facebook data 
# Return: a dictionary with parsed data
def parseGoogleData(googleDataDumpName): 
    # Define dictionary to map json data to
    Dict = {}   

    # Define tuple to store root directory names of interest
    rootCategoriesOfInterest = ("Bookmarks", "Chrome", "Maps (your places)", 
                                    "My Activity", "Profile", "Saved", "YouTube")

    # Parse through apple media root directory
    #TODO: uncomment first if running through django and second if through python
    #rootPathName = "./media/unzippedFiles/google/" + googleDataDumpName
    rootPathName = "../media/unzippedFiles/google/" + googleDataDumpName
    
    if os.path.exists(rootPathName):
        # Get total size
        Dict["totalSizeInGB"] = genericParser.getDirSizeInGB(rootPathName)
        #TODO: double check, this number doesn't make sense

        for root, dirs, files in genericParser.walklevel(rootPathName, level=1):
            categoryDirName = root.rsplit('/', 1)[-1]

            # if category is valid,
            # add data of interest to dictionary
            dirPath = rootPathName + "/" + categoryDirName

            if any(categoryDirName in category for category in rootCategoriesOfInterest) and os.path.exists(dirPath):
                
                if categoryDirName == "Bookmarks":
                    # -----  -----
                    file_bookmarks = dirPath + "/Bookmarks.html"

                    with open(file_bookmarks, "rb") as infile:
                        soup = BeautifulSoup(infile,'lxml')

                        key_bookmarks = soup.title.text

                        places = soup.find_all("dl")[0].get_text()
                        places = places.split("\n")
                        places = list(filter(None, places))
                        
                        val_bookmarks = places

                        Dict[key_bookmarks] = val_bookmarks

                elif categoryDirName == "Maps (your places)":
                    # -----  -----
                    file_saved_places = "Saved Places.json"
                    data_saved_places = genericParser.jsonToDict(dirPath + "/" + file_saved_places, ())
                    data_saved_places = data_saved_places["features"]

                    key_saved_places = "Saved Places"

                    val_saved_places = []
                    for data_pt in data_saved_places:
                        place = []

                        name = data_pt["properties"]["Title"]
                        place.append(name)

                        locations = data_pt["properties"]["Location"]
                    
                        if "Geo Coordinates" in locations.keys() and "Address" in locations.keys():
                            address = locations["Address"]
                            coords = locations["Geo Coordinates"]

                            place.append(address)
                            place.append(coords)

                        else: 
                            coords = locations
                            place.append(coords)

                        val_saved_places.append(place)

                    Dict[key_saved_places] = val_saved_places

                elif categoryDirName == "My Activity":
                    # -----  -----
                    file_ads = dirPath + "/Ads/MyActivity.html"

                    key_ads = "ads_activity"
                    val_ads = []

                    with open(file_ads, "rb") as infile:
                        soup = BeautifulSoup(infile,'lxml')
                        ads = soup.find_all("div", {"class": "content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1"})
                        
                        for item in ads:

                            if len(item.contents) >= 4:
                                link = item.contents[1]['href']
                                date = item.contents[3]

                                val_ads.append((link, date))

                    Dict[key_ads] = val_ads

                    # -----  -----
                    file_maps = dirPath + "/Maps/MyActivity.html"

                    key_maps = "maps_activity"
                    val_maps = {}

                    usages = []     #list of timestamps maps was used
                    links = []      #list of links and timestamps
                    views = []      #list of links and timestamps
                    searches = []   #list of links and timestamps
                    calls = []      #list of links and timestamps
                    directions = []
                    others = []

                    with open(file_maps, "rb") as infile:
                        soup = BeautifulSoup(infile,'lxml')
                        entries = soup.find_all("div", {"class": "content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1"})

                        for item in entries:

                            if len(item.contents) == 3:
                                if "Used" in str(item.contents[0]):
                                    date = item.contents[2]
                                    usages.append(date)

                                else:
                                    try:
                                        link = item.contents[0]['href']
                                    except:
                                        link = ""

                                    date = item.contents[2]

                                    linkValues = (link, date)
                                    links.append(linkValues)

                            elif len(item.contents) == 4:
                                if "Viewed" in item.contents[0]:
                                    link = item.contents[1]['href']
                                    date = item.contents[3]

                                    viewValues = (link, date)
                                    views.append(viewValues)

                                elif "Searched" in str(item.contents[0]):
                                    try:
                                        link = item.contents[1]['href']
                                    except:
                                        link = ""

                                    date = item.contents[3]

                                    searchValues = (link, date)
                                    searches.append(searchValues)

                                elif "Called" in str(item.contents[0]):
                                    try:
                                        link = item.contents[1]['href']
                                    except:
                                        link = ""

                                    date = item.contents[3]

                                    callValues = (link, date)
                                    calls.append(callValues)

                            elif len(item.contents) == 8:
                                try:
                                    link = item.contents[1]['href']
                                except:
                                    link = ""

                                origin = item.contents[3]
                                dest = item.contents[5]
                                date = item.contents[7]

                                dirValues = (link, origin, dest, date)
                                directions.append(dirValues)

                            else: 
                                others.append(item.contents)
                                print(item.contents)
                                print()

                    val_maps["usages"] = usages
                    val_maps["links"] = links
                    val_maps["views"] = views
                    val_maps["searches"] = searches
                    val_maps["calls"] = calls
                    val_maps["directions"] = directions 
                    #val_maps["others"] = others   

                    Dict[key_maps] = val_maps

                    # -----  -----
                    file_search = "/Search/MyActivity.html"

                    key_search = "search_activity"
                    val_search = {}




                    file_youtube = "/YouTube/MyActivity.html"

                elif categoryDirName == "Profile":

                    file_profile = "Profile.json"

                elif categoryDirName == "Saved":

                    file_places = "Favorite_places.json"

                elif categoryDirName == "YouTube":

                    file_likes = "/playlists/likes.json"

                    file_love = "/playlists/Love.json"

                    file_watch_later = "watch-later.json"

                    file_subscriptions = "/subscriptions/subscriptions.json"

    else: print("path does not exist")

def main():
    root = "google-lisa"
    parseGoogleData(root)

if __name__ == "__main__":
    main() 
