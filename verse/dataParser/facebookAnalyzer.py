#!/usr/bin/env python3

#from facebookParser import parseFacebookData
from dataParser import facebookParser

# from https://stackoverflow.com/a/30312778

# TODO: how does the data dump page pass the username to the backend

# Function to get data groups from 
def getDataGroups():
    data = facebookParser.parseFacebookData("facebook-lisasilmii")

    Dict = {}

    # ----- US 6.1 -----
    Dict["name_category_header"] = [data["name"], data["friend_peer_group"]]
    
    # ----- US 6.2 -----
    Dict["locations_piechart"] = data["logins_and_logouts"]

    # ----- US 6.3 -----
    Dict["posts_linegraph"] = [data["your_posts"], data["other_people's_posts_to_your_timeline"]]

    # ----- US 6.4 -----
    Dict["reactions_pictograph"] = data["reactions"]

    # ----- US 6.5 -----
    Dict["websites_count"] = data["num_apps_and_websites_logged_into_with_facebook"]

    # ----- US 6.6/6.7 -----
    Dict["websites_list"] = data["apps_and_websites_logged_into_with_facebook"]

    # ----- US 6.8 -----
    Dict["off-facebook_activity_count"] = data["num_businesses_off_facebook"]

    # ----- US 6.9 -----
    Dict["advertisers_list"] = data["advertisers_who_uploaded_a_contact_list_with_your_information"]

    # ----- US 6.10 -----
    Dict["master_linegraph"] = [data["friends"], data["num_friends"], data["num_pokes"], data["pokes"], data["profile_update_history"]]

    return Dict
