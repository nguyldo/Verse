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
            <h1>Welcome to Verse!</h1>
            <h3>Verse slogan here...</h3>
            <br></br>
            <nav>
              <NavLink to="/upload" activeStyle={{background:'white', color:'blue'}}>Upload</NavLink>
              <NavLink to="/help" activeStyle={{background:'white', color:'blue'}}>Help</NavLink>
              <NavLink to="/about" activeStyle={{background:'white', color:'blue'}}>About Us</NavLink>
            </nav>
            <Link to="/upload" id="uploadslink">Analyze my data!</Link>
        </div>
      )
    }
  }