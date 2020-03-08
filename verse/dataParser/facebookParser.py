import os
from os import path
import string
import json
from pprint import pprint
import sqlite3 as lite 
from sqlite3 import Error

# Function to traverse *some_dir* with a specified *level* of recursive depth
# From https://stackoverflow.com/a/234329
def walklevel(some_dir, level=1):
    some_dir = some_dir.rstrip(os.path.sep)
    assert os.path.isdir(some_dir)
    num_sep = some_dir.count(os.path.sep)
    for root, dirs, files in os.walk(some_dir):
        yield root, dirs, files
        num_sep_this = root.count(os.path.sep)
        if num_sep + level <= num_sep_this:
            del dirs[:]

# Function to extract json data from the directory at *pathName*,
# concatenate *rootDir* and *fileOfInterest*, 
# and return a key and value pair 
def jsonFileToString(pathName, rootDir, fileOfInterest):
    fileName = pathName + "/" + rootDir + "/" + fileOfInterest

    with open(fileName) as jsonFile:
        data = json.load(jsonFile)

    key = rootDir + ">" + fileOfInterest[:-5]
    value = data

    return key, value

# Function to grab the websites from the off-facebook activity file.
# returns a list of sites
def getWebsites(fileName):
    jsonStr = open(fileName).read()
    data = json.loads(jsonStr)
    
    sites = []
    for app in data["off_facebook_activity"]:
        for key in app:
            if key == "name":
                site = app[key]
                for i in site:
                    if i == '.':
                        sites.append(site)
                        break
    return sites
    
                    

# Function to extract json data from the root directory of facebook data 
# and input into a dictionary
def parseFacebookData(facebookMediaRoot): 
    # Define dictionary to map json data to
    Dict = {}

    # Define tuple to store all possible root directory names in the data dump
    rootCategories = ("about_you", "ads_and_businesses", "apps_and_websites", "comments", 
                "events", "following_and_followers", "friends", "groups", 
                "likes_and_reactions", "location", "marketplace", "messages", 
                "other_activity", "pages", "payment_history", "photos_and_videos", 
                "portal", "posts", "profile_information", "saved_items_and_collections", 
                "search_history", "security_and_login_information", "stories", "your_places")

    # Define tuple to store root directory names of interest
    rootCategoriesOfInterest = ("ads_and_businesses", "posts", "profile_information")

    # Parse through facebook media root directory and extract json data
    pathVerseFacebookMedia = "media/unzippedFiles/facebook/"
    if(path.exists(pathVerseFacebookMedia)):
        pathName = pathVerseFacebookMedia + facebookMediaRoot

        conn = None
        try:
            conn = lite.connect(r"pythonsqlite.db")
        except Error as e:
            print(e)

        unique_id = '0' 
        post = 'no post file' 
        other_post = 'no other post file' 
        info = 'no profile file'
        history = 'no profile history file' 
        ad = 'no advertiser data file' 
        off_facebook = 'no off facebook data'
        
        for root, dirs, files in walklevel(pathName, level=1):
            # from https://stackoverflow.com/a/7253830
            rootDir = root.rsplit('/', 1)[-1]
            
            # if category is valid,
            # add category as key and 
            # directory contents as value 
            # to dictionary
            if any(rootDir in category for category in rootCategoriesOfInterest):
                #print(rootDir + ": ")

                if rootDir == "ads_and_businesses":
                    fileOfInterest1 = "advertisers_who_uploaded_a_contact_list_with_your_information.json"

                    key1, value1 = jsonFileToString(pathName, rootDir, fileOfInterest1)
                    Dict[key1] = value1
                    ad = pathName + "/" + fileOfInterest1

                    fileOfInterest2 = "your_off-facebook_activity.json"

                    fileName = pathName + "/" + rootDir + "/" + fileOfInterest2

                    sites = getWebsites(fileName)
                    
                    Dict["Number of Websites"] = len(sites)
                    Dict["List of Websites"] = sites
                    
                    off_facebook = pathName + "/" + fileOfInterest2

                elif rootDir == "posts":
                    fileOfInterest1 = "other_people's_posts_to_your_timeline.json"
                    key1, value1 = jsonFileToString(pathName, rootDir, fileOfInterest1)
                    Dict[key1] = value1
                    other_post = pathName + "/" + fileOfInterest1

                    fileOfInterest2 = "your_posts_1.json"
                    key2, value2 = jsonFileToString(pathName, rootDir, fileOfInterest2)
                    Dict[key2] = value2
                    post = pathName + "/" + fileOfInterest2
                    
                elif rootDir == "profile_information":
                    fileOfInterest1 = "profile_information.json"
                    key1, value1 = jsonFileToString(pathName, rootDir, fileOfInterest1)
                    Dict[key1] = value1
                    info = pathName + "/" + fileOfInterest1

                    fileOfInterest2 = "profile_update_history.json"
                    key2, value2 = jsonFileToString(pathName, rootDir, fileOfInterest2)
                    Dict[key2] = value2
                    history = pathName + "/" + fileOfInterest2
                

        if conn is not None:
            sql_insert = """INSERT INTO facebook ( id, posts, other_posts, profile_info, profile_history, advertisers, off_facebook ) 
                            VALUES ( ?, ?, ?, ?, ?, ?, ?);"""

            try:
                c = conn.cursor()
                with conn:
                    data_tuple = (int(unique_id), str(post), str(other_post), str(info), str(history), str(ad), str(off_facebook))
                    c.execute(sql_insert, data_tuple)
                    # print the contents of the database
                    # c.execute("SELECT * FROM facebook")
                    # print(c.fetchall())
                    # delete contents of the database
                    c.execute("DELETE FROM facebook")
            except Error as e:
                print(e)
        
        #print("\n\n\nDictionary\n")
        #print(Dict["posts>your_posts_1"])

    else: print("path does not exist")

def main():
    root = "facebook-jacksonoriez"
    parseFacebookData(root)

if __name__ == "__main__":
    main()