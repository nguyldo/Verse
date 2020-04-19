import os
import heapq

from dataParser import genericParser  

def isShow(title):

    count = 0

    for c in title:
        if c == ':':
            count += 1
    
    return count >= 2

def getShowTitle(title):

    count = 0

    for c in title:
        if c == ':':
            break
        count += 1
    
    return title[:count]



def parseNetflixData(netflixDataDumpName):

    rootPathName = "./media/unzippedFiles/netflix/" + netflixDataDumpName

    if os.path.exists(rootPathName):

        netflixData = genericParser.csvToDict(rootPathName, ("Title", "Date"))
        print("Uploading netflix data")
        # print(netflixData)

        shows = {}
        movies = []

        for item in netflixData:
            if isShow(item["Title"]):
                title = getShowTitle(item["Title"])
                if title in shows:
                    shows[title] = shows[title] + 1
                else:
                    shows[title] = 1
            else:
                movies.append(item["Title"])

        # print("Shows")
        # print(shows)
        # print("Movies")
        # print(movies)

        analyzedData = {}

        totalWatchCount = len(netflixData)

        # print(totalWatchCount)
        
        topTenShows = []

        for show in shows:
            heapq.heappush(topTenShows, (shows[show], show))
        
        topTenShows = heapq.nlargest(10, topTenShows)

        # print("Top 10 shows")
        # print(topTenShows)

        pieChartTopTenShows = []
        count = 0
        for show in topTenShows:
            pieChartTopTenShows.append({"id": count, "label": show[1], "value": show[0]})
            count += 1

        analyzedData["shows_piechart"] = pieChartTopTenShows
        analyzedData["totalCount"] = totalWatchCount
        analyzedData["movies"] = movies
        analyzedData["shows"] = shows
        print(analyzedData)

        genericParser.writeToJsonFile(analyzedData, "media/processedData/netflix/" + netflixDataDumpName)

        