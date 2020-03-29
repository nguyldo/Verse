import React, { Component } from "react";

import axios from "axios";
import {Link, NavLink} from "react-router-dom";
import "./../../css/header.css";

export default class Header extends Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      return(
        <div>
            <Link to="/" id="link"><h1 id="header">VERSE</h1></Link>
            <nav>
              <NavLink to="/upload" activeStyle={{background:'white', color:'blue'}}>Upload</NavLink>
              <NavLink to="/help" activeStyle={{background:'white', color:'blue'}}>Help</NavLink>
              <NavLink to="/about" activeStyle={{background:'white', color:'blue'}}>About Us</NavLink>
            </nav>
        </div>
      )
    }
  }