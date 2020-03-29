import React, { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./../sections/header.js";

export default class About extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="aboutpage">
                <Header />
                <h1>About Verse</h1>
                <h2>What is Verse?</h2>
                <p></p>
            </div>
        )
    }
}