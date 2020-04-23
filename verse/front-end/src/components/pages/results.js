import React, { Component, useState } from "react";
import ReactDOM from "react-dom";

//import axios from "axios";
import Header from "./../sections/header.js";
import html2canvas from "html2canvas";

import Grid from '@material-ui/core/Grid';
import ReactTooltip from "react-tooltip";

//Facebook Visuals
import IPAddressChart from "../visuals/IPAddressChart";
import ReactionBarChart from "../visuals/ReactionBarChart";
import PostPieChart from "../visuals/PostPieChart.js";

//Apple Visuals
import TotalSizeBigNum from "../visuals/TotalSizeBigNum";
import LibraryTracksBigNum from "../visuals/LibraryTracksBigNum";
import ListenTimeBigNum from "../visuals/ListenTimeBigNum";
import DevicesList from "../visuals/DevicesList";
import TopTenGenresList from "../visuals/TopTenGenresList";
import GenresPieChart from "../visuals/GenresPieChart";
import TopTenArtistsList from "../visuals/TopTenArtistsList";
import ArtistsBarChart from "../visuals/ArtistsBarChart";
import TopTenTracksList from "../visuals/TopTenTracksList";
import TracksBarChart from "../visuals/TracksBarChart";
import MusicLibraryGanttChart from "../visuals/MusicLibraryGanttChart";

//Netflix Visuals
import ShowsPieChart from "../visuals/ShowsPieChart.js";
import ShowsBarChart from "../visuals/ShowsBarChart.js";
import ShowsList from "../visuals/showsList.js";
import MoviesList from "../visuals/moviesList.js";
import WatchedNetflixBigNum from "../visuals/WatchedNetflixBigNum.js";
import ShowsGanttChart from "../visuals/ShowsGanttChart.js";

//Google Visuals
import IPMap from "../visuals/IPMap.js";
import Map from "../visuals/atomicGraphs/Map.js"
import SearchesBigNum from "../visuals/SearchesBigNum.js";
//import SearchLineChart from "../visuals/SearchLineChart.js"
import GoogleSearchWaffleChart from "../visuals/GoogleSearchWaffleChart.js";
import YoutubeSearchWaffleChart from "../visuals/YoutubeSearchWaffleChart.js";
import AdWaffleChart from "../visuals/AdWaffleChart.js";
import ChannelPieChart from "../visuals/ChannelPieChart.js";
import WebsitesList from "../visuals/WebsitesList.js";
import CompanyAdsList from "../visuals/CompanyAdsList.js";
import OffFacebookWebsitesList from "../visuals/OffFacebookWebsitesList.js";
import DirectionsBigNum from "../visuals/DirectionsBigNum.js";
import BookmarksBigNum from "../visuals/BookmarksBigNum.js";
import AdsBigNum from "../visuals/AdsBigNum.js";
import YoutubePlaylistsBigNum from "../visuals/YoutubePlaylistsBigNum.js";
import YoutubeSubscriptionsBigNum from "../visuals/YoutubeSubscriptionsBigNum.js";


