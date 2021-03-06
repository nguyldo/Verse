import React, { Component } from "react";
import Header from "./../sections/header.js";

export default class Main extends Component {
  
    render() {
      return(
        <div id="mainpage">
            <Header />
            <h1 class="pagetitle">Welcome to Verse!</h1>
            <h3>Visualize your Facebook, Apple, Netflix, and Google privacy data with charts and lists!</h3>
            <br></br>
        </div>
      )
    }
  }