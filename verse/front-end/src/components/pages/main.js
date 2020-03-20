import React, { Component } from "react";

import axios from "axios";
import {Link} from "react-router-dom";
import Header from "./../sections/header.js";

export default class Main extends Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      return(
        <div>
            <Header />
            <Link to="/upload" className="link">Go to uploads</Link>
        </div>
      )
    }
  }