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
            <div id="aboutpage">
                <Header />
                <h1>About Verse</h1>
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
                <h1>What is Verse?</h1>
                <p id="paragraph" >
                For some, privacy is a top concern, but for others, it’s merely a peripheral concept 
                bolstered by the “Nothing to Hide” argument. In fact, the vast majority blindly trust 
                companies and click “I accept” out of carelessness or ignorance. However, in an age 
                when people are more often online than not, we just want our user to be educated before 
                they make a decision about their increasingly growing data. Verse is our attempt to 
                help people get “versed” on how much and what kind of data companies such as Google, 
                Facebook, and Apple take from them.

                The purpose of this project is to create a web application called “Verse” which helps 
                educate users on how their data is taken and used. The user will choose from companies 
                such as Google, Apple, Facebook, etc. and upload their zip files obtained from said 
                companies’ data dumps to our website. Our site will then parse through the data that 
                was input and give the user a visualization and a run through of all the data that 
                was given to us. 

                </p>
            </div>
        )
    }
}