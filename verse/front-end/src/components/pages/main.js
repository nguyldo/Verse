import React, { Component } from "react";

import axios from "axios";
import {Link, NavLink} from "react-router-dom";
import Header from "./../sections/header.js";

export default class Main extends Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      return(
        <div id="mainpage">
            <Header />
            <h1 class="pagetitle">Welcome to Verse!</h1>
            <h3>Verse slogan here...</h3>
            <br></br>
        </div>
      )
    }
  }