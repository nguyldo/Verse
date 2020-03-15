import React, { Component } from "react";

import axios from "axios";
import {Link} from "react-router-dom";

export default class Main extends Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      return(
        <div>
            <h1>Verse</h1>
            <Link to="/upload" className="link">Go to uploads</Link>
        </div>
      )
    }
  }