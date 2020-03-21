#!/usr/bin/env python3

import string
import json
from pprint import pprint
from dataParser import genericParser

def parseAppleData(appleDataDumpName):
    # Define dictionary to map json data to
    Dict = {}

    rootCategoriesOfInterest = ("Apple ID account and device information", 
                                "Apple Media Services information", 
                                "Apple Pay activity",
                                "Game Center",
                                "Marketing communications")

    # Parse through apple media root directory
    rootPathName = "./media/unzippedFiles/apple/" + facebookDataDumpName
    if path.exists(rootPathName):

        # Get total size
        Dict["totalSizeInGB"] = genericParser.getDirSizeInGB(rootPathName)
        
        # Extract json data
        for root, dirs, files in genericParser.walklevel(rootPathName, level=1):
            # from https://stackoverflow.com/a/7253830
            categoryDirName = root.rsplit('/', 1)[-1]
            
            # if category is valid,
            # add data of interest to dictionary
            dirPath = rootPathName + "/" + categoryDirName
            if any(categoryDirName in category for category in rootCategoriesOfInterest) and path.exists(dirPath):
                if categoryDirName == "Apple ID account and device information":
                    # -----  -----
                    file_account_info = "Apple ID Account Information.csv"
                    #data_account_info = TODO: csv file parsing

                    key_apple_id = "apple_id_number"

                    key_name = "name"

                    key_address - "address"

                elif categoryDirName == "Apple Media Services information":
                    # -----  -----
                    file_devices = "Apple ID Device Information.csv"
                    #data_devices = TODO: csv file parsing

                    key_device_name = "device_name"

                    key_device_serial = "device_serial_number"

                    key_device_added_date = "device_added_date"

                    key_device_last_heartbeat_IP_addr = "device_last_heartbeat_IP_addr"

                    # -----  -----
                    file_recent_tracks = "Apple Music - Recently Played Tracks.csv"
                    #data_recent_tracks = TODO: csv file parsing

                    key_recently_played = "apple_music_recently_played"
                    #include title, artist, date

                    #-----  -----
                    file_likes_dislikes = "Apple Music Likes and Dislikes.csv"
                    #data_likes_dislikes = TODO: csv file parsing

                    key_likes = "apple_music_likes"

                    key_dislikes = "apple_music_dislikes"

                    #-----  -----
                    file_play_activity = "Apple Music Play Activity.csv"
                    #data_play_activity = TODO: csv file parsing

                    key_play_activity = "apple_music_play_activity"
                    #include artist, content name, client ip, content type, end reason, genre

                    #-----  -----
                    file_library_activity = "Apple Music Library Activity.json"
                    #data_library_activity = genericParser.jsonToDictionary(dirPath, file_library_activity)

                    key_library_activity = "apple_music_library_activity"

                    #-----  -----
                    file_library_tracks = "Apple Music Library Tracks.json"
                    #data_library_tracks = genericParser.jsonToDictionary(dirPath, file_library_tracks)

                    key_library_tracks = "apple_music_library_tracks"

                    #-----  -----
                    file_apps = "iTunes and App-Book Re-download and Update History.csv"
                    #data_apps = TODO: csv file parsing

                    key_apps = "apps"
                    #include name, date of download
                    
                elif categoryDirName == "Apple Pay activity":
                    # -----  -----
                    file_apple_pay_cards = "Apple Pay Cards.csv"
                    #data_apple_pay_cards = 

                    key_cards = "apple_pay_cards"

                elif categoryDirName == "Game Center":
                    # -----  -----
                    file_game_center = "Game Center Data.json"
                    data_game_center = genericParser.jsonToDictionary(dirPath, file_game_center)

                    key_games = "games"
                    
                elif categoryDirName == "Marketing communications":
                    # -----  -----
                    
                else: print("category not found") 
            
    else: print("path does not exist")

    #write parsed data dictionary to json file
    #with open('parsedAppleData.json', 'w') as fp:
    #json.dump(Dict, fp)

    return Dict

def main():
    root = "apple-lisa"
    parseAppleData(root)

if __name__ == "__main__":
    main() 
