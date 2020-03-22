import os
import csv
import pandas as pd #parse csv
import json


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
def jsonToDict(filePath):
    with open(filePath) as jsonFile:
        data = json.load(jsonFile)

    return data

# Function: output contents of dictionary into a json file
# Return: null
def dictToJson(Dict, filePath):
    with open(filePath, 'w') as fp:
        json.dump(Dict, fp)

# Function extract csv data and load into dictionary
# Return: dictionary with csv loaded
def csvToDict(filePath, fieldNames):
    Dict = {}

    df = pd.read_csv(filePath)

    for field in fieldNames:
        Dict[field] = df[field]

    return Dict
    