#!/usr/bin/env python3

import os
import pandas as pd

from dataParser import appleParser, genericParser
#import genericParser, appleParser

# TODO: how does the data dump page pass the username to the backend

def filterByField(Dict, fieldNames):
    df = pd.DataFrame.from_dict(Dict)
    df = df.loc[:, fieldNames].to_dict('records')
    return df

def countFrequencies(listItems):
    Dict = {}
    uniqueItems = set(listItems)                  
    for item in uniqueItems:
        Dict[item] = listItems.count(item)

    return Dict

def getGeneralDataGroups():
    data = genericParser.getParsedJson("./media/processedData/apple/apple-lisa/parsedGeneralAppleData.json")

    Dict = {}

    Dict["personal_info_header"] = [data["name"], data["address"]]

    Dict["devices_list"] = data["devices"]

    return Dict

def getMusicDataGroups():
    data = genericParser.getParsedJson("./media/processedData/apple/apple-lisa/parsedMusicAppleData.json")

    Dict = {}

    #TODO: maybe remove if redundant
    #Dict["recently_played_timeline"] = data["apple_music_recently_played"]

    # -----   -----
    #Dict["preferences_pictograph"] = data["apple_music_preferences"]

    # -----   -----
    
    #Dict["favorite_artists"]
    #Dict["play_activity_timeline"] = data["apple_music_play_activity"]

    #Dict["library_activity_timeline"] = data["apple_music_library_activity"]

    # -----   -----
    genres = filterByField( data["apple_music_play_activity"], ("Genre",) )
    genres = [g["Genre"] for g in genres]       #get values from dict in list of dicts
    dictGenreFreq = countFrequencies(genres)
    
    Dict["genres_piechart"] = dictGenreFreq

    # -----   -----

    #Dict["favorite_artists_list"] = data["apple_music_play_activity"]
    #TODO: count occurrences

    return Dict

def getAppsGamesDataGroups():
    data = genericParser.getParsedJson("./media/processedData/apple/apple-lisa/parsedAppsGamesAppleData.json")

    Dict = {}

    # -----   -----
    Dict["games_timeline"] = data["games"]

    # -----   -----
    app_date = filterByField(data["apps"], ("Activity Date", "Item Description"))
    app_ip = filterByField(data["apps"], ("Device IP Address", "Item Description"))

    Dict["apps_timeline"] = app_date

    Dict["apps_map"] = app_ip

    return Dict

def main():
    getAppsGamesDataGroups()

if __name__ == "__main__":
    main() 

