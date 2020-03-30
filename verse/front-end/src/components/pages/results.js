import React, { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./../sections/header.js";
import html2canvas from "html2canvas";

export default class Results extends Component {

  constructor(props) {
    super(props);
    console.log(props.location.state);
    this.state = props.location.state;
    this.setState = ({
      name: "",
      category: "",
      full_locations: [],
      locations: {},
      your_posts: [],
      other_posts: [],
      comments: [],
      companies: [],
      off_num: 0,
      sites: [],
      sites_num: 0,
      facebookData: {},
      googleData: {},
      appleData: {}
    });
    this.getFacebookData = this.getFacebookData.bind(this);
    this.getAppleData = this.getAppleData.bind(this);
  }

  componentWillMount() {
    if (this.state.facebookRequest != "") {
      this.getFacebookData();
    }
    if (this.state.appleRequest != "") {
      this.getAppleData();
    }
  }

  async getFacebookData() {
    
    axios.get("http://localhost:8000/facebookData/" + this.state.facebookRequest
    ).then((response) => {
      console.log(response);
      this.state.facebookData = response.data.data;
      console.log("Facebook analyze return success");
      console.log(this.state.facebookData);
      this.state.name = this.state.facebookData["name_category_header"]["0"];
      this.state.category = this.state.facebookData["name_category_header"]["1"];
      this.state.full_locations = this.state.facebookData["locations_piechart"];
      this.state.your_posts = this.state.facebookData["posts_linegraph"]["0"];
      this.state.other_posts = this.state.facebookData["posts_linegraph"]["1"];
      this.state.comments = this.state.facebookData["posts_linegraph"];
      this.state.reactions = this.state.facebookData["reactions_pictograph"];
      this.state.sites = this.state.facebookData["websites_list"];
      this.state.sites_num = this.state.facebookData["websites_count"];
      this.state.companies = this.state.facebookData["advertisers_list"];
      this.state.off_num = this.state.facebookData["off-facebook_activity_count"];
      this.forceUpdate();
      this.populateSelect();
      this.populateLocationDict();
    });
  }

  populateSelect() {
    var select = document.getElementById("select_sites");
    var options = this.state.sites;
    for (var i = 0; i < this.state.sites_num; i ++) {
      var opt = options[i].name;
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }

    var select = document.getElementById("select_comp");
    var options = this.state.sites;
    for (var i = 0; i < this.state.sites_num; i ++) {
      var opt = options[i].name;
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }
  }

  populateLocationDict() {
    var dict = {};

    var list = this.state.full_locations;

    for (var i = 0; i < list.length; i ++) {
      dict[list[i]["ip_address"]] = "0";
    }

    for (var i = 0; i < list.length; i ++) {
      var num = Number(dict[list[i]["ip_address"]]);
      num = num + 1;
      dict[list[i]["ip_address"]] = num.toString(10);
    }
    this.locations = dict;
    console.log(this.locations);
  }

  async getAppleData() {
    axios.get("http://localhost:8000/appleData/" + this.state.appleRequest
    ).then((response) => {
      console.log(response);
      this.state.appleData = response.data.data;
      console.log("Apple analyze return success");
      console.log(this.state.appleData);
    });
  }

  exportToImage(e) {
    html2canvas(document.getElementById("exportedvisuals"), { scale: 1 }).then(canvas => {
      let dwnld = document.createElement("a");
      dwnld.download = "visuals";
      dwnld.href = canvas.toDataURL();
      dwnld.click();
    });
  }

  toggleSection(e) {
    const id = e.target.id;
    if (id == "showfacebookvisuals") {
      if (document.getElementById("facebookvisuals").style.display == "none") {
        document.getElementById("facebookvisuals").style.display = "block";
      } else {
        document.getElementById("facebookvisuals").style.display = "none";
      }
    } else if (id == "showgooglevisuals") {
      if (document.getElementById("googlevisuals").style.display == "none") {
        document.getElementById("googlevisuals").style.display = "block";
      } else {
        document.getElementById("googlevisuals").style.display = "none";
      }
    } else {
      if (document.getElementById("applevisuals").style.display == "none") {
        document.getElementById("applevisuals").style.display = "block";
      } else {
        document.getElementById("applevisuals").style.display = "none";
      }
    }
  }

  render() {
    return (
      <div id="resultspage">
        <Header />
        <div id="exportedvisuals">
          <h1>Results</h1>
          <div id="sidebar">
            <p>Toggle</p>
            <button class="showvisualsbutton" id="showfacebookvisuals" onClick={(e) => this.toggleSection(e)}>Facebook</button>
            <button class="showvisualsbutton" id="showgooglevisuals" onClick={(e) => this.toggleSection(e)}>Google</button>
            <button class="showvisualsbutton" id="showapplevisuals" onClick={(e) => this.toggleSection(e)}>Apple</button>
          </div>
          <div id="mainvisuals">
            <div class="visualssection" id="facebookvisuals">
              <h1>Name: {this.state.name}</h1>
              <h2>Category: {this.state.category}</h2>
              <p>IP Adresses You Have Used to Sign Into Facebook</p>
              <p>Your Posts vs. Your Friend's Posts</p>
              <p>How Frequently You Use Each Reaction</p>
              <p>List of Websites You Have Logged Into Using Facebook:</p>
              <select id="select_sites" size="5"></select>
              <p>Total Number: {this.state.sites_num}</p>
              <p>Companies Who Have Directed Ads Towards You On Facebook:</p>
              <p>Number of Off-Facebook Websites and Apps that Facebook Tracks: {this.state.off_num}</p>
              <select id="select_comp" size="5"></select>
            </div>
            <div class="visualssection" id="googlevisuals">
              <p>sample google</p>
              <p>sample google</p>
              <p>sample google</p>
              <p>sample google</p>
              <p>sample google</p>
              <p>sample google</p>
            </div>
            <div class="visualssection" id="applevisuals">
              <p>sample apple</p>
              <p>sample apple</p>
              <p>sample apple</p>
              <p>sample apple</p>
              <p>sample apple</p>
              <p>sample apple</p>
            </div>
          </div>
        </div>
        <button onClick={(e) => this.exportToImage(e)}>Export your results to an image!</button>
      </div>
    )
  }
}