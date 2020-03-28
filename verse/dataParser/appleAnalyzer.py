#!/usr/bin/env python3

import os
import pandas as pd
import numpy as np
import operator

from dataParser import appleParser, genericParser
#import genericParser, appleParser

# TODO: how does the data dump page pass the username to the backend

def filterByField(Dict, fieldNames):
    df = pd.DataFrame.from_dict(Dict)
    df = df.replace(r'^\s*$', np.NaN, regex=True)
    df = df.dropna(0, subset=fieldNames)        #drop all rows with NaN in fieldNames columns
    df = df.loc[:, fieldNames].to_dict('records')
    return df

def countFrequencies(listItems):
    Dict = {}
    uniqueItems = set(listItems)                  
    for item in uniqueItems:
        #if item != "":
        Dict[item] = listItems.count(item)

    sortedTuples = sorted(Dict.items(), key = operator.itemgetter(1))
    sortedTuples = list(sortedTuples)
    sortedTuples = sortedTuples[::-1]

    sortedDict = {}
    for item in sortedTuples:
        sortedDict[item[0]] = item[1]

    return sortedDict

def countTopTen(Dict):
    topTen = {k: Dict[k] for k in list(Dict)[:10]}

    return topTen

# https://stackoverflow.com/a/35989770
def convertMillis(millis):
    seconds=(millis/1000)%60
    minutes=(millis/(1000*60))%60
    hours=(millis/(1000*60*60))%24
    return hours, minutes, seconds
    
def getGeneralDataGroups():
    data = genericParser.getParsedJson("./media/processedData/apple/apple-lisa/parsedGeneralAppleData.json")

    Dict = {}

    Dict["total_size_bignum"] = data["totalSizeInGB"]

    Dict["personal_info_header"] = [data["name"], data["address"]]

    Dict["devices_list"] = data["devices"]

    return Dict

def getMusicDataGroups():
    data = genericParser.getParsedJson("./media/processedData/apple/apple-lisa/parsedMusicAppleData.json")

    Dict = {}

    # -----   -----
    play_ms = filterByField( data["apple_music_play_activity"], ("Milliseconds Since Play", "Play Duration Milliseconds"))
    msSincePlay = [s["Milliseconds Since Play"] for s in play_ms]
    msPlayDuration = [d["Play Duration Milliseconds"] for d in play_ms]
    for i in range(0, len(msPlayDuration)):
        if not isinstance(msPlayDuration[i], float):
            msPlayDuration[i] = 0

    totalListenTime = sum(msPlayDuration)
    totalListenTime = convertMillis(totalListenTime)
    Dict["total_listen_time_bignum"] = { "hours" : totalListenTime[0], "minutes" : totalListenTime[1], "seconds" : totalListenTime[2]}
    
    # -----   -----
    Dict["preferences_pictograph"] = data["apple_music_preferences"]

    # -----   -----
    artist_song_endtype = filterByField( data["apple_music_play_activity"], 
    ("Artist Name", "Content Name", "End Reason Type", "Milliseconds Since Play") )

    #TODO: infer actual favorite songs that had natural end of track rather than skip

    # -----   -----
    genres = filterByField( data["apple_music_play_activity"], ("Genre",) )
    genres = [g["Genre"] for g in genres]       #get values from dict in list of dicts
    dictGenreFreq = countFrequencies(genres)
    Dict["play_activity_genres_piechart"] = dictGenreFreq
    Dict["top_ten_genres_list"] = countTopTen(dictGenreFreq)

    # -----   -----
    artists = filterByField( data["apple_music_play_activity"], ("Artist Name",) )
    artists = [a["Artist Name"] for a in artists]
    dictArtistFreq = countFrequencies(artists)
    Dict["top_ten_artists_list"] = countTopTen(dictArtistFreq)
    Dict["play_activity_artists_barchart"] = dictArtistFreq

    # -----   -----
    trackArtist = filterByField( data["apple_music_play_activity"], ("Content Name", "Artist Name") )
    tracks = [t["Content Name"] for t in trackArtist]
    dictTrackFreq = countFrequencies(tracks)
    
    dictTrackArtist = {}
    for d in trackArtist:
        #if d["Content Name"] != "" or d["Artist Name"] != "":
        dictTrackArtist[d["Content Name"]] = d["Artist Name"]

    #replace track name with track + artist name in key
    dictTrackArtistFreq = {}
    for track in dictTrackFreq:
        if track in dictTrackArtist:
            dictTrackArtistFreq[track + " - " + dictTrackArtist[track]] = dictTrackFreq[track]
            
    Dict["play_activity_track_barchart"] = dictTrackArtistFreq
    Dict["top_ten_tracks_list"] = countTopTen(dictTrackArtistFreq)

    # -----   -----
    track_ip = filterByField( data["apple_music_play_activity"], ("Content Name", "Artist Name", "Client IP Address"))
    Dict["play_activity_map"] = track_ip

    # -----   -----
    totalNumTracks = len(data["apple_music_library_tracks"])
    Dict["total_tracks_bignum"] = totalNumTracks

    # -----   -----
    title_artist_dates = filterByField( data["apple_music_library_tracks"], ("Title", "Artist", 
    "Date Added To Library", "Last Played Date", "Release Date"))
    Dict["library_song_timeline"] = title_artist_dates

    # -----   -----
    genre_dates = filterByField( data["apple_music_library_tracks"], ("Genre", "Last Played Date"))
    Dict["genre_timeline"] = genre_dates

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

