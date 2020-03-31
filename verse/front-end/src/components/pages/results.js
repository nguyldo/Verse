import React, { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./../sections/header.js";
import html2canvas from "html2canvas";

import Grid from '@material-ui/core/Grid';

import TopTenGenresList from "../visuals/TopTenGenresList"
import GenresPieChart from "../visuals/GenresPieChart"
import TopTenArtistsList from "../visuals/TopTenArtistsList"
import ArtistsBarChart from "../visuals/ArtistsBarChart"
import TopTenTracksList from "../visuals/TopTenTracksList"
import TracksBarChart from "../visuals/TracksBarChart"
import MusicLibraryGanttChart from "../visuals/MusicLibraryGanttChart"


export default class Results extends Component {

  constructor(props) {
    super(props);
    console.log(props.location.state);
    this.state = props.location.state;
    this.setState = ({
      facebookData: {},

      googleData: {},

      vals: "testing",

      appleGeneralData: {},
      appleMusicData: {},
      appleAppsGamesData: {},

      //appleGeneralData: {
        total_size_bignum: 0,
        personal_info_header: "",
        devices_list:  "",
      //},
      //appleMusicData: {
        total_listen_time_bignum: 0,
        preferences_pictograph: [],
        play_activity_genres_piechart: [],
        top_ten_genres_list: [],
        play_activity_artists_barchart: [],
        top_ten_artists_list: [],
        play_activity_track_barchart: [],
        top_ten_tracks_list: [],
        play_activity_map: [],
        library_song_timeline: [],
        genre_timeline: [],
      //},
      //appleAppsGamesData: {
        apps_timeline: [],
        games_timeline: []
      //}
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

      this.state.appleGeneralData.total_size_bignum = this.state.appleGeneralData["total_size_bignum"];
      this.state.appleGeneralData.personal_info_header = this.state.appleGeneralData["personal_info_header"];
      this.state.appleGeneralData.devices_list = this.state.appleGeneralData["devices_list"];

      console.log("Apple general return success");
    });

    axios.get("http://localhost:8000/appleMusicData/" + this.state.appleRequest
    ).then((response) => {
      this.state.appleMusicData = response.data.data;

      this.state.total_listen_time_bignum = this.state.appleMusicData["total_listen_time_bignum"];
      this.state.preferences_pictograph = this.state.appleMusicData["preferences_pictograph"];
      this.state.play_activity_genres_piechart = this.state.appleMusicData["play_activity_genres_piechart"];
      this.state.top_ten_genres_list = this.state.appleMusicData["top_ten_genres_list"];
      this.state.play_activity_artists_barchart = this.state.appleMusicData["play_activity_artists_barchart"];
      this.state.top_ten_artists_list = this.state.appleMusicData["top_ten_artists_list"];
      this.state.play_activity_track_barchart = this.state.appleMusicData["play_activity_track_barchart"];
      this.state.top_ten_tracks_list = this.state.appleMusicData["top_ten_tracks_list"];
      this.state.play_activity_map = this.state.appleMusicData["play_activity_map"];
      this.state.library_song_timeline = this.state.appleMusicData["library_song_timeline"];
      this.state.genre_timeline = this.state.appleMusicData["genre_timeline"];

      //console.log(this.state.appleMusicData.play_activity_genres_piechart)

      this.forceUpdate();
      console.log("Apple music return success");
    });

    axios.get("http://localhost:8000/appleAppsGamesData/" + this.state.appleRequest
    ).then((response) => {
      this.state.appleAppsGamesData = response.data.data;

      this.state.appleAppsGamesData.apps_timeline = this.state.appleAppsGamesData["apps_timeline"];
      this.state.appleAppsGamesData.games_timeline = this.state.appleAppsGamesData["games_timeline"];

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

    const styles = theme => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        height: 140,
        width: 100,
      },
      control: {
        padding: theme.spacing(2),
      },
    })

    const { classes } = this.props;

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
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container justify="center" spacing={5}>
                    <Grid >
                      <TopTenGenresList />
                    </Grid>
                    <Grid >
                      <TopTenArtistsList />
                    </Grid>
                    <Grid >
                      <TopTenTracksList />
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container justify="center">

                      <Grid >

                      </Grid>

                      <Grid >

                      </Grid>

                      <Grid >

                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container justify="center">
                      
                      <Grid >
                        
                      </Grid>

                      <Grid >
                        
                      </Grid>

                      <Grid >
                        
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              
              <GenresPieChart />
              <ArtistsBarChart />
              <TracksBarChart />
              <MusicLibraryGanttChart />
            </div>
          </div>
        </div>
        <button onClick={(e) => this.exportToImage(e)}>Export your results to an image!</button>
      </div>
    )
  }
}