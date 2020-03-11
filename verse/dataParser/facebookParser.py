import os
from os import path
import string
import json
from pprint import pprint
import sqlite3 as lite 
from sqlite3 import Error

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
def jsonToDictionary(dirPath, fileName):
    # Ex: "facebook-lisasilmii/posts" + "/" + "your_posts_1.json"
    filePath = dirPath + "/" + fileName

    # Load json into dictionary
    with open(filePath) as jsonFile:
        data = json.load(jsonFile)

    return data

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
def parseFacebookData(facebookDataDumpName): 
    # Define dictionary to map json data to
    Dict = {}

    # Define tuple to store root directory names of interest
    rootCategoriesOfInterest = ("about_you", "ads_and_businesses", "apps_and_websites", 
                                "friends", "likes_and_reactions", "other_activity", "posts", 
                                "profile_information", "security_and_login_information")

    # Parse through facebook media root directory
    rootPathName = "media/unzippedFiles/facebook/" + facebookDataDumpName
    # print(rootPathName)
    if path.exists(rootPathName):

        # Get total size
        Dict["totalSizeInGB"] = getDirSizeInGB(rootPathName)

        conn = None
        try:
            conn = lite.connect(r"pythonsqlite.db")
        except Error as e:
            print(e)

        unique_id = '0' 
        peer_group = 'no peer_group info'
        apps_and_websites = 'no app and web info'
        friends = 'no friend info'
        posts_and_comments = 'no comment info'
        pokes = 'no poke info'
        security = 'no security info'
        posts = 'no posts file' 
        other_posts = 'no other posts file' 
        profile_info = 'no profile file'
        profile_history = 'no profile history file' 
        advertisers = 'no advertiser data file' 
        off_facebook = 'no off facebook data'
        
        # Extract json data
        for root, dirs, files in walklevel(rootPathName, level=1):
            # from https://stackoverflow.com/a/7253830
            categoryDirName = root.rsplit('/', 1)[-1]
            
            # if category is valid,
            # add data of interest to dictionary
            dirPath = rootPathName + "/" + categoryDirName
            if any(categoryDirName in category for category in rootCategoriesOfInterest) and path.exists(dirPath):
                if categoryDirName == "about_you":
                    # ----- US 6.1 -----
                    file_peer_group = "friend_peer_group.json"
                    data_peer_group = jsonToDictionary(dirPath, file_peer_group)

                    # user friend group category
                    key_peer_group = "friend_peer_group"
                    val_peer_group = data_peer_group["friend_peer_group"]
                    Dict[key_peer_group] = val_peer_group

                    peer_group = dirPath + "/" + file_peer_group

                elif categoryDirName == "ads_and_businesses":
                    # ----- US 6.8 -----
                    file_off_facebook_activity = "your_off-facebook_activity.json"
                    data_off_facebook_activity = jsonToDictionary(dirPath, file_off_facebook_activity)

                    # overall json superset of off facebook activity
                    key_list_off_facebook_activity = "off_facebook_activity"
                    val_list_off_facebook_activity = data_off_facebook_activity["off_facebook_activity"]
                    Dict[key_list_off_facebook_activity] = val_list_off_facebook_activity

                    off_facebook = dirPath + "/" + file_off_facebook_activity

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
                    data_advs = jsonToDictionary(dirPath, file_advs)

                    # list of advertisers with your contact info
                    key_advs = file_advs[:-5]
                    val_advs = data_advs["custom_audiences"]
                    Dict[key_advs] = val_advs

                    advertisers = dirPath + "/" + file_advs

                elif categoryDirName == "apps_and_websites":
                    # ----- US 6.5 & 6.6 -----
                    file_apps_websites = "apps_and_websites.json"
                    data_apps_websites = jsonToDictionary(dirPath, file_apps_websites)

                    # count of apps/websites that you used facebook to login
                    key_ct_apps_websites = "num_apps_and_websites_logged_into_with_facebook"
                    val_ct_apps_websties = len(data_apps_websites["installed_apps"])
                    Dict[key_ct_apps_websites] = val_ct_apps_websties

                    # list of apps/websites that you used facebook to login 
                    key_list_apps_websites = "apps_and_websites_logged_into_with_facebook"
                    val_list_apps_websites = data_apps_websites["installed_apps"]
                    Dict[key_list_apps_websites] = val_list_apps_websites

                    apps_and_websites = dirPath + "/" + file_apps_websites



                elif categoryDirName == "friends":
                    # ----- US 6.10 -----
                    file_friends = "friends.json"
                    data_friends = jsonToDictionary(dirPath, file_friends)

                    # count of facebook friends
                    key_ct_friends = "num_friends"
                    val_ct_friends = len(data_friends["friends"])
                    Dict[key_ct_friends] = val_ct_friends

                    # list of facebook friends
                    list_friends = [item.get("name") for item in data_friends["friends"]]

                    key_friends = "friends"
                    val_friends = list_friends
                    Dict[key_friends] = val_friends

                    friends = dirPath + "/" + file_friends
                    
                elif categoryDirName == "likes_and_reactions":
                    # ----- US 6.4 -----
                    file_reactions = "posts_and_comments.json"
                    data_reactions = jsonToDictionary(dirPath, file_reactions)

                    # overall json superset of reactions
                    key_reactions = "reactions"
                    val_reactions = data_reactions["reactions"]
                    Dict[key_reactions] = val_reactions

                    posts_and_comments = dirPath + "/" + file_reactions

                elif categoryDirName == "other_activity":
                    # ----- US 6.10 -----
                    file_pokes = "pokes.json"
                    data_pokes = jsonToDictionary(dirPath, file_pokes)

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
                    Dict[key_pokes]=val_pokes

                elif categoryDirName == "posts":
                    # ----- US 6.3 -----
                    file_others_posts = "other_people's_posts_to_your_timeline.json"
                    data_others_posts = jsonToDictionary(dirPath, file_others_posts)

                    # overall json superset of others posts
                    key_others_posts = file_others_posts[:-5]
                    val_others_posts = data_others_posts["wall_posts_sent_to_you"]["activity_log_data"]
                    Dict[key_others_posts] = val_others_posts

                    other_posts = dirPath + "/" + file_others_posts

                    # ----- US 6.3 -----
                    file_your_posts = "your_posts_1.json"
                    data_your_posts = jsonToDictionary(dirPath, file_your_posts)

                    # overall json superset of your posts
                    key_your_posts = file_your_posts[:-5]
                    val_your_posts = data_your_posts
                    Dict[key_your_posts] = val_your_posts

                    posts = dirPath + "/" + file_your_posts


                    
                elif categoryDirName == "profile_information":
                    # ----- US 6.1 -----
                    file_profile_info = "profile_information.json"
                    data_profile_info = jsonToDictionary(dirPath, file_profile_info)

                    # overall json superset of your profile info
                    key_profile_info = file_profile_info[:-5]
                    val_profile_info = data_profile_info["profile"]
                    Dict[key_profile_info] = val_profile_info

                    profile_info = dirPath + "/" + file_profile_info

                    # your name
                    key_name = "name"
                    val_name = data_profile_info["profile"]["name"]["full_name"]
                    Dict[key_name] = val_name

                    # ----- US 6.10 -----
                    file_profile_update_history = "profile_update_history.json"
                    data_profile_update_history = jsonToDictionary(dirPath, file_profile_update_history)

                    # overall json superset of your profile update history
                    key_profile_update_history = file_profile_update_history[:-5]
                    val_profile_update_history = data_profile_update_history["profile_updates"]
                    Dict[key_profile_update_history] = val_profile_update_history

                    profile_history = dirPath + "/" + file_profile_update_history



                elif categoryDirName == "security_and_login_information":
                    # ----- US 6.2 -----
                    file_logins_logouts = "logins_and_logouts.json"
                    data_logins_logouts = jsonToDictionary(dirPath, file_logins_logouts)

                    # overall json superset of login and logouts
                    key_logins_logouts = file_logins_logouts[:5]
                    val_logins_logouts = data_logins_logouts["account_accesses"]
                    Dict[key_logins_logouts] = val_logins_logouts

                    security = dirPath + "/" + file_logins_logouts

                else: print("category not found")
        
        if conn is not None:
            sql_insert = """INSERT INTO facebook ( 
                                id, 
                                peer_group,
                                apps_and_websites,
                                friends,
                                posts_and_comments,
                                pokes,
                                security,
                                posts, 
                                other_posts, 
                                profile_info, 
                                profile_history, 
                                advertisers, 
                                off_facebook 
                            ) 
                            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                        """

            try:
                c = conn.cursor()
                with conn:
                    # insert data in
                    data_tuple = (
                        unique_id, 
                        peer_group,
                        apps_and_websites,
                        friends,
                        posts_and_comments,
                        pokes,
                        security,
                        posts, 
                        other_posts, 
                        profile_info, 
                        profile_history, 
                        advertisers, 
                        off_facebook 
                    )
                    c.execute(sql_insert, data_tuple)
                    # print data
                    c.execute("SELECT * FROM facebook")
                    print(c.fetchall())
                    # delete data
                    c.execute("DELETE FROM facebook")
            except Error as e:
                print(e)    
            

    else: print("path does not exist")

    return Dict

def main():
    root = "facebook-jacksonoriez"
    parseFacebookData(root)

if __name__ == "__main__":
    main()