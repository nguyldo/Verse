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
                <h1>Help</h1>
            </div>
        )
    }
}