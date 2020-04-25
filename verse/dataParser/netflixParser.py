import os
import heapq
import pprint

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

def convertDate(date):
    dates = date.split('/')
    return "" + dates[1] + "/" + dates[0] + "/" + dates[2]


def parseDate(date):
    dates = date.split('/')
    dates.reverse()
    dates[0] = "20" + dates[0]
    dates[1], dates[2] = dates[2], dates[1]
    return dates

def laterDate(date1, date2):
    if int(date1[0]) > int(date2[0]):
        return date1
    if int(date1[0]) < int(date2[0]):
        return date2
    if int(date1[1]) > int(date2[1]):
        return date1
    if int(date1[1]) < int(date2[1]):
        return date2
    if int(date1[2]) > int(date2[2]):
        return date1
    if int(date1[2]) < int(date2[2]):
        return date2
    return date1

def earlierDate(date1, date2):
    if int(date1[0]) > int(date2[0]):
        return date2
    if int(date1[0]) < int(date2[0]):
        return date1
    if int(date1[1]) > int(date2[1]):
        return date2
    if int(date1[1]) < int(date2[1]):
        return date1
    if int(date1[2]) > int(date2[2]):
        return date2
    if int(date1[2]) < int(date2[2]):
        return date1
    return date1


def parseNetflixData(netflixDataDumpName):

    rootPathName = "./media/unzippedFiles/netflix/" + netflixDataDumpName

    if os.path.exists(rootPathName):

        netflixData = genericParser.csvToDict(rootPathName, ("Title", "Date"))
        #print("Uploading netflix data")
        #print(netflixData)
        #print("End of raw Netflix data")

        shows = {}
        movies = []

        for item in netflixData:
            if isShow(item["Title"]):
                title = getShowTitle(item["Title"])
                if title in shows:
                    shows[title]["count"] = shows[title]["count"] + 1
                    shows[title]["firstDate"] = earlierDate(parseDate(item["Date"]), shows[title]["firstDate"])
                    shows[title]["lastDate"] = laterDate(parseDate(item["Date"]), shows[title]["lastDate"])
                else:
                    shows[title] = {"count": 1, "firstDate": parseDate(item["Date"]), "lastDate": parseDate(item["Date"])}
                    
                    
            else:
                movies.append({"title": item["Title"], "date": item["Date"]})

        # for item in netflixData:

        #pp = pprint.PrettyPrinter(indent=4)
        #print("Shows")
        #pp.pprint(shows)
        # print("Movies")
        # print(movies)

        analyzedData = {}

        totalWatchCount = len(netflixData)

        # print(totalWatchCount)

        # format for gantt chart
        showsGantt = []
        count = 1
        for show in shows:
            formattedShow = []
            formattedShow.append(str(count))
            formattedShow.append(show)
            formattedShow.append(str(shows[show]["count"]) + " episodes watched")
            formattedShow.append(shows[show]["firstDate"])
            formattedShow.append(shows[show]["lastDate"])
            formattedShow.append("null")
            formattedShow.append(0)
            formattedShow.append("null")
            showsGantt.append(formattedShow)
            count += 1
        #pp.pprint(showsGantt)

        # all shows list
        allShows = []
        count = 0
        for show in shows:
            allShows.append({"id": count, "label": show, "value": shows[show]["count"]})
            count += 1

        # all movies list
        allMovies = []
        count = 0
        for movie in movies:
            allMovies.append({"id": count, "label": movie["title"], "value": movie["date"]})
            count += 1

        # find top 10 shows
        topTenShows = []

        for show in shows:
            heapq.heappush(topTenShows, (shows[show]["count"], show))
        
        topTenShows = heapq.nlargest(10, topTenShows)

        # print("Top 10 shows")
        # print(topTenShows)

        pieChartTopTenShows = []
        count = 0
        for show in topTenShows:
            pieChartTopTenShows.append({"id": count, "label": show[1], "value": show[0]})
            count += 1


        analyzedData["shows_ganttchart"] = showsGantt
        analyzedData["shows_piechart"] = pieChartTopTenShows
        analyzedData["totalCount"] = totalWatchCount
        analyzedData["movies"] = allMovies
        analyzedData["shows"] = allShows
        #print(analyzedData)

        genericParser.writeToJsonFile(analyzedData, "media/processedData/netflix/" + netflixDataDumpName)

        