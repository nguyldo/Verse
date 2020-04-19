import React, { Component } from "react";

//import axios from "axios";
import Header from "./../sections/header.js";
import html2canvas from "html2canvas";

import Grid from '@material-ui/core/Grid';

//Facebook Visuals
import IPAdressChart from "../visuals/IPAddressChart";
import ReactionBarChart from "../visuals/ReactionBarChart";
import PostPieChart from "../visuals/PostPieChart.js";

//Apple Visuals
import TotalSizeBigNum from "../visuals/TotalSizeBigNum";
import ListenTimeBigNum from "../visuals/ListenTimeBigNum";
import TopTenGenresList from "../visuals/TopTenGenresList";
import GenresPieChart from "../visuals/GenresPieChart";
import TopTenArtistsList from "../visuals/TopTenArtistsList";
import ArtistsBarChart from "../visuals/ArtistsBarChart";
import TopTenTracksList from "../visuals/TopTenTracksList";
import TracksBarChart from "../visuals/TracksBarChart";
import MusicLibraryGanttChart from "../visuals/MusicLibraryGanttChart";


import ShowsPieChart from "../visuals/ShowsPieChart.js";
import ShowsBarChart from "../visuals/ShowsBarChart.js";


export default class Results extends Component {

  constructor(props) {
    super(props);
    console.log(props.location.state);
    this.state = props.location.state;

    // DATA SENT FROM UPLOADS CAN BE FOUND AT 'this.state.compiledRequest'

    this.setState = ({
      //vals: "hi",
      
      // ERROR HANDLING
      facebook: {
        locations_barchart: [{}],
        posts_piechart: [{}],
        reactions_barchart: [{}]
      },

      name: "",
      category: "",
      full_locations: [],
      locations: {},
      your_posts: [],
      other_posts: [],
      comments: [],
      companies: [],
      companies_num: 0,
      off_num: 0,
      sites: [],
      sites_num: 0,
      facebookData: {},

      googleData: {},

      vals: "testing",

      appleGeneralData: {},
      appleMusicData: {},
      appleAppsGamesData: {},

      total_size_bignum: 0,
      personal_info_header: "",
      devices_list:  "",
 
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

      apps_timeline: [],
      games_timeline: []

    });
    // this.getFacebookData = this.getFacebookData.bind(this);
    // this.getAppleData = this.getAppleData.bind(this);
  }

  componentWillMount() {
    
    if ("facebook" in this.state.compiledRequest) {
      console.log("facebook data was loaded");
      this.state.name = this.state.compiledRequest.facebook["name_category_header"]["0"];
      this.state.category = this.state.compiledRequest.facebook["name_category_header"]["1"];
      this.state.full_locations = this.state.compiledRequest.facebook["locations_piechart"];
      this.state.your_posts = this.state.compiledRequest.facebook["posts_linegraph"]["0"];
      this.state.other_posts = this.state.compiledRequest.facebook["posts_linegraph"]["1"];
      this.state.comments = this.state.compiledRequest.facebook["posts_linegraph"];
      this.state.reactions = this.state.compiledRequest.facebook["reactions_pictograph"];
      this.state.sites = this.state.compiledRequest.facebook["websites_list"];
      this.state.sites_num = this.state.compiledRequest.facebook["websites_count"];
      this.state.companies = this.state.compiledRequest.facebook["advertisers_list"];
      this.state.companies_num = this.state.companies.length;
      this.state.off_num = this.state.compiledRequest.facebook["off-facebook_activity_count"];
      this.state.facebook = this.state.compiledRequest.facebook;

    } else {
      console.log("facebook data was NOT loaded");
      this.state.facebook = {
        locations_barchart: [{id: 0, label: "", value: 0}],
        posts_piechart: [{id: 0, label: "", value: 0}],
        reactions_barchart: [{id: 0, label: "", value: 0}]
      };
    }

    if ("applegeneral" in this.state.compiledRequest) {
      console.log("apple data was loaded");
      this.state.applegeneral = this.state.compiledRequest.applegeneral;
      this.state.applemusic = this.state.compiledRequest.applemusic;
      this.state.applegames = this.state.compiledRequest.applegames;
    } else {
      console.log("apple data was NOT loaded");
    }

    if ("google" in this.state.compiledRequest) {
      console.log("google data was loaded");
      this.state.google = this.state.compiledRequest.google;
    } else {
      console.log("google data was NOT loaded");
    }

    if ("netflix" in this.state.compiledRequest) {
      console.log("netflix data was loaded");
      this.state.netflix = this.state.compiledRequest.netflix;
    } else {
      console.log("netflix data was NOT loaded");
    }

  }

