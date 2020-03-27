#!/usr/bin/env python3

import os

from dataParser import appleParser, genericParser
#import genericParser, appleParser

# TODO: how does the data dump page pass the username to the backend

def getGeneralDataGroups():
    data = appleParser.parseAppleData("apple-lisa", "General")

    return data

def getMusicDataGroups():
    data = appleParser.parseAppleData("apple-lisa", "Music")

    return data

def getAppsGameDataGroups():
    data = appleParser.parseAppleData("apple-lisa", "AppsGames")

    return data

def main():
    getMusicDataGroups()

if __name__ == "__main__":
    main() 

