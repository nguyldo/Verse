#!/usr/bin/env python3

import os
import string
import sqlite3 as lite 
from sqlite3 import Error
from random import randint

#TODO: uncomment first if running through django and second if through python
from dataParser import genericParser  
#import genericParser

# Function: extracts json data from the root directory of facebook data 
# Return: a dictionary with parsed data
def parseFacebookData(facebookDataDumpName): 
    # Define dictionary to map json data to
    Dict = {}

    # Define tuple to store root directory names of interest
    rootCategoriesOfInterest = ("about_you", "ads_and_businesses", "apps_and_websites", 
                                "friends", "likes_and_reactions", "other_activity", "posts", 
                                "profile_information", "security_and_login_information")

    # Parse through facebook media root directory
    #TODO: uncomment first if running through django and second if through python
    rootPathName = "./media/unzippedFiles/facebook/" + facebookDataDumpName
    #rootPathName = "../media/unzippedFiles/facebook/" + facebookDataDumpName

    if os.path.exists(rootPathName):

        # Get total size
        Dict["total_size_bignum"] = genericParser.getDirSizeInGB(rootPathName)
        
        # Extract json data
        for root, dirs, files in genericParser.walklevel(rootPathName, level=1):
            # from https://stackoverflow.com/a/7253830
            categoryDirName = root.rsplit('/', 1)[-1]
            
            # if category is valid,
            # add data of interest to dictionary
            dirPath = rootPathName + "/" + categoryDirName
            if any(categoryDirName in category for category in rootCategoriesOfInterest) and os.path.exists(dirPath):
                if categoryDirName == "about_you":
                    # ----- US 6.1 -----
                    file_peer_group = "friend_peer_group.json"
                    data_peer_group = genericParser.jsonToDict(dirPath + "/" + file_peer_group, ())

                    # user friend group category
                    key_peer_group = "friend_peer_group"
                    val_peer_group = data_peer_group["friend_peer_group"]
                    Dict[key_peer_group] = val_peer_group

                elif categoryDirName == "ads_and_businesses":
                    # ----- US 6.8 -----
                    file_off_facebook_activity = "your_off-facebook_activity.json"
                    data_off_facebook_activity = genericParser.jsonToDict(dirPath + "/" + file_off_facebook_activity, ())

                    # overall json superset of off facebook activity
                    key_list_off_facebook_activity = "off_facebook_activity"
                    val_list_off_facebook_activity = data_off_facebook_activity["off_facebook_activity"]
                    Dict[key_list_off_facebook_activity] = val_list_off_facebook_activity

                    # count of off facebook business with data
                    key_ct_off_facebook_activity = "num_businesses_off_facebook"
                    val_ct_off_facebook_activity = len(data_off_facebook_activity["off_facebook_activity"])
                    Dict[key_ct_off_facebook_activity] = val_ct_off_facebook_activity

                    # list of off facebook businesses with data
                    # from https://stackoverflow.com/a/56163468
                    list_businesses_off_facebook = [item.get("name") for item in data_off_facebook_activity["off_facebook_activity"]]

                    key_list_businesses_off_facebook = "businesses_off_facebook"
                    val_list_businesses_off_facebook = list_businesses_off_facebook
                    Dict[key_list_businesses_off_facebook] = val_list_businesses_off_facebook

                    # ----- US 6.9 -----
                    file_advs = "advertisers_who_uploaded_a_contact_list_with_your_information.json"
                    data_advs = genericParser.jsonToDict(dirPath + "/" + file_advs, ())

                    # list of advertisers with your contact info
                    key_advs = file_advs[:-5]
                    val_advs = data_advs["custom_audiences"]
                    Dict[key_advs] = val_advs

                    # count of advertisers with your contact info
                    key_ct_advs = "num_advertisers"
                    val_ct_advs = len(val_advs)
                    Dict[key_ct_advs] = val_ct_advs

                elif categoryDirName == "apps_and_websites":
                    # ----- US 6.5 & 6.6 -----
                    file_apps_websites = "apps_and_websites.json"
                    data_apps_websites = genericParser.jsonToDict(dirPath + "/" + file_apps_websites, ())

                    # count of apps/websites that you used facebook to login
                    key_ct_apps_websites = "num_apps_and_websites_logged_into_with_facebook"
                    val_ct_apps_websties = len(data_apps_websites["installed_apps"])
                    Dict[key_ct_apps_websites] = val_ct_apps_websties

                    # list of apps/websites that you used facebook to login 
                    key_list_apps_websites = "apps_and_websites_logged_into_with_facebook"
                    val_list_apps_websites = data_apps_websites["installed_apps"]
                    Dict[key_list_apps_websites] = val_list_apps_websites

                elif categoryDirName == "friends":
                    # ----- US 6.10 -----
                    file_friends = "friends.json"
                    data_friends = genericParser.jsonToDict(dirPath + "/" + file_friends, ())

                    # count of facebook friends
                    key_ct_friends = "num_friends"
                    val_ct_friends = len(data_friends["friends"])
                    Dict[key_ct_friends] = val_ct_friends

                    # list of facebook friends
                    list_friends = [item.get("name") for item in data_friends["friends"]]

                    key_friends = "friends"
                    val_friends = list_friends
                    Dict[key_friends] = val_friends
                    
                elif categoryDirName == "likes_and_reactions":
                    # ----- US 6.4 -----
                    file_reactions = "posts_and_comments.json"
                    data_reactions = genericParser.jsonToDict(dirPath + "/" + file_reactions, ())

                    # overall json superset of reactions
                    key_reactions = "reactions"
                    val_reactions = data_reactions["reactions"]
                    Dict[key_reactions] = val_reactions

                elif categoryDirName == "other_activity":
                    # ----- US 6.10 -----
                    file_pokes = "pokes.json"
                    data_pokes = genericParser.jsonToDict(dirPath + "/" + file_pokes, ())

                    # count of pokes
                    key_ct_pokes = "num_pokes"
                    if "activity_log_data" in data_pokes["pokes"]:
                        val_ct_pokes = len(data_pokes["pokes"]["activity_log_data"])
                        pokes = dirPath + "/" + file_pokes
                    else:
                        val_ct_pokes = 0
                    Dict[key_ct_pokes] = val_ct_pokes

                    # overall json superset of pokes
                    key_pokes = "pokes"
                    if "activity_log_data" in data_pokes["pokes"]:
                        val_pokes = data_pokes["pokes"]["activity_log_data"]
                    else:
                        val_pokes = 'no pokes'
                    Dict[key_pokes] = val_pokes

                elif categoryDirName == "posts":
                    # ----- US 6.3 -----
                    file_others_posts = "other_people's_posts_to_your_timeline.json"
                    data_others_posts = genericParser.jsonToDict(dirPath + "/" + file_others_posts, ())

                    # overall json superset of others posts
                    key_others_posts = file_others_posts[:-5]
                    val_others_posts = data_others_posts["wall_posts_sent_to_you"]["activity_log_data"]
                    Dict[key_others_posts] = val_others_posts

                    # ----- US 6.3 -----
                    file_your_posts = "your_posts_1.json"
                    data_your_posts = genericParser.jsonToDict(dirPath + "/" + file_your_posts, ())

                    # overall json superset of your posts
                    key_your_posts = "your_posts"
                    val_your_posts = data_your_posts
                    Dict[key_your_posts] = val_your_posts

                elif categoryDirName == "profile_information":
                    # ----- US 6.1 -----
                    file_profile_info = "profile_information.json"
                    data_profile_info = genericParser.jsonToDict(dirPath + "/" + file_profile_info, ())

                    # overall json superset of your profile info
                    key_profile_info = "profile_information"
                    val_profile_info = data_profile_info["profile"]
                    Dict[key_profile_info] = val_profile_info

                    # your name
                    key_name = "name"
                    val_name = data_profile_info["profile"]["name"]["full_name"]
                    Dict[key_name] = val_name

                    # ----- US 6.10 -----
                    file_profile_update_history = "profile_update_history.json"
                    data_profile_update_history = genericParser.jsonToDict(dirPath + "/" + file_profile_update_history, ())

                    # overall json superset of your profile update history
                    key_profile_update_history = "profile_update_history"
                    val_profile_update_history = data_profile_update_history["profile_updates"]
                    Dict[key_profile_update_history] = val_profile_update_history

                elif categoryDirName == "security_and_login_information":
                    # ----- US 6.2 -----
                    file_logins_logouts = "logins_and_logouts.json"
                    data_logins_logouts = genericParser.jsonToDict(dirPath + "/" + file_logins_logouts, ())

                    # overall json superset of login and logouts
                    key_logins_logouts = "logins_and_logouts"
                    val_logins_logouts = data_logins_logouts["account_accesses"]
                    Dict[key_logins_logouts] = val_logins_logouts

                else: print("category not found")
            
            else: print("path not interesting")

    else: print("root path not found")

    #write parsed data dictionary to json file
    genericParser.writeToJsonFile(Dict, 'media/processedData/facebook/' + facebookDataDumpName + '/parsedFacebookData.json')
    #genericParser.writeToJsonFile(Dict, '../media/processedData/facebook/' + facebookDataDumpName + '/parsedFacebookData.json')

    genericParser.deleteData(rootPathName)

"""
def main():
    root = "facebook-lisasilmii"
    parseFacebookData(root)

if __name__ == "__main__":
    main() 
"""