  componentDidMount() {
    console.log("Did mount");
    console.log(this.state);

    // decides whether or not to show the visuals for each section
    if ("facebook" in this.state.compiledRequest) {
      /*
      console.log("facebook data was loaded");
      this.state.name = this.state.compiledRequest.facebook["name_category_header"]["0"];
      this.state.category = this.state.compiledRequest.facebook["name_category_header"]["1"];
      this.state.full_locations = this.state.compiledRequest.facebook["locations_piechart"];
      this.state.your_posts = this.state.compiledRequest.facebook["posts_linegraph"]["0"];
      this.state.other_posts = this.state.compiledRequest.facebook["posts_linegraph"]["1"];
      this.state.comments = this.state.compiledRequest.facebook["posts_linegraph"];
      this.state.reactions = this.state.compiledRequest.facebook["reactions_pictograph"];
      this.state.sites = this.state.compiledRequest.facebook["websites_list"];
      this.state.sites_num = this.state.compiledRequest.facebook["websites_count"];
      this.state.companies = this.state.compiledRequest.facebook["advertisers_list"];
      this.state.companies_num = this.state.companies.length;
      this.state.off_num = this.state.compiledRequest.facebook["off-facebook_activity_count"];
      this.state.facebook = this.state.compiledRequest.facebook;*/
      //this.state.vals = "hi"
      this.forceUpdate();
      this.populateSelect();
      this.populateLocationDict();
    } else {
      //console.log("facebook data was NOT loaded");
      document.getElementById("facebookvisuals").style.display = "none";
      /*
      this.state.facebook = {
        locations_barchart: {},
        posts_piechart: {},
        reactions_barchart: {}
      };*/
    }

    if ("applegeneral" in this.state.compiledRequest) {
      /*
      console.log("apple data was loaded");
      this.state.applegeneral = this.state.compiledRequest.applegeneral;
      this.state.applemusic = this.state.compiledRequest.applemusic;
      this.state.applegames = this.state.compiledRequest.applegames;
      */
    } else {
      console.log("apple data was NOT loaded");
      document.getElementById("applevisuals").style.display = "none";
    }

    if ("google" in this.state.compiledRequest) {
      /*
      console.log("google data was loaded");
      this.state.google = this.state.compiledRequest.google;
      */
    } else {
      console.log("google data was NOT loaded");
      document.getElementById("googlevisuals").style.display = "none";
    }

    if ("netflix" in this.state.compiledRequest) {
      /*
      console.log("netflix data was loaded");
      this.state.netflix = this.state.compiledRequest.netflix;
      */
    } else {
      console.log("netflix data was NOT loaded");
      document.getElementById("netflixvisuals").style.display = "none";
    }

  }

  async getFacebookData() {
    
    /*
    axios.get("http://localhost:8000/facebookData/" + this.state.facebookRequest
    ).then((response) => {
      
    });
    */
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
    var options = this.state.companies;
    for (var i = 0; i < this.state.companies.length; i ++) {
      var opt = options[i];
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
    /*
    axios.get("http://localhost:8000/appleGeneralData/" + this.state.appleRequest
    ).then((response) => {
      this.state.appleGeneralData = response.data.data;

      this.state.total_size_bignum = this.state.appleGeneralData["total_size_bignum"];
      this.state.personal_info_header = this.state.appleGeneralData["personal_info_header"];
      this.state.devices_list = this.state.appleGeneralData["devices_list"];

      this.forceUpdate();
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

      this.state.apps_timeline = this.state.appleAppsGamesData["apps_timeline"];
      this.state.games_timeline = this.state.appleAppsGamesData["games_timeline"];

      this.forceUpdate();
      console.log("Apple apps games return success");
    });
    */
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
    } else if (id == "showapplevisuals") {
      if (document.getElementById("applevisuals").style.display == "none") {
        document.getElementById("applevisuals").style.display = "block";
      } else {
        document.getElementById("applevisuals").style.display = "none";
      }
    } else {
      if (document.getElementById("netflixvisuals").style.display == "none") {
        document.getElementById("netflixvisuals").style.display = "block";
      } else {
        document.getElementById("netflixvisuals").style.display = "none";
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
        padding: theme.spacing(5),
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
            <button class="showvisualsbutton" id="shownetflixvisuals" onClick={(e) => this.toggleSection(e)}>Netflix</button>
          </div>
          <div id="mainvisuals">
            <div class="visualssection" id="facebookvisuals">
              <h1>Name: {this.state.name}</h1>
              <h2>Category: {this.state.category}</h2>
              <div class="chart">
                <IPAdressChart data={this.state.facebook.locations_barchart} />
              </div>
              <div class="chart">
                <PostPieChart data={this.state.facebook.posts_piechart} />
              </div>
              <div class="chart">
                <ReactionBarChart data={this.state.facebook.reactions_barchart} />
              </div>
              <p>List of Websites You Have Logged Into Using Facebook:</p>
              <select id="select_sites" size="5"></select>
              <p>Total Number: {this.state.sites_num}</p>
              <p>Companies Who Have Directed Ads Towards You On Facebook:</p>
              <select id="select_comp" size="5"></select>
              <p>Total Number: {this.state.companies_num}</p>
              <p>Number of Off-Facebook Websites and Apps that Facebook Tracks: {this.state.off_num}</p>
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
              <Grid container spacing={5}>

                <Grid item xs={12}>
                  <Grid container justify="center" spacing={3}>
                    <Grid key={0}>
                      <TotalSizeBigNum />
                    </Grid>
                    <Grid key={1}>
                      <ListenTimeBigNum />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container justify="center" spacing={5}>
                    <Grid spacing={3}>
                      <TopTenGenresList key={3}/>
                    </Grid>
                    <Grid >
                      <TopTenArtistsList key={4}/>
                    </Grid>
                    <Grid >
                      <TopTenTracksList key={5}/>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              
              <GenresPieChart />
              <ArtistsBarChart />
              <TracksBarChart />
              <MusicLibraryGanttChart />
            </div>
            <div class="visualssection" id="netflixvisuals">
              <div class="chart">
                <ShowsPieChart data={this.state.netflix.shows_piechart} />
              </div>
              <div class="chart">
                <ShowsBarChart data={this.state.netflix.shows_piechart} />
              </div>
            </div>
          </div>
        </div>
        <button onClick={(e) => this.exportToImage(e)}>Export your results to an image!</button>
      </div>
    )
  }
}