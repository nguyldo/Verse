#!/usr/bin/env python3

from dataParser.facebookParser import parseFacebookData

# from https://stackoverflow.com/a/30312778

# TODO: how is the data dump page 

def getUserName():
    data = parseFacebookData("facebook-lisasilmii")
    return data["name"]

def main():
    name = getUserName()
    print(name)

if __name__ == "__main__":
    main()

