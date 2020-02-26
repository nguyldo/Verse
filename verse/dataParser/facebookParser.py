import os
from os import path

import string

# Code from https://stackoverflow.com/a/234329
def walklevel(some_dir, level=1):
    some_dir = some_dir.rstrip(os.path.sep)
    assert os.path.isdir(some_dir)
    num_sep = some_dir.count(os.path.sep)
    for root, dirs, files in os.walk(some_dir):
        yield root, dirs, files
        num_sep_this = root.count(os.path.sep)
        if num_sep + level <= num_sep_this:
            del dirs[:]

def 
# Define dictionary to map 
Dict = {}
print(Dict)

# Define tuple to store all possible directory names in the data dump
categories = ("about_you", "ads_and_businesses", "apps_and_websites", "comments", 
            "events", "following_and_followers", "friends", "groups", 
            "likes_and_reactions", "location", "marketplace", "messages", 
            "other_activity", "pages", "payment_history", "photos_and_videos", 
            "portal", "posts", "profile_information", "saved_items_and_collections", 
            "search_history", "security_and_login_information", "stories", "your_places")


#if (any("about_you" in category for category in categories)):
#    print("about_you exists")

# TODO: get expected directory name passed from views.py after file has been uploaded, so the parser knows which directory to walk

# Print directory structure under uploaded and unzipped folder
if(path.exists("../media")):
    print("path exists")

    for root, dirs, files in walklevel("../media/unzippedFiles/facebook-lisasilmii", level=1):
        # code from https://stackoverflow.com/a/7253830
        root_dir = root.rsplit('/', 1)[-1]
        
        #if category is valid
        if (any(root_dir in category for category in categories)):
            #add category as key to dictionary and directory contents as value

            if not dirs:
                Dict[root_dir] = files
            else:
                Dict[root_dir] = dirs

    print(Dict)

else: print("path does not exist")

