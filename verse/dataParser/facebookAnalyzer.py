#!/usr/bin/env python3

import os

from dataParser import genericParser
#import genericParser

# from https://stackoverflow.com/a/30312778

# Function: get data from parsed file and group it according to visualization methods
def analyzeFacebookData(facebookUserFileName):
    data = genericParser.getParsedJson("media/processedData/facebook/" + facebookUserFileName + "/parsedFacebookData.json")
    #data = genericParser.getParsedJson("../media/processedData/facebook/" + facebookUserFileName + "/parsedFacebookData.json")

    Dict = {}

    inOut = {}
    inOut["total_size_GB"] = data["total_size_bignum"]
 


    # ----- US 6.1 -----
    if "name" in data.keys() and "friend_peer_group" in data.keys():
        Dict["name_category_header"] = [data["name"], data["friend_peer_group"]]
    
    # ----- US 6.2 -----
    if "logins_and_logouts" in data.keys():
        Dict["locations_piechart"] = data["logins_and_logouts"]

        # ip address bar chart
        locationsMap = {}
        for action in data["logins_and_logouts"]:
            if action["ip_address"] in locationsMap:
                locationsMap[action["ip_address"]] = locationsMap[action["ip_address"]] + 1
            else:
                locationsMap[action["ip_address"]] = 1

        locationsArray = []
        count = 0
        for loc, amt in locationsMap.items():
            locationsArray.append({"id": count, "label": loc, "value": amt})
            count += 1
        
        Dict["locations_barchart"] = locationsArray 

    # ----- US 6.3 -----
    if "your_posts" in data.keys() and "other_people's_posts_to_your_timeline" in data.keys():
        Dict["posts_linegraph"] = [data["your_posts"], data["other_people's_posts_to_your_timeline"]]

        # posts pie chart
        Dict["posts_piechart"] = [{"id": 1, "label": "Your Posts", "value": len(data["your_posts"])}, {"id": 2, "label": "Friend's Posts", "value": len(data["other_people's_posts_to_your_timeline"])}]

    # ----- US 6.4 -----
    if "reactions" in data.keys():
        Dict["reactions_pictograph"] = data["reactions"]

        reactionsMap = {}
        for action in data["reactions"]:
            if action["data"][0]["reaction"]["reaction"] in reactionsMap:
                reactionsMap[action["data"][0]["reaction"]["reaction"]] = reactionsMap[action["data"][0]["reaction"]["reaction"]] + 1
            else:
                reactionsMap[action["data"][0]["reaction"]["reaction"]] = 1
        
        reactionsArray = []
        count = 0
        for reaction, amt in reactionsMap.items():
            reactionsArray.append({"id": count, "label": reaction, "value": amt})
            count += 1
        
        Dict["reactions_barchart"] = reactionsArray

    # ----- US 6.5 -----
    if "num_apps_and_websites_logged_into_with_facebook" in data.keys():
        Dict["websites_count"] = data["num_apps_and_websites_logged_into_with_facebook"]

    # ----- US 6.6/6.7 -----
    if "apps_and_websites_logged_into_with_facebook" in data.keys():
        Dict["websites_list"] = data["apps_and_websites_logged_into_with_facebook"]

    # ----- US 6.8 -----
    if "num_businesses_off_facebook" in data.keys():
        Dict["off_facebook_activity_count"] = data["num_businesses_off_facebook"]

    if "businesses_off_facebook" in data.keys():
        Dict["off_facebook_activity_list"] = data["businesses_off_facebook"]

    # ----- US 6.9 -----
    if "advertisers_who_uploaded_a_contact_list_with_your_information" in data.keys():
        Dict["advertisers_list"] = data["advertisers_who_uploaded_a_contact_list_with_your_information"]

    if "num_advertisers" in data.keys():
        Dict["advertisers_count"] = data["num_advertisers"]

    # ----- US 6.10 -----
    if "friends" in data.keys() and "num_friends" in data.keys() and "pokes" in data.keys() and"num_pokes" in data.keys() and "profile_update_history" in data.keys():
        Dict["master_linegraph"] = [data["friends"], data["num_friends"], data["pokes"], data["num_pokes"], data["profile_update_history"]]

    #write analyzed data dictionary to json file
    genericParser.writeToJsonFile(Dict, "media/processedData/facebook/" + facebookUserFileName + "/analyzedFacebookData.json")
    #genericParser.writeToJsonFile(Dict, "../media/processedData/facebook/" + facebookUserFileName + "/analyzedFacebookData.json")

"""
def main():
    root = "facebook-lisasilmii"
    analyzeFacebookData(root)

if __name__ == "__main__":
    main() 
"""