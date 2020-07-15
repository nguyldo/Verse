import React, { Component } from "react";

import {Link, NavLink} from "react-router-dom";
import "./../../css/header.css";

export default class Header extends Component {

    render() {
      return(
        <div>
            <Link to="/" id="link"><h1 id="header">VERSE</h1></Link>
            <nav id="Nav">
              <NavLink to="/upload" id="NavLink" activeStyle={{background:'#CCCCCC', color:'#29648A'}}>Upload</NavLink>
              <NavLink to="/help" id="NavLink" activeStyle={{background:'#CCCCCC', color:'#29648A'}}>Help</NavLink>
              <NavLink to="/about" id="NavLink" activeStyle={{background:'#CCCCCC', color:'#29648A'}}>About Verse</NavLink>
            </nav>
        </div>
      )
    }
  }