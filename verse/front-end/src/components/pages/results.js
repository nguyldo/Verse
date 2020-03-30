import React, { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./../sections/header.js";
import html2canvas from "html2canvas";

import GenresPieChart from "../visuals/GenresPieChart"
import ArtistsBarChart from "../visuals/ArtistsBarChart"
import TracksBarChart from "../visuals/TracksBarChart"


export default class Results extends Component {

  constructor(props) {
    super(props);
    console.log(props.location.state);
    this.state = props.location.state;
    this.setState = ({
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
      this.state.facebookData = response.data.data;
      console.log("Facebook analyze return success");
    });
    /*
    const promise = await axios.get("http://localhost:8000/facebookData/" + this.state.facebookRequest);
    const status = promise.status;
    if (status == 200) {
      const data = promise.data.data;
      console.log(this);
      this.state.facebookData = data;
      console.log(this.state.facebookData);
    }*/
  }

  async getAppleData() {
    axios.get("http://localhost:8000/appleGeneralData/" + this.state.appleRequest
    ).then((response) => {
      this.state.appleGeneralData = response.data.data;
      console.log("Apple general return success");
    });

    axios.get("http://localhost:8000/appleMusicData/" + this.state.appleRequest
    ).then((response) => {
      this.state.appleMusicData = response.data.data;
      console.log("Apple music return success");
    });

    axios.get("http://localhost:8000/appleAppsGamesData/" + this.state.appleRequest
    ).then((response) => {
      this.state.appleAppsGamesData = response.data.data;
      console.log("Apple apps games return success");
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
              <p>sample facebook</p>
              <p>sample facebook</p>
              <p>sample facebook</p>
              <p>sample facebook</p>
              <p>sample facebook</p>
              <p>sample facebook</p>
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
              <GenresPieChart/>
              <ArtistsBarChart/>
              <TracksBarChart/>
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