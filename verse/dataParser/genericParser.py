import os, stat, shutil
import csv
import pandas as pd #parse csv
import numpy as np
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

    if filePath == "../media/unzippedFiles/apple/apple-lisa/Game Center/Game Center Data.json":
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

    

    