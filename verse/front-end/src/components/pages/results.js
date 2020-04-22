import React, { Component } from "react";

//import axios from "axios";
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
import WebsitesList from "../visuals/WebsitesList.js";
import CompanyAdsList from "../visuals/CompanyAdsList.js";
import OffFacebookWebsitesList from "../visuals/OffFacebookWebsitesList.js";

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

import ShowsList from "../visuals/showsList.js";
import MoviesList from "../visuals/moviesList.js";
import WatchedNetflixBigNum from "../visuals/WatchedNetflixBigNum.js";


export default class Results extends Component {

  constructor(props) {
    super(props);
    console.log(props.location.state);
    this.state = props.location.state;

    // DATA SENT FROM UPLOADS CAN BE FOUND AT 'this.state.compiledRequest'

    this.setState = ({

    });
  }

  componentWillMount() {

    // Facebook API Response
    if ("facebook" in this.state.compiledRequest) {
      console.log("cwm: facebook data was loaded");
      this.state.name = this.state.compiledRequest.facebook.name_category_header[0];
      this.state.category = this.state.compiledRequest.facebook.name_category_header[1];
      this.state.locations_bar = this.state.compiledRequest.facebook.locations_barchart;
      this.state.posts_pie = this.state.compiledRequest.facebook.posts_piechart;
      this.state.reactions_bar = this.state.compiledRequest.facebook.reactions_barchart;
      this.state.sites = this.state.compiledRequest.facebook.websites_list;
      this.state.sites_ct = this.state.compiledRequest.facebook.websites_count;
      this.state.off = this.state.compiledRequest.facebook.off_facebook_activity_list;
      this.state.off_ct = this.state.compiledRequest.facebook.off_facebook_activity_count;
      this.state.advs = this.state.compiledRequest.facebook.advertisers_list;
      this.state.advs_ct = this.state.compiledRequest.facebook.advertisers_count;
    }

    else {
      console.log("cwm: facebook data was NOT loaded");
      this.state.name = "";
      this.state.category = "";
      this.state.locations_bar = [];
      this.state.posts_pie = [];
      this.state.reactions_bar = [];
      this.state.sites = [];
      this.state.sites_ct = 0;
      this.state.off = [];
      this.state.off_ct = 0;
      this.state.advs = [];
      this.state.advs_ct = 0;
    }

    // Apple API Response
    if ("applegeneral" in this.state.compiledRequest && "applemusic" in this.state.compiledRequest) {
      console.log("cwm: apple data was loaded");
      this.state.total_size = this.state.compiledRequest.applegeneral.total_size_bignum;
      this.state.listen_time = this.state.compiledRequest.applemusic.total_listen_time_bignum;
      this.state.date_range = this.state.compiledRequest.applemusic.activity_date_range;
      this.state.genres_list = this.state.compiledRequest.applemusic.top_ten_genres_list;
      this.state.artists_list = this.state.compiledRequest.applemusic.top_ten_artists_list;
      this.state.tracks_list = this.state.compiledRequest.applemusic.top_ten_tracks_list;
      this.state.genres_pie = this.state.compiledRequest.applemusic.play_activity_genres_piechart;
      this.state.artists_bar = this.state.compiledRequest.applemusic.play_activity_artists_barchart;
      this.state.tracks_bar = this.state.compiledRequest.applemusic.play_activity_track_barchart;
      this.state.library_gantt = this.state.compiledRequest.applemusic.library_song_ganttchart;
    }

    else {
      console.log("cwm: apple data was NOT loaded");
      this.state.total_size = 0;
      this.state.listen_time = {"hours": 0, "minutes": 0, "seconds": 0};
      this.state.date_range = ([0, 0, 0], [0, 0, 0])
      this.state.genres_list = [];
      this.state.artists_list = [];
      this.state.tracks_list = [];
      this.state.genres_pie = [];
      this.state.artists_bar = [];
      this.state.tracks_bar = [];
      this.state.library_gantt = [];
    }

    if ("google" in this.state.compiledRequest) {
      console.log("cwm: google data was loaded");
      this.state.google = this.state.compiledRequest.google;
    } else {
      console.log("cwm: google data was NOT loaded");
    }

    if ("netflix" in this.state.compiledRequest) {
      console.log("cwm: netflix data was loaded");
      this.state.netflix = this.state.compiledRequest.netflix;
    } else {
      console.log("cwm: netflix data was NOT loaded");
    }
    
  }


