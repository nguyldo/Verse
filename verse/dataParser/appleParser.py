#!/usr/bin/env python3

import os
import string
import json
import zipfile

#TODO: uncomment first if running through django and second if through python
from dataParser import genericParser
#import genericParser

def parseAppleData(appleDataDumpName, dataCategory):
    # Define dictionary to map json data to
    Dict = {}

    # Parse through apple media root directory
    #TODO: uncomment first if running through django and second if through python
    rootPathName = "./media/unzippedFiles/apple/" + appleDataDumpName
    #rootPathName = "../media/unzippedFiles/apple/" + appleDataDumpName

    if os.path.exists(rootPathName):

        #Extract data
        genDirPath = rootPathName + "/Apple ID account and device information"
        musicDirPath = rootPathName + "/Apple Media Services information"
        gameDirPath = rootPathName + "/Game Center"

        #determine which api is calling
        if dataCategory == "General":

            # Get total size
            Dict["totalSizeInGB"] = genericParser.getDirSizeInGB(rootPathName)

            if os.path.exists(genDirPath):
                # -----  -----
                file_account_info = "Apple ID Account Information.csv"
                fieldNames = ("Apple ID Number", "First Name", "Last Name", "Official Address")
                data_account_info = genericParser.csvToDict(genDirPath + "/" + file_account_info, fieldNames)
                

                key_apple_id = "apple_id_number"
                val_apple_id = data_account_info[0]["Apple ID Number"]
                Dict[key_apple_id] = val_apple_id

                key_name = "name"
                val_name = data_account_info[0]["First Name"] + " " + data_account_info[0]["Last Name"]
                Dict[key_name] = val_name

                key_address = "address"
                val_address = data_account_info[0]["Official Address"]
                Dict[key_address] = val_address

                # -----  -----
                file_devices = "Apple ID Device Information.csv"
                fieldNames = ("Device Name", "Device Added Date", "Device Serial Number", "Device Last Heartbeat IP")
                data_devices = genericParser.csvToDict(genDirPath + "/" + file_devices, fieldNames)


                key_devices = "devices"
                val_devices = data_devices
                Dict[key_devices] = val_devices
            
            else: 
                print("general dir path not found") 

        elif dataCategory == "Music":

            if os.path.exists(musicDirPath):
                zipPath = musicDirPath + "/Apple_Media_Services.zip"
                with zipfile.ZipFile(zipPath, "r") as zip_ref:
                    zip_ref.extractall(musicDirPath)
                
                # -----  -----
                file_recent_tracks = "Apple_Media_Services/Apple Music Activity/Apple Music - Recently Played Tracks.csv"
                fieldNames = ("Last Modified", "Track Description")
                data_recent_tracks = genericParser.csvToDict(musicDirPath + "/" + file_recent_tracks, fieldNames)


                key_recently_played = "apple_music_recently_played"
                for item in data_recent_tracks:
                    artist = item["Track Description"].split(" - ")[0]
                    song = item["Track Description"].split(" - ")[1]

                    item.update({"Artist" : artist})
                    item.update({ "Track" : song})
                    item.pop("Track Description")
                val_recently_played = data_recent_tracks
                Dict[key_recently_played] = val_recently_played
                
                #-----  -----
                file_likes_dislikes = "Apple_Media_Services/Apple Music Activity/Apple Music Likes and Dislikes.csv"
                fieldNames = ("Item Description", "Preference", "Created")
                data_likes_dislikes = genericParser.csvToDict(musicDirPath + "/" + file_likes_dislikes, fieldNames) 


                key_preferences = "apple_music_preferences"
                likes = []
                dislikes = []
                others = []
                for item in data_likes_dislikes:
                    artist = item["Item Description"].split(" - ")[0]
                    song = item["Item Description"].split(" - ")[1]

                    item.update({"Artist" : artist})
                    item.update({ "Track" : song})
                    item.pop("Item Description")

                    if item["Preference"] == "LOVE":
                        item.pop("Preference")
                        likes.append(item)
                    elif item["Preference"] == "DISLIKE":
                        item.pop("Preference")
                        dislikes.append(item)
                    else:
                        item.pop("Preference")
                        others.append(item)
                val_preferences = { "likes" : likes, "dislikes" : dislikes, "others" : others}
                Dict[key_preferences] = val_preferences

                #-----  -----
                file_play_activity = "Apple_Media_Services/Apple Music Activity/Apple Music Play Activity.csv"
                fieldNames = ("Artist Name", "Content Name", "Client IP Address", "End Reason Type", 
                            "Genre", "Event Received Timestamp", "Event End Timestamp")
                data_play_activity = genericParser.csvToDict(musicDirPath + "/" + file_play_activity, fieldNames)


                key_play_activity = "apple_music_play_activity"
                val_play_activity = data_play_activity
                Dict[key_play_activity] = val_play_activity

                #-----  -----
                zipPath = musicDirPath + "/Apple_Media_Services/Apple Music Activity/Apple Music Library Activity.json.zip"
                with zipfile.ZipFile(zipPath, "r") as zip_ref:
                    zip_ref.extractall(musicDirPath + "/Apple_Media_Services/Apple Music Activity")

                file_library_activity = "Apple_Media_Services/Apple Music Activity/Apple Music Library Activity.json"
                data_library_activity = genericParser.jsonToDict(musicDirPath + "/" + file_library_activity)
                

                key_library_activity = "apple_music_library_activity"
                val_library_activity = data_library_activity
                Dict[key_library_activity] = val_library_activity

                #-----  -----
                zipPath = musicDirPath + "/Apple_Media_Services/Apple Music Activity/Apple Music Library Tracks.json.zip"
                with zipfile.ZipFile(zipPath, "r") as zip_ref:
                    zip_ref.extractall(musicDirPath + "/Apple_Media_Services/Apple Music Activity")

                file_library_tracks = "Apple_Media_Services/Apple Music Activity/Apple Music Library Tracks.json"
                data_library_tracks = genericParser.jsonToDict(musicDirPath + "/" + file_library_tracks)

                key_library_tracks = "apple_music_library_tracks"
                val_library_tracks = data_library_tracks
                Dict[key_library_tracks] = val_library_tracks

            else: 
                print("music category not found") 

        elif dataCategory == "AppsGames":

            if os.path.exists(musicDirPath):
                #-----  -----
                file_apps = "Update and Redownload History/iTunes and App-Book Re-download and Update History.csv"
                fieldNames = ("Activity Date", "Item Description", "Device IP Address")
                data_apps = genericParser.csvToDict(musicDirPath + "/" + file_apps, fieldNames)
                

                key_apps = "apps"
                val_apps = data_apps
                Dict[key_apps] = val_apps
                
            else: 
                print("app category not found") 

            if os.path.exists(gameDirPath):
                # -----  -----
                file_game_center = "Game Center Data.json"
                data_game_center = genericParser.jsonToDict(gameDirPath + "/" + file_game_center)


                key_games = "games"
                val_games = data_game_center
                Dict[key_games] = val_games
            else: 
                print("app category not found") 
    
    else: print("given root path does not exist")

    #write parsed data dictionary to json file
    #genericParser.dictToJsonFile(Dict, '../media/processedData/apple/' + appleDataDumpName + '/parsedAppleData.json')

    return Dict

def main():
    root = "apple-lisa"
    parseAppleData(root)

if __name__ == "__main__":
    main() 
