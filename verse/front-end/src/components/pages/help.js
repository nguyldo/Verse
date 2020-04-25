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
                <h1 id="hdr" class="pagetitle">How to Download Your Data Files</h1>

                {/* <a href="#hdr_facebook">Click here to see the content below.</a> */}
                {/* <a href="#INSERT_YOUR_OBJECT_NAME_HERE">Click here to see the content below.</a> */}
                <a id="hyperlink" href="#google">Google Instructions</a>
                <a id="hyperlink" href="#facebook">Facebook Instructions</a>
                <a id="hyperlink" href="#apple">Apple Instructions</a>

                {/* Google */}

                <h2 id="hdr-companies" id="title"><a id="google"><b>Downloading Your Personal Google Data Dump</b></a></h2>
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
                
                {/* End of Google */}
                {/* Facebook */}

                <h2 id="hdr-companies" id="title"><a id="facebook"><b>Downloading Your Personal Facebook Data Dump</b></a></h2>
                <p id="p"><b>1.</b> Go to facebook.com, click the dropdown arrow in the top right corner, and click on “Settings”</p>
                <img id="pic" src="https://i.ibb.co/KNpxsKn/Facebook-Download0.png" alt="Facebook-Download0" border="0"/>

                <p id="p"><b>2.</b> On the left bar, click “Your Facebook Information” and select “Download Your Information”</p>
                <img id="pic" src="https://i.ibb.co/3kM5v9b/Facebook-Download1.png" alt="Facebook-Download1" border="0"/>

                <p id="p"><b>3.</b> Change the format and media quality settings to “JSON” and “Low” respectively</p>
                <img id="pic" src="https://i.ibb.co/T2j5jDq/Facebook-Download2.png" alt="Facebook-Download2" border="0"/>

                <p id="p"><b>4.</b> Deselect the following categories: “Photos and Videos”, and “Messages”</p>
                <img id="pic" src="https://i.ibb.co/8dzwBJ6/Facebook-Download3.png" alt="Facebook-Download3" border="0"/>

                <p id="p"><b>5.</b> Click “Create File”</p>
                <img id="pic" src="https://i.ibb.co/dB93DNS/Facebook-Download4.png" alt="Facebook-Download4" border="0"/>

                <p id="p"><b>6.</b> You will be emailed shortly after creating the file when the data is finished being prepared!</p>
                
                {/* End of Facebook */}
                {/* Apple */}

                <h2 id="hdr-companies" id="title"><a id="apple"><b>Downloading Your Personal Apple Data Dump</b></a></h2>
                <p id="p"><b>1.</b> Go to privacy.apple.com, and click on "Request a copy of your data."</p>
                <img id="pic" src="https://i.ibb.co/Y7vxrSd/Screen-Shot-2020-03-31-at-10-00-22-AM.png" alt="Apple-Download0" border="0"/>

                <p id="p"><b>2.</b> On the right hand side, click "select all." Confirm the upload at the bottom of the page</p>
                <img id="pic" src="https://i.ibb.co/KhdVcdW/Screen-Shot-2020-03-31-at-10-00-35-AM.png" alt="Apple-Download1" border="0"/>

                <p id="p"><b>3.</b> Comfirm the upload with a 1GB size.</p>
                <img id="pic" src="https://i.ibb.co/xXgDscw/Screen-Shot-2020-03-31-at-10-00-56-AM.png" alt="Apple-Download1" border="0"/>

                <p id="p"><b>4.</b> You will be emailed your data dump once it's ready.</p>

            </div>
        )
    }
}