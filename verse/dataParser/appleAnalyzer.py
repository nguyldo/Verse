#!/usr/bin/env python3

import os
import pandas as pd

from dataParser import appleParser, genericParser
#import genericParser, appleParser

# TODO: how does the data dump page pass the username to the backend

def filterByField(Dict, fieldNames):
    df = pd.DataFrame.from_dict(Dict)
    df = df.fillna('')
    df = df.loc[:, fieldNames].to_dict('records')
    return df

def countFrequencies(listItems):
    Dict = {}
    uniqueItems = set(listItems)                  
    for item in uniqueItems:
        if item != "":
            Dict[item] = listItems.count(item)

    return Dict

# https://stackoverflow.com/a/35989770
def convertMillis(millis):
    seconds=(millis/1000)%60
    minutes=(millis/(1000*60))%60
    hours=(millis/(1000*60*60))%24
    return hours, minutes, seconds
    
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
    play_ms = filterByField( data["apple_music_play_activity"], ("Milliseconds Since Play", "Play Duration Milliseconds"))
    msSincePlay = [s["Milliseconds Since Play"] for s in play_ms]
    msPlayDuration = [d["Play Duration Milliseconds"] for d in play_ms]
    for i in range(0, len(msPlayDuration)):
        if not isinstance(msPlayDuration[i], float):
            msPlayDuration[i] = 0

    totalListenTime = sum(msPlayDuration)
    totalListenTime = convertMillis(totalListenTime)
    Dict["total_listen_time"] = { "hours" : totalListenTime[0], "minutes" : totalListenTime[1], "seconds" : totalListenTime[2]}
    

    # -----   -----
    artist_song_time = filterByField( data["apple_music_play_activity"], 
    ("Artist Name", "Content Name", "Play Duration Milliseconds") )
    #print(artist_song_time)
    #Dict["play_activity_timeline"] = data["apple_music_play_activity"]

    # -----   -----
    genres = filterByField( data["apple_music_play_activity"], ("Genre",) )
    genres = [g["Genre"] for g in genres]       #get values from dict in list of dicts
    dictGenreFreq = countFrequencies(genres)
    
    #Dict["play_activity_genres_piechart"] = dictGenreFreq

    # -----   -----
    artists = filterByField( data["apple_music_play_activity"], ("Artist Name",) )
    artists = [a["Artist Name"] for a in artists]
    dictArtistFreq = countFrequencies(artists)
    #Dict["play_activity_artists_barchart"] = dictArtistFreq

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

