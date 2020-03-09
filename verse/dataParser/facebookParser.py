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

# Function: traverse entire data dump directory and calculate size in GB
# Return: size of directory in GB
# Source: https://www.tutorialspoint.com/How-to-calculate-a-directory-size-using-Python
def getDirSizeInGB(rootPathName):
    totalSize = 0

    totalSize += os.path.getsize(rootPathName)

    for path, dirs, files in os.walk(rootPathName):
        for f in files:
            fp = os.path.join(path, f)
            totalSize += os.path.getsize(fp)
    
    # round to 2 decimal places
    sizeInGB = round(totalSize/(1024*1024*1024), 2)

    return sizeInGB

# Function: extract json data and load into dictionary
# Return: dictionary with json loaded
def jsonToDictionary(rootPathName, rootDir, fileOfInterest):
    # Ex: "facebook-lisasilmii" + "/" + "posts" + "/" + "your_posts_1.json"
    filePath = rootPathName + "/" + rootDir + "/" + fileOfInterest

    # Load json into dictionary
    with open(filePath) as jsonFile:
        data = json.load(jsonFile)

    return data

# Function: extract json data from the root directory of facebook data 
#   and input into a dictionary
#
# Return: dictionary
def parseFacebookData(facebookMediaRoot): 
    # Define dictionary to map json data to
    Dict = {}

    # Define tuple to store root directory names of interest
    rootCategoriesOfInterest = ("about_you", "ads_and_businesses", "apps_and_websites", 
                                "likes_and_reactions", "posts", 
                                "profile_information", "security_and_login_information")

    # Parse through facebook media root directory
    pathVerseFacebookMedia = "../media/unzippedFiles/facebook/"
    if(path.exists(pathVerseFacebookMedia)):
        rootPathName = pathVerseFacebookMedia + facebookMediaRoot

        # Get total size
        Dict["totalSizeInGB"] = getDirSizeInGB(rootPathName)
             
        # Extract json data
        for root, dirs, files in walklevel(rootPathName, level=1):
            # from https://stackoverflow.com/a/7253830
            rootDir = root.rsplit('/', 1)[-1]
            
            # if category is valid,
            # add data of interest to dictionary
            if any(rootDir in category for category in rootCategoriesOfInterest):

                if rootDir == "about_you":
                    # US 6.1
                    file_peer_group = "friend_peer_group.json"
                    data_peer_group = jsonToDictionary(rootPathName, rootDir, file_peer_group)

                    key_peer_group = file_peer_group[:-5]
                    val_peer_group = data_peer_group["friend_peer_group"]
                    
                    Dict[key_peer_group] = val_peer_group

                elif rootDir == "ads_and_businesses":
                    # US 6.8
                    file_off_facebook_activity = "your_off-facebook_activity.json"
                    data_off_facebook_activity = jsonToDictionary(rootPathName, rootDir, file_off_facebook_activity)

                    key_ct_off_facebook_activity = "num_businesses_off_facebook"
                    val_ct_off_facebook_activity = len(data_off_facebook_activity["off_facebook_activity"])
                    Dict[key_ct_off_facebook_activity] = val_ct_off_facebook_activity

                    #from https://stackoverflow.com/a/56163468
                    list_businesses_off_facebook = [item.get("name") for item in data_off_facebook_activity["off_facebook_activity"]]

                    key_list_businesses_off_facebook = "businesses_off_facebook"
                    val_list_businesses_off_facebook = list_businesses_off_facebook
                    Dict[key_list_businesses_off_facebook] = val_list_businesses_off_facebook

                    # US 6.10
                    key_list_off_facebook_activity = "off_facebook_activity"
                    val_list_off_facebook_activity = data_off_facebook_activity["off_facebook_activity"]
                    Dict[key_list_off_facebook_activity] = val_list_off_facebook_activity

                    # US 6.9
                    file_advs = "advertisers_who_uploaded_a_contact_list_with_your_information.json"
                    data_advs = jsonToDictionary(rootPathName, rootDir, file_advs)

                    key_advs = file_advs[:-5]
                    val_advs = data_advs["custom_audiences"]
                    Dict[key_advs] = val_advs

                elif rootDir == "apps_and_websites":
                    file_apps_websites = "apps_and_websites.json"
                    data_apps_websites = jsonToDictionary(rootPathName, rootDir, file_apps_websites)

                    # US 6.5
                    key_ct_apps_websites = "num_apps_and_websites_logged_into_with_facebook"
                    val_ct_apps_websties = len(data_apps_websites["installed_apps"])
                    Dict[key_ct_apps_websites] = val_ct_apps_websties

                    # US 6.6
                    key_list_apps_websites = "apps_and_websites_logged_into_with_facebook"
                    val_list_apps_websites = data_apps_websites["installed_apps"]
                    Dict[key_list_apps_websites] = val_list_apps_websites
                    
                elif rootDir == "likes_and_reactions":
                    file_reactions = "posts_and_comments.json"
                    data_reactions = jsonToDictionary(rootPathName, rootDir, file_reactions)

                    # US 6.4
                    key_reactions = "reactions"
                    val_reactions = data_reactions["reactions"]
                    Dict[key_reactions] = val_reactions

                elif rootDir == "posts":
                    # US 6.3
                    file_others_posts = "other_people's_posts_to_your_timeline.json"
                    data_others_posts = jsonToDictionary(rootPathName, rootDir, file_others_posts)

                    key_others_posts = file_others_posts[:-5]
                    val_others_posts = data_others_posts["wall_posts_sent_to_you"]["activity_log_data"]
                    Dict[key_others_posts] = val_others_posts

                    # US 6.3
                    file_your_posts = "your_posts_1.json"
                    data_your_posts = jsonToDictionary(rootPathName, rootDir, file_your_posts)

                    key_your_posts = file_your_posts[:-5]
                    val_your_posts = data_your_posts
                    Dict[key_your_posts] = val_your_posts
                    
                elif rootDir == "profile_information":
                    # your profile info
                    file_profile_info = "profile_information.json"
                    data_profile_info = jsonToDictionary(rootPathName, rootDir, file_profile_info)

                    #entire entry
                    key_profile_info = file_profile_info[:-5]
                    val_profile_info = data_profile_info["profile"]
                    Dict[key_profile_info] = val_profile_info

                    # US 6.1
                    key_name = "name"
                    val_name = data_profile_info["profile"]["name"]["full_name"]
                    Dict[key_name] = val_name

                    # your profile info update history
                    file_profile_update_history = "profile_update_history.json"
                    data_profile_update_history = jsonToDictionary(rootPathName, rootDir, file_profile_update_history)

                    #entire entry
                    key_profile_update_history = file_profile_update_history[:-5]
                    val_profile_update_history = data_profile_update_history["profile_updates"]
                    Dict[key_profile_update_history] = val_profile_update_history

                elif rootDir == "security_and_login_information":
                    file_logins_logouts = "logins_and_logouts.json"
                    data_logins_logouts = jsonToDictionary(rootPathName, rootDir, file_logins_logouts)

                    # US 6.2
                    key_logins_logouts = file_logins_logouts[:5]
                    val_logins_logouts = data_logins_logouts["account_accesses"]
                    Dict[key_logins_logouts] = val_logins_logouts

                else: print("category not found")


    else: print("path does not exist")

    return Dict

def main():
    root = "facebook-lisasilmii"
    facebookData = parseFacebookData(root)

    #print(facebookData["ads_and_businesses>advertisers_who_uploaded_a_contact_list_with_your_information"])

if __name__ == "__main__":
    main()