import React, { Component } from "react";

import axios from "axios";
import {Link, NavLink} from "react-router-dom";
import Header from "./../sections/header.js";

export default class Loading extends Component {

    constructor(props) {
      super(props);
      this.state = props.location.state;
    }
  
    render() {
      return(
        <h1>Loading...</h1>
      )
    }
  }