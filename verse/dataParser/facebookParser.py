import os
from os import path
import string
import json
from pprint import pprint

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
    pathVerseFacebookMedia = "../media/unzippedFiles/facebook/"
    if(path.exists(pathVerseFacebookMedia)):
        pathName = pathVerseFacebookMedia + facebookMediaRoot
        
        for root, dirs, files in walklevel(pathName, level=1):
            # from https://stackoverflow.com/a/7253830
            rootDir = root.rsplit('/', 1)[-1]
            
            # if category is valid,
            # add category as key and 
            # directory contents as value 
            # to dictionary
            if any(rootDir in category for category in rootCategoriesOfInterest):
                print(rootDir + ": ")

                if rootDir == "ads_and_businesses":
                    fileOfInterest = "advertisers_who_uploaded_a_contact_list_with_your_information.json"

                    key, value = jsonFileToString(pathName, rootDir, fileOfInterest)
                    Dict[key] = value

                elif rootDir == "posts":
                    fileOfInterest1 = "other_people's_posts_to_your_timeline.json"
                    key1, value1 = jsonFileToString(pathName, rootDir, fileOfInterest1)
                    Dict[key1] = value1

                    fileOfInterest2 = "your_posts_1.json"
                    key2, value2 = jsonFileToString(pathName, rootDir, fileOfInterest2)
                    Dict[key2] = value2
                    
                elif rootDir == "profile_information":
                    fileOfInterest1 = "profile_information.json"
                    key1, value1 = jsonFileToString(pathName, rootDir, fileOfInterest1)
                    Dict[key1] = value1

                    fileOfInterest2 = "profile_update_history.json"
                    key2, value2 = jsonFileToString(pathName, rootDir, fileOfInterest2)
                    Dict[key2] = value2
        
        #print("\n\n\nDictionary\n")
        #print(Dict["posts>your_posts_1"])

    else: print("path does not exist")

def main():
    root = "facebook-lisasilmii"
    parseFacebookData(root)

if __name__ == "__main__":
    main()