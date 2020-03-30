import React, { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./../sections/header.js";
import "./../../css/help.css";

export default class Help extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="helppage">
                <Header />
                <h1 id="hdr">How to Download Your Data Files</h1>
                <h2 id="hdr-companies"><b>Downloading your Google Data</b></h2>
                <p id="p"><b>1.</b> Open a new tab and click on your profile picture. Click on "Manage your Google Account"</p>
                <img id="pic" src="https://i.ibb.co/613Cr29/Google-Help1.png" alt="Google-Help1" border="0"/>
                <p id="p"><b>2.</b> Scroll to "Privacy & Personalization" and click "Manage your data & personalization"</p>
                
                <img id="pic" src="https://i.ibb.co/THftTYb/Google-Help2.png" alt="Google-Help2" border="0"/>

                <p id="p"><b>3.</b> Scroll to "Download, delete, or make a plan for your data" and click "Download your data"</p>
                <img id="pic" src="https://i.ibb.co/Lt5Kdrb/Google-Help3.png" alt="Google-Help3" border="0"/>
                
                <p id="p"><b>4.</b> Check the following boxes and then click next step:</p>
                    <p id="list">
                    <br></br>Bookmarks
                    <br></br>Chrome
                    <br></br>Crisis User Reports
                    <br></br>Data Shared for Research
                    <br></br>Drive
                    <br></br>Fusion Tables
                    <br></br>Google Input Tools
                    <br></br>Keep
                    <br></br>Mail
                    <br></br>Maps
                    <br></br>Maps
                    <br></br>My Activity
                    <br></br>My Maps
                    <br></br>News
                    <br></br>Posts on Google
                    <br></br>Profile
                    <br></br>Purchases & Reservations
                    <br></br>Saved
                    <br></br>Search Contributions
                    <br></br>Street View
                    <br></br>Tasks
                    <br></br>Voice
                    <br></br>YouTube
                    <br></br>YouTube Gaming</p>
                
                <img id="pic" src="https://i.ibb.co/r7LnhPb/Google-Help4.png" alt="Google-Help4" border="0"/>
                <p id="p"><b>5.</b> Click "Send download link via email"</p>
                
                <img id="pic" src="https://i.ibb.co/mDKPmLG/Google-Help5.png" alt="Google-Help5" border="0"/>
                <p id="p"><b>6.</b> Under File type & size, click "2 GB", and click "Create export". 
                    It should take a few hours for the export to be sent to your gmail</p>
                <img id="pic" src="https://i.ibb.co/m5GpWnq/Google-Help6.png" alt="Google-Help6" border="0"/>
                
                <p id="p"><b>7.</b> Click on the first Download archive. You only need the first download file.</p>
                <img id="pic" src="https://i.ibb.co/9H7jjK6/Google-Help7.png" alt="Google-Help7" border="0"/>
                
            </div>
        )
    }
}