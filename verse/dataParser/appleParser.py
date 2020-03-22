#!/usr/bin/env python3

import os
import string
import json
import zipfile
#from dataParser import genericParser
import genericParser

def parseAppleData(appleDataDumpName):
    # Define dictionary to map json data to
    Dict = {}

    rootCategoriesOfInterest = ("Apple ID account and device information", 
                                "Apple Media Services information", 
                                "Apple Pay activity",
                                "Game Center")
                                #"Marketing communications")

    # Parse through apple media root directory
    #rootPathName = "./media/unzippedFiles/apple/" + appleDataDumpName
    rootPathName = "../media/unzippedFiles/apple/" + appleDataDumpName

    if os.path.exists(rootPathName):

        # Get total size
        Dict["totalSizeInGB"] = genericParser.getDirSizeInGB(rootPathName)
        
        # Extract json data
        for root, dirs, files in genericParser.walklevel(rootPathName, level=1):
            # from https://stackoverflow.com/a/7253830
            categoryDirName = root.rsplit('/', 1)[-1]
            
            # if category is valid,
            # add data of interest to dictionary
            dirPath = rootPathName + "/" + categoryDirName
            if any(categoryDirName in category for category in rootCategoriesOfInterest) and os.path.exists(dirPath):

                if categoryDirName == "Apple ID account and device information":
                    # -----  -----
                    file_account_info = "Apple ID Account Information.csv"
                    fieldNames = ("Apple ID Number", "First Name", "Last Name", "Official Address")
                    data_account_info = genericParser.csvToDict(dirPath + "/" + file_account_info, fieldNames)


                    key_apple_id = "apple_id_number"
                    val_apple_id = data_account_info["Apple ID Number"][0]
                    Dict[key_apple_id] = val_apple_id

                    key_name = "name"
                    val_name = data_account_info["First Name"][0] + " " + data_account_info["Last Name"][0]
                    Dict[key_name] = val_name

                    key_address = "address"
                    val_address = data_account_info["Official Address"][0]
                    Dict[key_address] = val_address

                    # -----  -----
                    file_devices = "Apple ID Device Information.csv"
                    fieldNames = ("Device Name", "Device Added Date", "Device Serial Number", "Device Last Heartbeat IP")
                    data_devices = genericParser.csvToDict(dirPath + "/" + file_devices, fieldNames)


                    key_device_name = "device_name"
                    val_device_name = data_devices["Device Name"]
                    Dict[key_device_name] = val_device_name

                    key_device_added_date = "device_added_date"
                    val_device_added_date = data_devices["Device Added Date"]
                    Dict[key_device_added_date] = val_device_added_date

                    key_device_serial = "device_serial_number"
                    val_device_serial = data_devices["Device Serial Number"]
                    Dict[key_device_serial] = val_device_serial

                    key_device_last_heartbeat_IP_addr = "device_last_heartbeat_IP_addr"
                    val_device_last_heartbeat_IP_addr = data_devices["Device Last Heartbeat IP"]
                    Dict[key_device_last_heartbeat_IP_addr] = val_device_last_heartbeat_IP_addr

                elif categoryDirName == "Apple Media Services information":
                    zipPath = dirPath + "/" + "Apple_Media_Services.zip"
                    with zipfile.ZipFile(zipPath, "r") as zip_ref:
                        zip_ref.extractall(dirPath)
                    
                    # -----  -----
                    file_recent_tracks = "Apple_Media_Services/Apple Music Activity/Apple Music - Recently Played Tracks.csv"
                    fieldNames = ("Last Modified", "Track Description")
                    data_recent_tracks = genericParser.csvToDict(dirPath + "/" + file_recent_tracks, fieldNames)


                    key_recently_played = "apple_music_recently_played"
                    artist = data_recent_tracks["Track Description"].str.split(" - ").str[0]
                    title = data_recent_tracks["Track Description"].str.split(" - ").str[1]               
                    date = data_recent_tracks["Last Modified"]

                    val_recently_played = list(zip(artist, title, date))
                    #TODO: convert to dict 

                    print(val_recently_played)

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
                    #data_library_activity = genericParser.jsonToDict(dirPath, file_library_activity)

                    key_library_activity = "apple_music_library_activity"

                    #-----  -----
                    file_library_tracks = "Apple Music Library Tracks.json"
                    #data_library_tracks = genericParser.jsonToDict(dirPath, file_library_tracks)

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
                    data_game_center = genericParser.jsonToDict(dirPath + "/" + file_game_center)

                    key_games = "games"
                    
                #elif categoryDirName == "Marketing communications":
                    # -----  -----
                    
                else: 
                    print("category not found") 
            
    else: print("given root path does not exist")

    #write parsed data dictionary to json file


    return Dict

def main():
    root = "apple-lisa"
    parseAppleData(root)

if __name__ == "__main__":
    main() 
