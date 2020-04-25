#!/usr/bin/env python3

import os
import string
import sqlite3 as lite 
from sqlite3 import Error
import operator

import pandas as pd
from bs4 import BeautifulSoup

from dataParser import genericParser  

# Function: extracts json data from the root directory of facebook data 
# Return: a dictionary with parsed data
def parseGoogleData(googleDataDumpName): 
    # Define dictionary to map json data to
    Dict = {}   

    # Parse through apple media root directory
    rootPathName = "./media/unzippedFiles/google/" + googleDataDumpName + "/Takeout"
    
    if os.path.exists(rootPathName):
        # Get total size
        Dict["total_size_GB"] = genericParser.getDirSizeInGB(rootPathName)
        #TODO: double check, this number doesn't make sense
        
        # ---------- Profile Data ----------
        profileDirPath = rootPathName + "/Profile"
        file_profile = profileDirPath + "/Profile.json"
        if os.path.exists(file_profile):
            
            data_profile = genericParser.jsonToDict(file_profile, ())

            val_profile = {}
            val_profile["name"] = data_profile["displayName"]
            val_profile["email"] = data_profile["emails"][0]["value"]

            Dict["profile_info_header"] = val_profile

        else: print("/Profile/Profile.json not found")
        
        # ---------- Bookmarks Data ---------- 
        bookmarksDirPath = rootPathName + "/Chrome"
        file_bookmarks = bookmarksDirPath + "/Bookmarks.html"
        if os.path.exists(file_bookmarks):

            bookmarks = genericParser.htmlToSoup(file_bookmarks, "dl", "")
            val_bookmarks = list(filter(None, bookmarks[0].text.split("\n")))

            Dict["bookmarks_count"] = len(val_bookmarks)

        else: print("/Bookmarks/Bookmarks.html not found")

        # ---------- Maps Data ----------
        mapsDirPath = rootPathName + "/Maps (your places)"
        file_saved_places = mapsDirPath + "/Saved Places.json"
        if os.path.exists(file_saved_places):

            data_saved_places = genericParser.jsonToDict(file_saved_places, ())
            data_saved_places = data_saved_places["features"]

            val_saved_places = []
            for data_pt in data_saved_places:
                place = []

                name = data_pt["properties"]["Title"]
                locations = data_pt["properties"]["Location"]
            
                if "Geo Coordinates" in locations.keys() and "Address" in locations.keys():
                    address = locations["Address"]
                    coords = locations["Geo Coordinates"]

                    place.append(name)
                    place.append(address)
                    place.append(coords)

                    val_saved_places.append(place)

            Dict["saved_places_map"] = val_saved_places

        else: print("/Maps (your places)/Saved Places.json not found")

        # ---------- YouTube Data ----------
        file_playlists = rootPathName + "/YouTube and YouTube Music/playlists/all-playlists.json"
        file_playlists2 = rootPathName + "/YouTube/playlists/all-playlists.json"
        if os.path.exists(file_playlists):
            data_playlists = genericParser.jsonToDict(file_playlists, ())

            # -----  -----
            Dict["youtube_playlists"] = data_playlists

            # -----  -----
            Dict["youtube_playlists_count"] = len(data_playlists)

        elif os.path.exists(file_playlists2):
            data_playlists = genericParser.jsonToDict(file_playlists2, ())

            # -----  -----
            Dict["youtube_playlists"] = data_playlists

            # -----  -----
            Dict["youtube_playlists_count"] = len(data_playlists)
            
        else: print("/playlists/all-playlists.json not found")

        file_subscriptions = rootPathName + "/YouTube and YouTube Music/subscriptions/subscriptions.json"
        file_subscriptions2 = rootPathName + "/YouTube/subscriptions/subscriptions.json"
        if os.path.exists(file_subscriptions):
            data_subscriptions = genericParser.jsonToDict(file_subscriptions, ())

            # -----  -----
            Dict["youtube_subscriptions"] = data_subscriptions

            # -----  -----
            Dict["youtube_subscriptions_count"] = len(data_subscriptions)

        elif os.path.exists(file_subscriptions2):
            data_subscriptions = genericParser.jsonToDict(file_subscriptions2, ())

            # -----  -----
            Dict["youtube_subscriptions"] = data_subscriptions

            # -----  -----
            Dict["youtube_subscriptions_count"] = len(data_subscriptions)

        else: print("/subscriptions/subscriptions.json not found")

        # ---------- Activity Data ----------
        activityDirPath = rootPathName + "/My Activity"

        # -----  -----
        file_ads = activityDirPath + "/Ads/MyActivity.html"
        if os.path.exists(file_ads):   

            # list of (link, date) tuples
            ads = genericParser.htmlToSoup(file_ads, "div", "content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1")
                
            val_ads = []
            for ad in ads:
                if len(ad.contents) == 4:
                    link = ad.contents[1]['href']
                    date = ad.contents[3]

                    val_ads.append((link, date))

            # -----  -----
            Dict["ads_count"] = len(val_ads)

            # -----  -----
            Dict["ads_list"] = val_ads

            # -----  -----
            ad_waffle_data = []
            ad_values = {}

            for ad in val_ads:
                date = ad[1].split(' ')

                month = date[0]
                day = date[1][:-1]
                year = date[2][:-1]
                
                day_str = day
                if int(day) < 10:
                    day_str = "0" + str(day)

                date = year + "-" + genericParser.monthToNum[month] + "-" + day_str
                if date in ad_values:
                    ad_values[date] += 1
                else:
                    ad_values[date] = 1

            for item in ad_values:
                ad_waffle_data.append({"day": item, "value": ad_values[item]})

            Dict["ads_waffle"] = ad_waffle_data
        
        else: print("/My Activity/Ads/MyActivity.html not found")

        # -----  -----
        file_maps = activityDirPath + "/Maps/MyActivity.html"
        if os.path.exists(file_maps):           

            # dict of lists of (link, date) tuples
            val_maps = {}
   
            views = []      
            searches = []   
            calls = []      
            directions = []

            maps = genericParser.htmlToSoup(file_maps, "div", "content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1")

            for item in maps:

                if len(item.contents) == 4:
                    if "Viewed" in str(item.contents[0]):
                        try:
                            link = item.contents[1]['href']
                            link = link.split('/')
                            coords = link[4][1:]
                            coords = coords.split(',')[:2]

                            date = item.contents[3]

                            views.append(("Viewed", coords, date))

                        except: print("Beautiful Soup can't parse this")

                    elif "Searched" in str(item.contents[0]):
                        try:
                            link = item.contents[1]['href']
                            link = link.split('/')

                            date = item.contents[3]

                            if link[4] == "search":
                                query = link[5]
                                coords = link[6][1:-4].split(',')

                                searches.append(("Searched", query, coords, date))
                        except: print("Beautiful Soup can't parse this")
                        
                    elif "Called" in str(item.contents[0]):
                        try:
                            link = item.contents[1]['href']
                            link = link.split('/')
                            name = link[3].split('=')[1].split('&')[0]

                            date = item.contents[3]

                            calls.append(("Called", name, date))
                        except: print("Beautiful Soup can't parse this")

                elif len(item.contents) == 8:
                    try:
                        link = item.contents[1]['href']

                        origin = item.contents[3]
                        dest = item.contents[5]
                        date = item.contents[7]

                        directions.append(("Directions", link, origin, dest, date))
                    except: print("Beautiful Soup can't parse this")
                    
            val_maps["views"] = views
            val_maps["searches"] = searches

            Dict["maps_activity"] = val_maps

            # -----  -----
            Dict["maps_routes_count"] = len(directions)

            # ----- -----
            Dict["maps_call_list"] = calls
        
        else: print("/My Activity/Maps/MyActivity.html not found")

        # -----  -----
        file_search = activityDirPath + "/Search/MyActivity.html"
        
        if os.path.exists(file_search):     

            # dict of lists of (link, date) tuples
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

            # -----  -----
            Dict["search_count"] = len(searches)

            # -----  -----
            google_search_waffle_data = []
            google_search_values = {}

            for search in searches:
                date = search[2].split(' ')

                month = date[0]
                day = date[1][:-1]
                year = date[2][:-1]
                
                day_str = day
                if int(day) < 10:
                    day_str = "0" + str(day)

                date = year + "-" + genericParser.monthToNum[month] + "-" + day_str
                #print("gg_search_date: " + date)
                if date in google_search_values:
                    google_search_values[date] += 1
                else:
                    google_search_values[date] = 1

                
            for item in google_search_values:
                google_search_waffle_data.append({"day": item, "value": google_search_values[item]})

            Dict["search_waffle"] = google_search_waffle_data
                        
        else: print("/My Activity/Search/MyActivity.html not found")
            
        # -----  -----
        file_youtube = activityDirPath + "/YouTube/MyActivity.html"
        if os.path.exists(file_youtube):
            
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

            # -----  -----
            channels = {}
            for video in watches:
                if video[2] in channels:
                    channels[video[2]] += 1
                else:
                    channels[video[2]] = 1

            sorted_chan = sorted(channels.items(), reverse=True, key=operator.itemgetter(1))

            pie_format_chan = []

            count = 0
            for item in sorted_chan:
                if count == 10:
                    break
                else:
                    pie_format_chan.append({"id": count, "label": item[0], "value": item[1]})
                    count += 1

            Dict["youtube_piechart"] = pie_format_chan

            # -----  -----
            youtube_search_waffle_data = []
            youtube_search_values = {}

            for search in searches:
                date = search[2].split(' ')

                month = date[0]
                day = date[1][:-1]
                year = date[2][:-1]
                
                day_str = day
                if int(day) < 10:
                    day_str = "0" + str(day)

                date = year + "-" + genericParser.monthToNum[month] + "-" + day_str
                #print("yt_search_date: " + date)
                if date in youtube_search_values:
                    youtube_search_values[date] += 1
                else:
                    youtube_search_values[date] = 1

            for item in youtube_search_values:
                youtube_search_waffle_data.append({"day": item, "value": youtube_search_values[item]})

            Dict["youtube_search_waffle"] = youtube_search_waffle_data

        else: print("/My Activity/Youtube/MyActivity.html not found")

        # ---------- Contacts Data ----------
        contactsDirPath = rootPathName + "/Contacts"
        file_contacts = contactsDirPath + "/All Contacts/All Contacts.vcf"

        # -----  -----


    else: print("Google data dump path does not exist")

    #write parsed data dictionary to json file
    genericParser.writeToJsonFile(Dict, './media/processedData/google/' + googleDataDumpName + '/parsedGoogleData.json')

"""
def main():
    root = "google-lisa"
    parseGoogleData(root)

if __name__ == "__main__":
    main() 
"""