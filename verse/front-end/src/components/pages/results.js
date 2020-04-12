import React, { Component } from "react";

import axios from "axios";
import Header from "./../sections/header.js";
import html2canvas from "html2canvas";

import Grid from '@material-ui/core/Grid';

//Facebook Visuals
import IPAdressChart from "../visuals/IPAddressChart";
import ReactionBarChart from "../visuals/ReactionBarChart";
import PostPieChart from "../visuals/PostPieChart.js";
import LocationPieChart from "../visuals/LocationPieChart.js";
import DrivePieChart from "../visuals/DrivePieChart.js";
import ChannelPieChart from "../visuals/ChannelPieChart.js";

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


export default class Results extends Component {

  constructor(props) {
    super(props);
    console.log(props.location.state);
    this.state = props.location.state;
    this.setState = ({
      //vals: "hi",
      fb_name: "",
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

      google_name: "",
      email: "",
      assistant_num: 0,
      google_sites_num: 0,
      subscriptions: 0,
      prof_pic_num: 0,
      playlists: 0,
      contacts: "",
      google_ad: "",
      google_sites: "",
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
    this.getFacebookData = this.getFacebookData.bind(this);
    this.getAppleData = this.getAppleData.bind(this);
  }

  componentDidMount() {
    if (this.state.facebookRequest != "") {
      this.getFacebookData();
    } else {
      document.getElementById("facebookvisuals").style.display = "none";
    }
    if (this.state.googleRequest != "") {
      // get google data
    } else {
      document.getElementById("googlevisuals").style.display = "none";
    }
    if (this.state.appleRequest != "") {
      this.getAppleData();
    } else {
      document.getElementById("applevisuals").style.display = "none";
    }
  }

  async getFacebookData() {
    
    axios.get("http://localhost:8000/facebookData/" + this.state.facebookRequest
    ).then((response) => {
      this.state.facebookData = response.data.data;
      console.log("Facebook analyze return success");
      console.log(this.state.facebookData);
      this.state.fb_name = this.state.facebookData["name_category_header"]["0"];
      this.state.category = this.state.facebookData["name_category_header"]["1"];
      this.state.full_locations = this.state.facebookData["locations_piechart"];
      this.state.your_posts = this.state.facebookData["posts_linegraph"]["0"];
      this.state.other_posts = this.state.facebookData["posts_linegraph"]["1"];
      this.state.comments = this.state.facebookData["posts_linegraph"];
      this.state.reactions = this.state.facebookData["reactions_pictograph"];
      this.state.sites = this.state.facebookData["websites_list"];
      this.state.sites_num = this.state.facebookData["websites_count"];
      this.state.companies = this.state.facebookData["advertisers_list"];
      this.state.companies_num = this.state.companies.length;
      this.state.off_num = this.state.facebookData["off-facebook_activity_count"];
      //this.state.vals = "hi"
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
          </div>
          <div id="mainvisuals">
            <div class="visualssection" id="facebookvisuals">
              <h1>Name: {this.state.fb_name}</h1>
              <h2>Category: {this.state.category}</h2>
              <div class="chart">
                <IPAdressChart/>
              </div>
              <div class="chart">
                <PostPieChart/>
              </div>
              <div class="chart">
                <ReactionBarChart/>
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
              <h1>Name: {this.state.google_name}</h1>
              <h2>Gmail: {this.state.email}</h2>
              <div class="chart">
                <LocationPieChart/>
              </div>
              <div class="chart">
                <DrivePieChart/>
              </div>
              <div class="chart">
                <ChannelPieChart/>
              </div>
              <p>Number of times Google Assistant has been used: {this.state.assistant_num}</p>
              <p>List of Websites You Have Logged Into Using Google:</p>
              <select id="select_google_sites" size="5"></select>
              <p>Total Number: {this.state.google_sites_num}</p>
              <p>List of Websites that have advertised to you through Google:</p>
              <select id="select_google_comp" size="5"></select>
              <p>Your Google contacts:</p>
              <select id="select_google_contacts" size="5"></select>
              <p>Number of YouTube subscriptions: {this.state.subscriptions}</p>
              <p>Number of profile pictures uploaded: {this.state.prof_pic_num}</p>
              <p>Number of YouTube playlists created: {this.state.playlists}</p>
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
          </div>
        </div>
        <button onClick={(e) => this.exportToImage(e)}>Export your results to an image!</button>
      </div>
    )
  }
}