  componentDidMount() {
    console.log("Did mount");
    console.log(this.state);

    // decides whether or not to show the visuals for each section
    if ("facebook" in this.state.compiledRequest) {
      console.log("cdm: facebook data was loaded");
    } else {
      console.log("cdm: facebook data was NOT loaded");
      document.getElementById("facebookvisuals").style.display = "none";
    }

    if ("applegeneral" in this.state.compiledRequest) {
      console.log("cdm: apple data was loaded");
    } else {
      console.log("cdm: apple data was NOT loaded");
      document.getElementById("applevisuals").style.display = "none";
    }

    if ("google" in this.state.compiledRequest) {
      console.log("cdm: google data was loaded");
    } else {
      console.log("cdm: google data was NOT loaded");
      document.getElementById("googlevisuals").style.display = "none";
    }

    if ("netflix" in this.state.compiledRequest) {
      console.log("cdm: netflix data was loaded");
    } else {
      console.log("cdm: netflix data was NOT loaded");
      document.getElementById("netflixvisuals").style.display = "none";
    }

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
          <div id="sidebar">
            <p>Toggle</p>
            <button class="showvisualsbutton" id="showfacebookvisuals" onClick={(e) => this.toggleSection(e)}>Facebook</button>
            <button class="showvisualsbutton" id="showgooglevisuals" onClick={(e) => this.toggleSection(e)}>Google</button>
            <button class="showvisualsbutton" id="showapplevisuals" onClick={(e) => this.toggleSection(e)}>Apple</button>
            <button class="showvisualsbutton" id="shownetflixvisuals" onClick={(e) => this.toggleSection(e)}>Netflix</button>
          </div>
          <div id="mainvisuals">
            <h1>Results</h1>
            <div class="visualssection" id="facebookvisuals">
              <h1>Name: {this.state.name}</h1>
              <h2>Category: {this.state.category}</h2>

              <IPAdressChart data={this.state.locations_bar} />
              <PostPieChart data={this.state.posts_pie} />
              <ReactionBarChart data={this.state.reactions_bar} />

              <Grid container spacing={5}>

                <Grid item xs={12}>
                  <Grid container justify="center" spacing={5}>

                    <Grid spacing={3}>
                      <WebsitesList data={this.state.sites} count={this.state.sites_ct} />
                    </Grid>

                    <Grid >
                      <OffFacebookWebsitesList data={this.state.off} count={this.state.off_ct} />
                    </Grid>

                    <Grid >
                      <CompanyAdsList data={this.state.advs} count={this.state.advs_ct} />
                    </Grid>

                  </Grid>
                </Grid>

              </Grid>
            </div>

            <div class="visualssection" id="applevisuals">
              <Grid container spacing={5}>

                <Grid item xs={12}>
                  <Grid container justify="center" spacing={3}>
                    <Grid key={0}>
                      <TotalSizeBigNum data={this.state.total_size} />
                    </Grid>
                    <Grid key={1}>
                      <ListenTimeBigNum data={this.state.listen_time} date_range={this.state.date_range} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container justify="center" spacing={5}>
                    <Grid spacing={3}>
                      <TopTenGenresList key={3} data={this.state.genres_list} date_range={this.state.date_range} />
                    </Grid>
                    <Grid >
                      <TopTenArtistsList key={4} data={this.state.artists_list} date_range={this.state.date_range} />
                    </Grid>
                    <Grid >
                      <TopTenTracksList key={5} data={this.state.tracks_list} date_range={this.state.date_range} />
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>

              <GenresPieChart data={this.state.genres_pie} />
              <ArtistsBarChart data={this.state.artists_bar} />
              <TracksBarChart data={this.state.tracks_bar} />
              <MusicLibraryGanttChart data={this.state.library_gantt} />
            </div>

            <div class="visualssection" id="googlevisuals">
              <h1>Name: {this.state.google_name}</h1>
              <h2>Gmail: {this.state.email}</h2>
              <div class="chart">
                <LocationPieChart />
              </div>
              <div class="chart">
                <DrivePieChart />
              </div>
              <div class="chart">
                <ChannelPieChart />
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

            <div class="visualssection" id="netflixvisuals">
            <WatchedNetflixBigNum data={this.state.netflix.totalCount} />
            <Grid item xs={12}>
              <Grid container justify="center" spacing={3}>
                <Grid key={0}>
                  <ShowsList data={this.state.netflix.shows} />
                </Grid>
                <Grid key={1}>
                  <MoviesList data={this.state.netflix.movies} />
                </Grid>
              </Grid>
            </Grid>
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