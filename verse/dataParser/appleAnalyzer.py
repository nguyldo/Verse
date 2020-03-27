#!/usr/bin/env python3

import os

from dataParser import appleParser, genericParser
#import genericParser, appleParser

# TODO: how does the data dump page pass the username to the backend

def getGeneralDataGroups():
    data = appleParser.parseAppleData("apple-lisa", "General")
    print(data)

    return data

def getMusicDataGroups():
    data = appleParser.parseAppleData("apple-lisa", "Music")
    print(data)

    return data

def getGameDataGroups():
    data = appleParser.parseAppleData("apple-lisa", "Game")
    print(data)

    return data

def main():
    getMusicDataGroups()

if __name__ == "__main__":
    main() 

