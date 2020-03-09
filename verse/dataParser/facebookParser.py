import os
from os import path
import string
import json
from pprint import pprint

# Function: traverse *some_dir* with a specified *level* of recursive depth
# Return: null
# Source: https://stackoverflow.com/a/234329
def walklevel(some_dir, level=1):
    some_dir = some_dir.rstrip(os.path.sep)
    assert os.path.isdir(some_dir)
    num_sep = some_dir.count(os.path.sep)
    for root, dirs, files in os.walk(some_dir):
        yield root, dirs, files
        num_sep_this = root.count(os.path.sep)
        if num_sep + level <= num_sep_this:
            del dirs[:]

# Function: extract json data from the directory at *rootPathName*,
#   concatenate *rootDir* and *fileOfInterest*
#
# Return: key and value pair 
def jsonFileToString(rootPathName, rootDir, fileOfInterest):
    # Ex: "facebook-lisasilmii" + "/" + "posts" + "/" + "your_posts_1.json"
    filePath = rootPathName + "/" + rootDir + "/" + fileOfInterest

    # Format the key of the dict
    key = rootDir + ">" + fileOfInterest[:-5]

    # Extract the specific fields of info under consideration
    with open(filePath) as jsonFile:
        data = json.load(jsonFile)

    if (fileOfInterest == "advertisers_who_uploaded_a_contact_list_with_your_information.json"):
        value = data["custom_audiences"]

    elif (fileOfInterest == "other_people's_posts_to_your_timeline.json"):
        value = data["wall_posts_sent_to_you"]

    elif (fileOfInterest == "your_posts_1.json"):
        value = data

    elif (fileOfInterest == "profile_information"):
        value = data["profile"]

    elif (fileOfInterest == "profile_update_history.json"):
        value = data["profile_updates"]
    
    else: value = data

    # Return key value pair
    return key, value

# Function: extract json data from the root directory of facebook data 
#   and input into a dictionary
#
# Return: dictionary
def parseFacebookData(facebookMediaRoot): 
    # Define dictionary to map json data to
    Dict = {}

    # Define tuple to store root directory names of interest
    rootCategoriesOfInterest = ("ads_and_businesses", "posts", "profile_information")

    # Parse through facebook media root directory and extract json data
    pathVerseFacebookMedia = "../media/unzippedFiles/facebook/"
    if(path.exists(pathVerseFacebookMedia)):
        rootPathName = pathVerseFacebookMedia + facebookMediaRoot
        
        for root, dirs, files in walklevel(rootPathName, level=1):
            # from https://stackoverflow.com/a/7253830
            rootDir = root.rsplit('/', 1)[-1]
            
            # if category is valid,
            # add category as key and 
            # directory contents as value 
            # to dictionary
            if any(rootDir in category for category in rootCategoriesOfInterest):

                if rootDir == "ads_and_businesses":
                    fileOfInterest = "advertisers_who_uploaded_a_contact_list_with_your_information.json"

                    key, value = jsonFileToString(rootPathName, rootDir, fileOfInterest)
                    Dict[key] = value

                elif rootDir == "posts":
                    fileOfInterest1 = "other_people's_posts_to_your_timeline.json"
                    key1, value1 = jsonFileToString(rootPathName, rootDir, fileOfInterest1)
                    Dict[key1] = value1

                    fileOfInterest2 = "your_posts_1.json"
                    key2, value2 = jsonFileToString(rootPathName, rootDir, fileOfInterest2)
                    Dict[key2] = value2
                    
                elif rootDir == "profile_information":
                    fileOfInterest1 = "profile_information.json"
                    key1, value1 = jsonFileToString(rootPathName, rootDir, fileOfInterest1)
                    Dict[key1] = value1

                    fileOfInterest2 = "profile_update_history.json"
                    key2, value2 = jsonFileToString(rootPathName, rootDir, fileOfInterest2)
                    Dict[key2] = value2

    else: print("path does not exist")

    return Dict

def main():
    root = "facebook-lisasilmii"
    facebookData = parseFacebookData(root)

    print(facebookData["ads_and_businesses>advertisers_who_uploaded_a_contact_list_with_your_information"])

if __name__ == "__main__":
    main()