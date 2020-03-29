import React, { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./../sections/header.js";

export default class Help extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="helppage">
                <Header />
                <h1>I'M HELPING</h1>
                <p>1. Open a new tab and click on your profile picture. Click on "Manage your Google Account"</p>
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg/1200px-An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg" 
                    alt="Google Parser Image 1">
                </img>
                <p>2. Scroll to "Privacy & Personalization" and click "Manage your data & personalization"</p>
                {/* image */}
                <p>3. Scroll to "Download, delete, or make a plan for your data" and click "Download your data"</p>
                {/* image */}
                <p>4. Check the following boxes and then click next step:
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
                {/* image */}
                <p>5. Click "Send download link via email"</p>
                {/* image */}
                <p>6. Under File type & size, click "2 GB", and click "Create export". 
                    It should take a few hours for the export to be sent to your gmail</p>
                {/* image */}
                <p>7. Click on the first Download archive. You only need the first download file.</p>
                {/* image */}
            </div>
        )
    }
}