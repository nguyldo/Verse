import React, { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./../sections/header.js";
import "./../../css/about.css"

export default class About extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (


            <div class="grid-container" id="aboutpage">
                <Header />

                <div class="i1">
                <h1 id="box" id="title">About Verse</h1>

                <p id="paragraph" >
                    The average person likely isn’t aware of how much and what kind 
                    of personal information is being stored about them on their favorite sites, and that 
                    amount of information will only continue to grow in the years to come. In order to 
                    address this, we are presenting a digital privacy literacy tool that will parse 
                    your data and provide an easy-to-digest snapshot of your information. Though 
                    there are open sourced programs that will parse your data, there are none that 
                    are quite as clean, transparent, or user friendly. Everyone’s data is accessible 
                    for themselves to download in accordance with the law, and our web application seeks to 
                    expand on that and educate the common person so they can understand what 
                    they’re looking at and what steps they can take to manage their own privacy. 
                </p>
                </div>

                <div class="i2">
                <h1 id="title">What is Verse?</h1>

                <p id="paragraph" >
                For some, privacy is a top concern, but for others, it’s merely a peripheral concept 
                bolstered by the “Nothing to Hide” argument. In fact, the vast majority blindly trust 
                companies and click “I accept” out of carelessness or ignorance. However, in an age 
                when people are more often online than not, we just want our user to be educated before 
                they make a decision about their increasingly growing data. Verse is our attempt to 
                help people get “versed” on how much and what kind of data companies such as Google, 
                Facebook, and Apple take from them.<br></br><br></br>

                The purpose of this project is to create a web application called “Verse” which helps 
                educate users on how their data is taken and used. The user will choose from companies 
                such as Google, Apple, Facebook, etc. and upload their zip files obtained from said 
                companies’ data dumps to our website. Our site will then parse through the data that 
                was input and give the user a visualization and a run through of all the data that 
                was given to us. 
                </p>
                </div>

                <div class="i3">
                <h1 id="title">So what happens when you submit your data?</h1>

                <p id="paragraph" >
                    Once you submit your data, we will be looking through your data with our parser and put together 
                    a big summary of what data companies have on you. It may take a while for our parser to get 
                    through all of your data, but once it is done, it will show a success and you can proceed to 
                    the visual results.
                </p>
                </div>

                <div class="i4">
                <h1 id="title">So will our data dump information will be shared?</h1>

                <p id="paragraph" >
                    Absolutely not. We want to show how much data other companies have accumulated, not contribute to it. 
                    So, once we finish making the summary for your files, we will delete the contents as well as the data 
                    gained from said files and the parsed data once you leave the results screen. Just take care not 
                    to close the website before downloading your new consolidated data, as you won't be able to 
                    access it afterwards without submitting the files again.
                </p>
                </div>

                <div class="i5">
                <h1 id="title">What happens when Verse parses our data?</h1>

                <p id="paragraph" >
                    Your raw data is uploaded onto the server, where our parser will look through each file line by line. 
                    The data that we gain from it will go into our analyzer, which will count up and pick out some vital 
                    information that can be gleaned from your data dump. After the analyzer is done going through your 
                    data, the consolidated information will go straight to your results page, and 
                    all of the data that you submitted will be deleted. <b>Your data will not be shared with any outside parties.</b>
                </p>
                </div>

            </div>
        )
    }
}