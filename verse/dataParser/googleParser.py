import os
from os import path
import string
import json
from pprint import pprint
import sqlite3 as lite 
from sqlite3 import Error
import mailbox
from verse.dataParser import genericParser

def parseGoogleData(googleMediaRoot):
    # Define dictionary to map json data to
    Dict = {}

    # Define tuple to store all possible root directory names in the data dump
    rootCategories = ("Bookmarks", "Chrome", "Drive", "Keep", "Mail", "Maps", "My Activity", "News", "Profile", "Saved", "Tasks", "YouTube")

    # Define tuple to store root directory names of interest
    rootCategoriesOfInterest = ("Chrome", "Drive", "Mail", "My Activity", "Profile", "YouTube")

    # Parse through google media root directory and extract json data
    pathVerseGoogleMedia = "media/unzippedFiles/google/"
    if(path.exists(pathVerseGoogleMedia)):
        pathName = pathVerseGoogleMedia + googleMediaRoot

        conn = None
        try:
            conn = lite.connect(r"pythonsqlite.db")
        except Error as e:
            print(e)

        unique_id = '0'
        size = '10'
        browserhistory = 'no browser history info'
        drive = 'no drive info'
        mail = 'no mail info'
        # Activity info
        android = 'no android info'
        maps = 'no maps info'
        search = 'no search info'
        voiceAudio = 'no voice and audio info'
        profile = 'no profile info'
        # Youtube info
        youtubeHistory = 'no youtube info'
        youtubeComments = 'no youtube coments'
        youtubePlaylists = 'no youtube playlists'
        youtubeSubscriptions = 'no youtube subscriptions'

        
        for root, dirs, files in walklevel(pathName, level=1):
            # from https://stackoverflow.com/a/7253830
            rootDir = root.rsplit('/', 1)[-1]
            rootMyActivityAndroid = rootDir + "/Android"
            rootMyActivityMaps = rootDir + "/Maps"
            rootMyActivitySearch = rootDir + "/Search"
            rootMyActivityVoiceAudio = rootDir + "/Voice and Audio"
            rootYoutubeHistory = rootDir + "/history"
            rootYoutubeComments = rootDir + "/my-comments"
            rootYoutubePlaylists = rootDir + "/playlists"
            rootYoutubeSubscriptions = rootDir + "/subscriptions"



            
            # Android, Assistant, Gmail, Maps, Search, Sound Search, and Voice and Audio
            # if category is valid,
            # add category as key and 
            # directory contents as value 
            # to dictionary
            if any(rootDir in category for category in rootCategoriesOfInterest):
                print(rootDir + ": ")

                if rootDir == "Chrome":

                    fileOfInterest = "BrowserHistory"
                    key, value = jsonFileToString(pathName, rootDir, fileOfInterest)
                    Dict[key] = value
                    browserhistory = value

                elif rootDir == "Drive":
                    # Inside Drive is all of the user's material that is saved inside their Google Drive.
                    # There isn't much to look at except the number of files?
                    # Number of different files

                    # TODO: Parse the number of files?
                    drive = len([name for name in os.listdir('.')])
                    
                elif rootDir == "Mail":
                    fileOfInterest = "All mail Including Spam and Trash.mbox"
                    # TODO: Parse a mbox file

                    message = mailbox.mbox(fileOfInterest)
                    content = ''.join(part.get_payload(decode=True) for part in message.get_payload())

                    Dict[key1] = content
                    mail = content

                elif rootDir == "My Activity":
                    ignorethis = ""
                    # My Activity has a lot of folders listing activities done in all available apps including
                    # Android, Assistant, Gmail, Maps, Search, Sound Search, and Voice and Audio

                    # Android (html): File of app accesses on your Andoird phone and time accessed
                    # DON'T USE - Assistant (mp3): List of audio files from times using assistant ("Hey Google")
                    # DON'T USE - Gmail (html): File of searches done in gmail
                    # Maps (html): File of searches, directions, and accesses of Google Maps
                    # Search (html): File of google searches
                    # Voice and Audio (mp3): More complete list of audio files from times using assistant ("Hey Google")

                    # TODO: Parse these folders and the files inside them

                    if os.path.exists(rootMyActivityAndroid):
                        dothing = 0
                             
                    if os.path.exists(rootMyActivityMaps):
                        dothing = 0

                    if os.path.exists(rootMyActivitySearch):
                        dothing = 0

                    if os.path.exists(rootMyActivityVoiceAudio):
                        voiceAudio = len([name for name in os.listdir('.') if os.path.isfile(rootMyActivityVoiceAudio)])
                    


                elif rootDir == "Profile":
                    fileOfInterest1 = "Profile"
                    key1, value1 = jsonFileToString(pathName, rootDir, fileOfInterest1)
                    Dict[key1] = value1
                    profile = value1 

                elif rootDir == "YouTube":
                    ignorethis = ""
                    # YouTube has folders containing the different information for each field including
                    # history, my-comments, playlists, and subscriptions

                    # history (html): File of watch history
                    # my-comments (html): File of comments posted with time
                    # playlists (json): List of json youtube playlists
                    # subscriptions (html): File of subscriptions

                    # TODO: Parse these folders and the files inside them

                    if os.path.exists(rootYoutubeHistory):
                        dothing = 0
                    
                    if os.path.exists(rootYoutubeComments):
                        dothing = 0
                    
                    if os.path.exists(rootYoutubePlaylists):
                        youtubePlaylists = len([name for name in os.listdir('.') if os.path.isfile(rootYoutubePlaylists)])
                    
                    if os.path.exists(rootYoutubeSubscriptions):
                        dothing = 0
                    


        if conn is not None:
            # TODO: finish the parameters/arguments
            sql_insert = """INSERT INTO google ( id, total_size) 
                            VALUES ( ?, ?, ?, ?, ?, ?, ?);"""

            try:
                c = conn.cursor()
                with conn:
                    # TODO: finish the data_tuple
                    data_tuple = (int(unique_id), int(size))
                    c.execute(sql_insert, data_tuple)
                    # print the contents of the database
                    c.execute("SELECT * FROM google")
                    print(c.fetchall())
                    # delete contents of the database
                    c.execute("DELETE FROM google")
            except Error as e:
                print(e)
        
        #print("\n\n\nDictionary\n")
        #print(Dict["posts>your_posts_1"])

    else: print("path does not exist")

def main():
    root = "takeout-20200124T220752Z-001"
    parseGoogleData(root)

if __name__ == "__main__":
    main()