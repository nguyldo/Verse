import React, { Component } from "react";

import axios from "axios";
import {Link} from "react-router-dom";
import Header from "./../sections/header.js";

export default class Results extends Component {

    constructor(props) {
      super(props);
      console.log(props.location.state);
    }
  
    render() {
      return(
        <div id="resultspage">
          <Header />
          <h1>Results</h1>
        </div>
      )
    }
  }