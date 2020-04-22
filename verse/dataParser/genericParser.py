import os, stat, shutil
import csv
import pandas as pd #parse csv
import numpy as np
import json
import operator
from bs4 import BeautifulSoup

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
    #print(sizeInGB)
    return sizeInGB

# Function: output contents of dictionary into a json file
# Return: null
def writeToJsonFile(Dict, filePath):
    splitFilePath = filePath.split('/')
    #print(splitFilePath)

    #create directories if they don't exist
    for i in range(1, len(splitFilePath)):
        path = '/'.join(splitFilePath[0:i])

        if not os.path.exists(path):
            print("make dir " + path)
            os.makedirs(path)
        else: print(path + " exists")

    #write to file
    try: 
        with open(filePath, 'w') as fp:
            json.dump(Dict, fp, ensure_ascii=False)
    except IOError:
        print("File not found or path incorrect: " + filePath)

# Function: get parsed data from json file for Analyzer
def getParsedJson(filePath):
    with open(filePath) as jsonFile:
        data = json.load(jsonFile)

    return data

# Function: extract json data and load into dictionary
# Return: dictionary with json loaded
def jsonToDict(filePath, fieldNames):
    Dict = {}

    with open(filePath) as jsonFile:
        data = json.load(jsonFile)

        fileName = filePath.rsplit('/', 1)[-1]
        if fileName == "Game Center Data.json":
            data = data["games_state"]

        #check fieldNames not empty
        if fieldNames:
            #get all rows with specified columns
            df = pd.DataFrame.from_dict(data)
            df = df.replace(r'^\s*$', np.NaN, regex=True)
            df = df.dropna(0, subset=fieldNames) 
            df = df.loc[:, fieldNames].to_dict('records')

            return df

        #fieldNames empty means that it's facebookParser calling this
        else:
            return data

# Function extract csv data and load into dictionary
# Return: dictionary with csv loaded
def csvToDict(filePath, fieldNames):
    Dict = {}

    #get all rows with specified columns
    df = pd.read_csv(filePath)
    df = df.replace(r'^\s*$', np.NaN, regex=True)
    df = df.dropna(0, subset=fieldNames) 
    df = df.loc[:, fieldNames].to_dict('records')
    
    return df

def htmlToSoup(filePath, findElement, findClass):

    with open(filePath, "rb") as infile:
        soup = BeautifulSoup(infile, 'lxml')

        if findClass != "":
            entries = soup.find_all(findElement, {"class": findClass})
        else:
            entries = soup.find_all(findElement)

    return entries

# Function to delete a directory and all of its contents
def deleteData(rootPath):
    #for root, dirs, files in os.walk(rootPath, topdown=False):
    #    for name in files:
    #        filename = os.path.join(root, name)
    #        os.chmod(filename, stat.S_IRWXU)
    #        os.remove(filename)

    #    for name in dirs:
    #        os.rmdir(os.path.join(root, name))
    #os.rmdir(rootPath)      

    shutil.rmtree(rootPath, ignore_errors=True)

# ==================== FOR APPLE ONLY ====================

# Function: filters the given Dict by column and handles empty or null values
# Return: a dictionary containing only the columns specified in fieldNames
def filterByField(Dict, fieldNames):
    df = pd.DataFrame.from_dict(Dict)
    df = df.replace(r'^\s*$', np.NaN, regex=True)
    df = df.dropna(0, subset=fieldNames)        #drop all rows with NaN in fieldNames columns
    df = df.loc[:, fieldNames].to_dict('records')
    return df

# Function: calculates frequency of occurrence of each item in a dictionary
# Return: a sorted dictionary where the key is the item and the value is the frequency
def countFrequencies(dictItems, key):
    Dict = {}

    listItems = [item[key] for item in dictItems] 
    uniqueItems = set(listItems)                  
    for item in uniqueItems:
        Dict[item] = listItems.count(item)

    sortedTuples = sorted(Dict.items(), key = operator.itemgetter(1))
    sortedTuples = list(sortedTuples)
    sortedTuples = sortedTuples[::-1]

    sortedDict = {}
    for item in sortedTuples:
        sortedDict[item[0]] = item[1]

    return sortedDict

# Function: calculates top ten entries in a given sorted dictionary
# Return: a dictionary of the top ten entries
def countTopTen(Dict):
    topTen = {k: Dict[k] for k in list(Dict)[:10]}

    return topTen

# Function: get first and last date of an event
# Return: tuple with first and last date
def getDateBounds(List):
    minDate = [3000, 12, 31]
    maxDate = [0, 0, 0]

    for item in List:
        date = getYearMonthDay(item["Event Received Timestamp"])

        if date[0] <= minDate[0]:
            minDate[1] = 12
            minDate[2] = 31
            if date[1] <= minDate[1] and date[2] < minDate[2]:
                minDate = date

        if date[0] >= maxDate[0]:
            maxDate[1] = 0
            maxDate[2] = 0
            if date[1] >= maxDate[1] and date[2] > maxDate[2]:
                maxDate = date

    return (minDate, maxDate)

# Function: take the dict generated by countFrequencies and label the values
# Return: a list of dictionaries
def formatDictionary(Dict):
    listDicts = []
    ct = 1
    for key in Dict:
        labelledDict = {}
        labelledDict["id"] = ct
        labelledDict["label"] = key
        labelledDict["value"] = Dict[key]

        listDicts.append(labelledDict)
        ct = ct + 1

    return listDicts

# Function: extract year, month, day from an iso date string
# Return: a tuple with year, month, day
def getYearMonthDay(date):
    year = date.split("-")[0]
    month = date.split("-")[1]
    day = date.split("-")[2]
    day = day.split("T")[0]

    return [int(year), int(month), int(day)]

# Function: take a dict and format for a google charts gantt chart
# Return: list of list
def formatGanttData(Dict):
    List = []
    ct = 1
    for d in Dict:
        innerList = []
        innerList.append(str(ct))
        ct = ct + 1
        innerList.append(d["Title"] + " - " + d["Artist"])
        innerList.append(d["Genre"])

        #TODO: maybe calculate the difference between 
        #last played date and release date as percentage??
        #year, month, day = getYearMonthDay(d["Release Date"])
        #innerList.append("new Date(" + year + ", " + month + ", " + day + ")")

        year, month, day = getYearMonthDay(d["Date Added To Library"])
        innerList.append([year, month, day])
        year, month, day = getYearMonthDay(d["Last Played Date"])
        innerList.append([year, month, day])
        innerList.append("null")    #duration
        innerList.append(0)         #percent complete
        innerList.append("null")    #dependencies

        List.append(innerList)

    return List

# Function: converts milliseconds to hours, mins, seconds
# Return: a tuple of hours, minutes, seconds
# https://stackoverflow.com/a/35989770
def convertMillis(millis):
    seconds=(millis/1000)%60
    minutes=(millis/(1000*60))%60
    hours=(millis/(1000*60*60))%24
    return hours, minutes, seconds