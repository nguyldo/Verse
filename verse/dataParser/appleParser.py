#!/usr/bin/env python3

import os
import string
import json
import zipfile

from dataParser import genericParser

def parseAppleData(appleDataDumpName):
    # Define dictionary to map json data to
    Dict = {}

    # Parse through apple media root directory
    rootPathName = "./media/unzippedFiles/apple/" + appleDataDumpName

    if os.path.exists(rootPathName):

        # Get total size
        Dict["total_size_GB"] = genericParser.getDirSizeInGB(rootPathName)
        #TODO: double check, this number doesn't make sense

        # ---------- General Data ----------
        genDirPath = rootPathName + "/Apple ID account and device information"

        # -----  -----
        file_account_info = genDirPath + "/Apple ID Account Information.csv"
        if os.path.exists(file_account_info):

            fieldNames = ("Apple ID Number", "First Name", "Last Name", "Official Address")
            data_account_info = genericParser.csvToDict(file_account_info, fieldNames)
            
            apple_id = data_account_info[0]["Apple ID Number"]
            name = data_account_info[0]["First Name"] + " " + data_account_info[0]["Last Name"]
            address = data_account_info[0]["Official Address"]

            Dict["account_info_header"] = [apple_id, name, address]
        else: 
            print("/Apple ID account and device information/Apple ID Account Information.csv not found") 

        # -----  -----
        file_devices = genDirPath + "/Apple ID Device Information.csv"
        if os.path.exists(file_devices):
            
            fieldNames = ("Device Name", "Device Added Date", "Device Serial Number", "Device Last Heartbeat IP")
            data_devices = genericParser.csvToDict(file_devices, fieldNames)

            Dict["devices_list"] = data_devices
        
        else: 
            print("/Apple ID account and device information/Apple ID Device Information.csv not found") 
        
        # ---------- Music Data ----------
        musicDirPath = rootPathName + "/Apple Media Services information"

        if os.path.exists(musicDirPath):
            zipPath = musicDirPath + "/Apple_Media_Services.zip"
            with zipfile.ZipFile(zipPath, "r") as zip_ref:
                zip_ref.extractall(musicDirPath)

            zipPath1 = musicDirPath + "/Apple_Media_Services/Apple Music Activity/Apple Music Library Tracks.json.zip"
            with zipfile.ZipFile(zipPath1, "r") as zip_ref1:
                zip_ref1.extractall(musicDirPath + "/Apple_Media_Services/Apple Music Activity")
 
        # ===== PLAY ACTIVITY =====
        file_play_activity = musicDirPath + "/Apple_Media_Services/Apple Music Activity/Apple Music Play Activity.csv"
        if os.path.exists(file_play_activity):

            fieldNames = ("Artist Name", "Content Name", "Client IP Address", "End Reason Type", 
                        "Genre", "Milliseconds Since Play", "Play Duration Milliseconds", "Event Received Timestamp")
            data_play_activity = genericParser.csvToDict(file_play_activity, fieldNames)

            #-----  -----
            dates = genericParser.filterByField(data_play_activity, ("Event Received Timestamp",) )
            dateBounds = genericParser.getDateBounds(dates)
            Dict["activity_date_range"] = dateBounds

            # -----   -----
            play_ms = genericParser.filterByField(data_play_activity, ("Milliseconds Since Play", "Play Duration Milliseconds"))
            msSincePlay = [s["Milliseconds Since Play"] for s in play_ms]
            msPlayDuration = [d["Play Duration Milliseconds"] for d in play_ms]

            for i in range(0, len(msPlayDuration)):
                if not isinstance(msPlayDuration[i], float) and not isinstance(msPlayDuration[i], int):
                    msPlayDuration[i] = 0

                if msPlayDuration[i] < 0:
                    msPlayDuration[i] = -msPlayDuration[i]

            totalListenTime = sum(msPlayDuration)
            totalListenTime = genericParser.convertMillis(totalListenTime)

            Dict["listen_time"] = { "hours" : totalListenTime[0], "minutes" : totalListenTime[1], "seconds" : totalListenTime[2]}

            # -----   -----
            genres = genericParser.filterByField(data_play_activity, ("Genre",) )
            dictGenreFreq = genericParser.countFrequencies(genres, "Genre")
            dictTopGenres = genericParser.countTopTen(dictGenreFreq)

            dictGenreFreq = genericParser.formatDictionary(dictGenreFreq)
            dictTopGenres = genericParser.formatDictionary(dictTopGenres)

            Dict["genres_piechart"] = dictGenreFreq
            Dict["top_ten_genres_list"] = dictTopGenres

            # -----   -----
            artists = genericParser.filterByField(data_play_activity, ("Artist Name",) )
            dictArtistFreq = genericParser.countFrequencies(artists, "Artist Name")
            dictTopArtists = genericParser.countTopTen(dictArtistFreq)

            dictArtistFreq = genericParser.formatDictionary(dictArtistFreq)
            dictTopArtists = genericParser.formatDictionary(dictTopArtists)

            Dict["artists_barchart"] = dictArtistFreq
            Dict["top_ten_artists_list"] = dictTopArtists

            # -----   -----
            tracks = genericParser.filterByField(data_play_activity, ("Content Name", "Artist Name") )
            dictTrackFreq = genericParser.countFrequencies(tracks, "Content Name")
            
            dictTrackArtist = {}
            for d in tracks:
                dictTrackArtist[d["Content Name"]] = d["Artist Name"]

            #replace track name with track + artist name in key
            dictTrackArtistFreq = {}
            for track in dictTrackFreq:
                if track in dictTrackArtist:
                    dictTrackArtistFreq[track + " - " + dictTrackArtist[track]] = dictTrackFreq[track]
                    
            dictTopTracks = genericParser.countTopTen(dictTrackArtistFreq)

            dictTrackArtistFreq = genericParser.formatDictionary(dictTrackArtistFreq)
            dictTopTracks = genericParser.formatDictionary(dictTopTracks)

            Dict["tracks_barchart"] = dictTrackArtistFreq
            Dict["top_ten_tracks_list"] = dictTopTracks

            # -----   -----
            trackIP = genericParser.filterByField(data_play_activity, ("Content Name", "Artist Name", "Client IP Address"))
            Dict["play_activity_map"] = trackIP

            # -----   -----
            artist_song_endtype = genericParser.filterByField(data_play_activity, 
            ("Artist Name", "Content Name", "End Reason Type", "Milliseconds Since Play") )

            #TODO: infer actual favorite songs that had natural end of track rather than skip

        else: print("/Apple_Media_Services/Apple Music Activity/Apple Music Play Activity.csv not found")
               
        # ===== LIBRARY TRACKS ======
        file_library_tracks = musicDirPath + "/Apple_Media_Services/Apple Music Activity/Apple Music Library Tracks.json"
        if os.path.exists(file_library_tracks):
            
            fieldNames = ("Title", "Artist", "Album", "Album Artist", "Genre", "Track Year", 
                          "Date Added To Library", "Last Played Date", 
                          "Skip Count", "Date of Last Skip", "Release Date")
            data_library_tracks = genericParser.jsonToDict(file_library_tracks, fieldNames)

            # -----   -----
            totalNumTracks = len(data_library_tracks)
            Dict["library_track_count"] = totalNumTracks

            # -----   -----
            titleArtistDates = genericParser.filterByField(data_library_tracks, ("Title", "Artist", "Genre",
            "Date Added To Library", "Last Played Date", "Release Date"))
            titleArtistDatesList = genericParser.formatGanttData(titleArtistDates)
            Dict["library_song_ganttchart"] = titleArtistDatesList

            # -----   -----
            genre_dates = genericParser.filterByField(data_library_tracks, ("Genre", "Last Played Date"))
            Dict["genre_timeline"] = genre_dates

        else: 
            print("/Apple_Media_Services/Apple Music Activity/Apple Music Library Tracks.json not found") 

        # ---------- Apps/Games Data ----------
        file_apps = musicDirPath + "/Update and Redownload History/iTunes and App-Book Re-download and Update History.csv"
        if os.path.exists(file_apps):
            #-----  -----
            fieldNames = ("Activity Date", "Item Description", "Device IP Address")
            data_apps = genericParser.csvToDict(file_apps, fieldNames)

            # -----   -----
            app_date = genericParser.filterByField(data_apps, ("Activity Date", "Item Description"))
            Dict["apps_timeline"] = app_date

            # -----   -----
            app_ip = genericParser.filterByField(data_apps, ("Device IP Address", "Item Description"))
            Dict["apps_map"] = app_ip

        else: 
            print("/Update and Redownload History/iTunes and App-Book Re-download and Update History.csv not found") 

        file_game_center = rootPathName + "/Game Center/Game Center Data.json"
        if os.path.exists(file_game_center):
            # -----  -----
            fieldNames = ("game_name", "last_played_utc")
            data_game_center = genericParser.jsonToDict(file_game_center, fieldNames)

            key_games = "games"
            val_games = data_game_center
            Dict[key_games] = val_games
        else: 
            print("/Game Center/Game Center Data.json not found") 


    else: print("given root path does not exist")

    #write parsed data dictionary to json file
    genericParser.writeToJsonFile(Dict, './media/processedData/apple/' + appleDataDumpName + '/parsedAppleData.json')

"""
def main():
    root = "apple-lisa"
    parseAppleData(root)

if __name__ == "__main__":
    main() 
"""