function MapWrapper(data) {
  const [content, setContent] = useState("");
  return (
    <div>
      <Map setTooltipContent={setContent, data} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default class Results extends Component {

  constructor(props) {
    super(props);
    this.state = props.location.state;

    // DATA SENT FROM UPLOADS CAN BE FOUND AT 'this.state.compiledRequest'

    this.setState = ({});

  }

  componentWillMount() {

    // Facebook API Response
    if ("facebook" in this.state.compiledRequest) {
      console.log("cwm: facebook data was loaded");
      this.state.fb_name = this.state.compiledRequest.facebook.name_category_header[0];
      this.state.fb_category = this.state.compiledRequest.facebook.name_category_header[1];
      this.state.fb_locations_bar = this.state.compiledRequest.facebook.locations_barchart;
      this.state.fb_posts_pie = this.state.compiledRequest.facebook.posts_piechart;
      this.state.fb_reactions_bar = this.state.compiledRequest.facebook.reactions_barchart;
      this.state.fb_sites = this.state.compiledRequest.facebook.websites_list;
      this.state.fb_sites_ct = this.state.compiledRequest.facebook.websites_count;
      this.state.fb_off = this.state.compiledRequest.facebook.off_facebook_activity_list;
      this.state.fb_off_ct = this.state.compiledRequest.facebook.off_facebook_activity_count;
      this.state.fb_advs = this.state.compiledRequest.facebook.advertisers_list;
      this.state.fb_advs_ct = this.state.compiledRequest.facebook.advertisers_count;
    }

    else {
      console.log("cwm: facebook data was NOT loaded");
      this.state.fb_name = "";
      this.state.fb_category = "";
      this.state.fb_locations_bar = [];
      this.state.fb_posts_pie = [];
      this.state.fb_reactions_bar = [];
      this.state.fb_sites = [];
      this.state.fb_sites_ct = -1;
      this.state.fb_off = [];
      this.state.fb_off_ct = -1;
      this.state.fb_advs = [];
      this.state.fb_advs_ct = -1;
    }

    // Apple API Response
    if ("apple" in this.state.compiledRequest) {
      console.log("cwm: apple data was loaded");
      this.state.ap_total_size_GB = this.state.compiledRequest.apple.total_size_GB;
      this.state.ap_account_info_header = this.state.compiledRequest.apple.account_info_header;
      this.state.ap_devices_list = this.state.compiledRequest.apple.devices_list;
      this.state.ap_date_range = this.state.compiledRequest.apple.activity_date_range;
      this.state.ap_listen_time = this.state.compiledRequest.apple.listen_time;
      this.state.ap_genres_pie = this.state.compiledRequest.apple.genres_piechart;
      this.state.ap_genres_list = this.state.compiledRequest.apple.top_ten_genres_list;
      this.state.ap_artists_barchart = this.state.compiledRequest.apple.artists_barchart;
      this.state.ap_artists_list = this.state.compiledRequest.apple.top_ten_artists_list;
      this.state.ap_tracks_barchart = this.state.compiledRequest.apple.tracks_barchart;
      this.state.ap_tracks_list = this.state.compiledRequest.apple.top_ten_tracks_list;
      this.state.ap_activity_map = this.state.compiledRequest.apple.play_activity_map;
      this.state.ap_library_track_count = this.state.compiledRequest.apple.library_track_count;
      this.state.ap_library_gantt = this.state.compiledRequest.apple.library_song_ganttchart;
      this.state.ap_genre_timeline = this.state.compiledRequest.apple.genre_timeline;
      this.state.ap_apps_timeline = this.state.compiledRequest.apple.apps_timeline;
      this.state.ap_apps_map = this.state.compiledRequest.apple.apps_map;
    }

    else {
      console.log("cwm: apple data was NOT loaded");
      this.state.ap_total_size_GB = -1;
      this.state.ap_account_info_header = ["", "", ""];
      this.state.ap_devices_list = [];
      this.state.ap_date_range = [[-1, -1, -1], [-1, -1, -1]]
      this.state.ap_listen_time = { "hours": -1, "minutes": -1, "seconds": -1 };
      this.state.ap_genres_pie = [];
      this.state.ap_genres_list = [];
      this.state.ap_artists_barchart = [];
      this.state.ap_artists_list = [];
      this.state.ap_tracks_barchart = [];
      this.state.ap_tracks_list = [];
      this.state.ap_activity_map = {};
      this.state.ap_library_track_count = -1;
      this.state.ap_library_gantt = [];
      this.state.ap_genre_timeline = {};
      this.state.ap_apps_timeline = {};
      this.state.ap_apps_map = {};
    }

    // Google API Response
    if ("google" in this.state.compiledRequest) {
      console.log("cwm: google data was loaded");
      this.state.gg_total_size_GB = this.state.compiledRequest.google.total_size_GB;
      this.state.gg_profile_info_header = this.state.compiledRequest.google.profile_info_header;
      this.state.gg_bookmarks_count = this.state.compiledRequest.google.bookmarks_count;
      this.state.gg_saved_places_map = this.state.compiledRequest.google.saved_places_map;
      //this.state.gg_youtube_playlists = this.state.compiledRequest.google.youtube_playlists;
      //this.state.gg_youtube_playlists_count = this.state.compiledRequest.google.youtubte_playlists_count;
      //this.state.gg_youtube_subscriptions = this.state.compiledRequest.google.youtube_subscriptions;
      //this.state.gg_youtube_subscriptions_count = this.state.compiledRequest.google.youtube_subscriptions_count;
      this.state.gg_ads_count = this.state.compiledRequest.google.ads_count;
      this.state.gg_ads_list = this.state.compiledRequest.google.ads_list;
      this.state.gg_ads_waffle = this.state.compiledRequest.google.ads_waffle;
      this.state.gg_maps_activity = this.state.compiledRequest.google.maps_activity;
      this.state.gg_maps_routes_count = this.state.compiledRequest.google.maps_routes_count;
      this.state.gg_search_count = this.state.compiledRequest.google.search_count;
      this.state.gg_search_waffle = this.state.compiledRequest.google.search_waffle;
      this.state.gg_youtube_piechart = this.state.compiledRequest.google.youtube_piechart;
      this.state.gg_youtube_search_waffle = this.state.compiledRequest.google.youtube_search_waffle;
    } else {
      console.log("cwm: google data was NOT loaded");
      this.state.gg_size = -1;
      this.state.gg_profile_info_header = {"name": "", "email": ""};
      this.state.gg_bookmarks_count = [];
      this.state.gg_saved_places_map = [["", ["", ""]]];
      //this.state.gg_youtube_playlists = [];
      //this.state.gg_youtube_playlists_count = -1;
      //this.state.gg_youtube_subscriptions = [];
      //this.state.gg_youtube_subscriptions_count = -1;
      this.state.gg_ads_count = -1;
      this.state.gg_ads_list = [];
      this.state.gg_ads_waffle = [];
      this.state.gg_maps_activity = { "usages": [""], "links": ["", ""], "views": ["", ""], "searches": ["", ""], "calls": ["", ""], "directions": ["", "", "", ""]};
      this.state.gg_maps_routes_count = -1;
      this.state.gg_search_count = -1;
      this.state.gg_search_waffle = [];
      this.state.gg_youtube_piechart = [];
      this.state.gg_youtube_search_waffle = [];
    }

    // Netflix API Response
    if ("netflix" in this.state.compiledRequest) {
      console.log("cwm: netflix data was loaded");
      this.state.nf_watch_count = this.state.compiledRequest.netflix.totalCount;
      this.state.nf_shows = this.state.compiledRequest.netflix.shows;
      this.state.nf_movies = this.state.compiledRequest.netflix.movies;
      this.state.nf_shows_generalchart = this.state.compiledRequest.netflix.shows_piechart;
      this.state.nf_shows_ganttchart = this.state.compiledRequest.netflix.shows_ganttchart;
    } else {
      console.log("cwm: netflix data was NOT loaded");
      this.state.nf_watch_count = -1;
      this.state.nf_shows = [];
      this.state.nf_movies = [];
      this.state.nf_shows_generalchart = [];
      this.state.nf_shows_ganttchart = [];
    }
  }

  componentDidMount() {
    console.log(this.state);

    // decides whether or not to show the visuals for each section
    if ("facebook" in this.state.compiledRequest) {
      console.log("cdm: facebook data was loaded");
    } else {
      console.log("cdm: facebook data was NOT loaded");
      document.getElementById("facebookvisuals").style.display = "none";
    }

    if ("apple" in this.state.compiledRequest) {
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

    /*<div class="chart">
                <PostPieChart data={this.state.fb_post_pie} />
              </div>*/

              /*<div class="chart">
              <SearchLineChart data={this.state.compiledRequest.google.line_year_searches}/>
            </div>*/

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
              <h1 class="visualstitle" id="facebooktitle">Facebook</h1>
              <h1>Name: {this.state.fb_name}</h1>
              <h2>Category: {this.state.fb_category}</h2>

              <IPMap data={this.state.fb_locations_bar} />

              <IPAddressChart data={this.state.fb_locations_bar} />
              <PostPieChart data={this.state.fb_posts_pie} />
              <ReactionBarChart data={this.state.fb_reactions_bar} />

              <Grid container spacing={5}>

                <Grid item xs={12}>
                  <Grid container justify="center" spacing={5}>

                    <Grid spacing={3}>
                      <WebsitesList data={this.state.fb_sites} count={this.state.fb_sites_ct} />
                    </Grid>

                    <Grid >
                      <OffFacebookWebsitesList data={this.state.fb_off} count={this.state.fb_off_ct} />
                    </Grid>

                    <Grid >
                      <CompanyAdsList data={this.state.fb_advs} count={this.state.fb_advs_ct} />
                    </Grid>

                  </Grid>
                </Grid>

              </Grid>
            </div>

            <div class="visualssection" id="applevisuals">
              <h1 class="visualstitle" id="appletitle">Apple</h1>
              <Grid container spacing={5}>

                <Grid item xs={12}>
                  <Grid container justify="center" spacing={3}>
                    <Grid>
                      <TotalSizeBigNum data={this.state.ap_total_size_GB} />
                    </Grid>

                    <Grid>
                      <LibraryTracksBigNum data={this.state.ap_library_track_count} />
                    </Grid>
                  </Grid>
                  <Grid>
                    <ListenTimeBigNum data={this.state.ap_listen_time} date_range={this.state.ap_date_range} />
                  
                    <DevicesList data={this.state.ap_devices_list} />

                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container justify="center" spacing={5}>
                    <Grid spacing={3}>
                      <TopTenGenresList key={3} data={this.state.ap_genres_list} date_range={this.state.ap_date_range} />
                    </Grid>
                    <Grid >
                      <TopTenArtistsList key={4} data={this.state.ap_artists_list} date_range={this.state.ap_date_range} />
                    </Grid>
                    <Grid >
                      <TopTenTracksList key={5} data={this.state.ap_tracks_list} date_range={this.state.ap_date_range} />
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>

              <IPMap />

              <GenresPieChart data={this.state.ap_genres_pie} />
              <ArtistsBarChart data={this.state.ap_artists_barchart} />
              <TracksBarChart data={this.state.ap_tracks_barchart} />
              <MusicLibraryGanttChart data={this.state.ap_library_gantt} />
            </div>

            <div class="visualssection" id="netflixvisuals">
              <h1 class="visualstitle" id="netflixtitle">Netflix</h1>
              <WatchedNetflixBigNum data={this.state.nf_watch_count} />
              <Grid item xs={12}>
                <Grid container justify="center" spacing={3}>
                  <Grid key={0}>
                    <ShowsList data={this.state.nf_shows} />
                  </Grid>
                  <Grid key={1}>
                    <MoviesList data={this.state.nf_movies} />
                  </Grid>
                </Grid>
              </Grid>
              <div class="chart">
                <ShowsPieChart data={this.state.nf_shows_generalchart} />
              </div>
              <div class="chart">
                <ShowsBarChart data={this.state.nf_shows_generalchart} />
              </div>
              <ShowsGanttChart data={this.state.nf_shows_ganttchart} />
              
            </div>

            <div class="visualssection" id="googlevisuals">
              <h1>Name: {this.state.gg_profile_info_header.name}</h1>
              <h2>Gmail: {this.state.gg_profile_info_header.email}</h2>

              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Grid container justify="center" spacing={3}>

                    <Grid spacing={3}>
                      <Grid key={1}> 
                        <SearchesBigNum data={this.state.gg_search_count} />
                      </Grid>

                      <Grid key={2}>
                        <DirectionsBigNum data={this.state.gg_maps_routes_count} />
                      </Grid>
                    </Grid>
                    
                    <Grid spacing={3}>
                      <Grid key={3}>
                        <AdsBigNum data={this.state.gg_ads_count} />
                      </Grid>

                      <Grid key={5}>
                        <YoutubePlaylistsBigNum />
                      </Grid>
                    </Grid>
                    
                    <Grid spacing={3}>
                      <Grid key={4}>
                        <BookmarksBigNum data={this.state.gg_bookmarks_count} />
                      </Grid>

                      <Grid key={6}>
                        <YoutubeSubscriptionsBigNum />
                      </Grid>
                    </Grid>
                  </Grid>

                  <IPMap />
                </Grid>
              </Grid>

              <GoogleSearchWaffleChart data={this.state.gg_search_waffle} 
                                        from="2017-03-01" 
                                        to="2020-04-01" 
                                        maxValue={30}/>
              
              <YoutubeSearchWaffleChart data={this.state.gg_youtube_search_waffle} 
                                        from="2013-03-01" 
                                        to="2016-04-01"
                                        maxValue={20}/>
            
              <AdWaffleChart data={this.state.gg_ads_waffle}
                              from="2018-03-01" 
                              to="2020-04-01"
                              maxValue={20}/>
            
              <ChannelPieChart data={this.state.gg_youtube_piechart}/>
            </div>
          </div>
        </div>
        <button onClick={(e) => this.exportToImage(e)}>Export your results to an image!</button>
      </div>
    )
  }
}