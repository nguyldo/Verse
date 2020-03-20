import React, { Component } from "react";

import axios from "axios";
import {Link} from "react-router-dom";
import "./../../css/header.css";

export default class Header extends Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      return(
        <div>
            <Link to="/" id="link"><h1 id="header">VERSE</h1></Link>
        </div>
      )
    }
  }