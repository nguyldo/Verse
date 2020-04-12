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

        #Extract data
        bookmarksDirPath = rootPathName + "/Bookmarks"
        mapsDirPath = rootPathName + "/Maps (your places)"
        activityDirPath = rootPathName + "/My Activity"
        profileDirPath = rootPathName + "/Profile"
        
        # ---------- Bookmarks Data ---------- 
        if os.path.exists(bookmarksDirPath):
            # -----  -----
            file_bookmarks = bookmarksDirPath + "/Bookmarks.html"

            key_bookmarks = "bookmarks"
            val_bookmarks = []

            bookmarks = genericParser.htmlToSoup(file_bookmarks, "dl", "")
            val_bookmarks = list(filter(None, bookmarks[0].text.split("\n")))

            Dict[key_bookmarks] = val_bookmarks

        else: print("bookmarks dir path not found")

        # ---------- Maps Data ----------
        if os.path.exists(mapsDirPath):
            # -----  -----
            file_saved_places = mapsDirPath + "/Saved Places.json"
            data_saved_places = genericParser.jsonToDict(file_saved_places, ())
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

        else: print("maps dir path not found")

        # ---------- Activity Data ----------
        if os.path.exists(activityDirPath):
            
            # -----  -----
            file_ads = activityDirPath + "/Ads/MyActivity.html"

            # list of (link, date) tuples
            key_ads = "ads_activity"
            val_ads = []

            ads = genericParser.htmlToSoup(file_ads, "div", "content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1")
                
            for ad in ads:
                if len(ad.contents) == 4:
                    link = ad.contents[1]['href']
                    date = ad.contents[3]

                    val_ads.append((link, date))

            Dict[key_ads] = val_ads

            # -----  -----
            file_maps = activityDirPath + "/Maps/MyActivity.html"

            # dict of lists of (link, date) tuples
            key_maps = "maps_activity"
            val_maps = {}

            usages = []     #list of timestamps maps was used
            links = []      
            views = []      
            searches = []   
            calls = []      
            directions = []
            others = []

            maps = genericParser.htmlToSoup(file_maps, "div", "content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1")

            for item in maps:

                if len(item.contents) == 3:
                    if "Used" in str(item.contents[0]):
                        date = item.contents[2]

                        usages.append(date)

                    elif "Viewed" in str(item.contents[0]):
                        try:
                            link = item.contents[0]['href']
                        except: link = ""
                        date = item.contents[2]

                        views.append((link, date))

                    else:
                        try:
                            link = item.contents[0]['href']
                        except: link = ""
                        date = item.contents[2]

                        links.append((link, date))

                elif len(item.contents) == 4:
                    if "Viewed" in str(item.contents[0]):
                        try:
                            link = item.contents[1]['href']
                        except: link = ""
                        date = item.contents[3]

                        views.append((link, date))

                    elif "Searched" in str(item.contents[0]):
                        try:
                            link = item.contents[1]['href']
                        except: link = ""
                        date = item.contents[3]

                        searches.append((link, date))

                    elif "Called" in str(item.contents[0]):
                        try:
                            link = item.contents[1]['href']
                        except: link = ""
                        date = item.contents[3]

                        calls.append((link, date))

                elif len(item.contents) == 8:
                    try:
                        link = item.contents[1]['href']
                    except: link = ""
                    origin = item.contents[3]
                    dest = item.contents[5]
                    date = item.contents[7]

                    directions.append((link, origin, dest, date))

                else: 
                    others.append(item.contents)

            val_maps["usages"] = usages
            val_maps["links"] = links
            val_maps["views"] = views
            val_maps["searches"] = searches
            val_maps["calls"] = calls
            val_maps["directions"] = directions 
            #val_maps["others"] = others   

            Dict[key_maps] = val_maps

            # -----  -----
            file_search = activityDirPath + "/Search/MyActivity.html"

            # dict of lists of (link, date) tuples
            key_searches = "search_activity"
            val_searches = {}

            views = []
            visits = []
            searches = []

            engineSearches = genericParser.htmlToSoup(file_search, "div", "content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1")

            for item in engineSearches:

                if len(item.contents) == 4:

                    if "Viewed" in str(item.contents[0]):
                        view = item.contents[1].string
                        link = item.contents[1]['href']
                        date = item.contents[3]

                        caption = item.next_sibling.next_sibling.contents
                        if len(caption) > 4 and "Locations" in str(caption[4]):
                            coordLink = caption[7]['href']

                            if "center" in str(coordLink):
                                coords = coordLink.split("center")[1][1:21]
                            else:
                                coords = coordLink.split("=")[2][1:21]

                            views.append((view, link, date, coords))
                        
                        else: views.append((view, link, date))

                    elif "Visited" in str(item.contents[0]):
                        visit = item.contents[1].string
                        link = item.contents[1]['href']
                        date = item.contents[3]

                        caption = item.next_sibling.next_sibling.contents
                        if len(caption) > 4 and "Locations" in str(caption[4]):
                            coordLink = caption[7]['href']

                            if "center" in str(coordLink):
                                coords = coordLink.split("center")[1][1:21]
                            else:
                                coords = coordLink.split("=")[2][1:21]

                            visits.append((visit, link, date, coords))
                        
                        else: visits.append((visit, link, date))

                    elif "Searched" in str(item.contents[0]):
                        search = item.contents[1].string
                        link = item.contents[1]['href']
                        date = item.contents[3]

                        caption = item.next_sibling.next_sibling.contents
                        if len(caption) > 4 and "Locations" in str(caption[4]):
                            coordLink = caption[7]['href']

                            if "center" in str(coordLink):
                                coords = coordLink.split("center")[1][1:21]
                            else:
                                coords = coordLink.split("=")[2][1:21]

                            searches.append((search, link, date, coords))
                        
                        else: searches.append((search, link, date))

            val_searches["views"] = views
            val_searches["visits"] = visits
            val_searches["searches"] = searches
                
            Dict[key_searches] = val_searches
            
            # -----  -----
            file_youtube = activityDirPath + "/YouTube/MyActivity.html"
            
            key_youtube = "youtube_activity"
            val_youtube = {}

            watches = []
            searches = []

            youtubeActions = genericParser.htmlToSoup(file_youtube, "div", "content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1")

            for item in youtubeActions:
                
                if len(item.contents) == 6 and "Watched" in str(item.contents[0]):
                    video = item.contents[1].string
                    link = item.contents[1]['href']
                    uploader = item.contents[3].string
                    date = item.contents[5]

                    watches.append((video, link, uploader, date))

                elif len(item.contents) == 4 and "Searched" in str(item.contents[0]):
                    query = item.contents[1].string
                    link = item.contents[1]['href']
                    date = item.contents[3]

                    searches.append((query, link, date))

            val_youtube["watches"] = watches
            val_youtube["searches"] = searches

            Dict[key_youtube] = val_youtube

        else: print("activity dir path not found")
        
        # ---------- Profile Data ----------
        if os.path.exists(profileDirPath):

            file_profile = profileDirPath + "/Profile.json"
            data_profile = genericParser.jsonToDict(file_profile, ())

            key_profile = "profile_info"
            val_profile = {}

            val_profile["name"] = data_profile["displayName"]
            val_profile["emails"] = data_profile["emails"]
            val_profile["orgs"] = data_profile["organizations"]

            Dict[key_profile] = val_profile

        else: print("profile dir path not found")

    else: print("path does not exist")

    #write parsed data dictionary to json file
    genericParser.writeToJsonFile(Dict, '../media/processedData/google/' + googleDataDumpName + '/parsedGoogleData.json')

def main():
    root = "google-lisa"
    parseGoogleData(root)

if __name__ == "__main__":
    main() 
