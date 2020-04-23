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

// import jsPDF from "../visuals/jspdf.min.js";
import jsPDF from 'jspdf';
import { json } from "d3";



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

    console.log("CWM debug")
    console.log(this.state)
  }

  componentDidMount() {
    console.log(this.state);

    // decides whether or not to show the visuals for each section
    if ("facebook" in this.state.compiledRequest) {
      console.log("cdm: facebook data was loaded");
      document.getElementById("showfacebookvisuals").style.backgroundColor = "#69A4BA";
    } else {
      console.log("cdm: facebook data was NOT loaded");
      document.getElementById("facebookvisuals").style.display = "none";
      document.getElementById("showfacebookvisuals").style.display = "none";
    }

    if ("apple" in this.state.compiledRequest) {
      console.log("cdm: apple data was loaded");
      document.getElementById("showapplevisuals").style.backgroundColor = "#FFB2B2";
    } else {
      console.log("cdm: apple data was NOT loaded");
      document.getElementById("applevisuals").style.display = "none";
      document.getElementById("showapplevisuals").style.display = "none";
    }

    if ("google" in this.state.compiledRequest) {
      console.log("cdm: google data was loaded");
      document.getElementById("showgooglevisuals").style.backgroundColor = "#FFFF77";
    } else {
      console.log("cdm: google data was NOT loaded");
      document.getElementById("googlevisuals").style.display = "none";
      document.getElementById("showgooglevisuals").style.display = "none";
    }
    
    if ("netflix" in this.state.compiledRequest) {
      console.log("cdm: netflix data was loaded");
      document.getElementById("shownetflixvisuals").style.backgroundColor = "#FF4A55";
    } else {
      console.log("cdm: netflix data was NOT loaded");
      document.getElementById("netflixvisuals").style.display = "none";
      document.getElementById("shownetflixvisuals").style.display = "none";
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
        document.getElementById("showfacebookvisuals").style.backgroundColor = "#69A4BA";
      } else {
        document.getElementById("facebookvisuals").style.display = "none";
        document.getElementById("showfacebookvisuals").style.backgroundColor = "#F0F0F0";
        
      }
    } else if (id == "showgooglevisuals") {
      if (document.getElementById("googlevisuals").style.display == "none") {
        document.getElementById("googlevisuals").style.display = "block";
        document.getElementById("showgooglevisuals").style.backgroundColor = "#FFFF77";
      } else {
        document.getElementById("googlevisuals").style.display = "none";
        document.getElementById("showgooglevisuals").style.backgroundColor = "#F0F0F0";
      }
    } else if (id == "showapplevisuals") {
      if (document.getElementById("applevisuals").style.display == "none") {
        document.getElementById("applevisuals").style.display = "block";
        document.getElementById("showapplevisuals").style.backgroundColor = "#FFB2B2";
      } else {
        document.getElementById("applevisuals").style.display = "none";
        document.getElementById("showapplevisuals").style.backgroundColor = "#F0F0F0";
      }
    } else {
      if (document.getElementById("netflixvisuals").style.display == "none") {
        document.getElementById("netflixvisuals").style.display = "block";
        document.getElementById("shownetflixvisuals").style.backgroundColor = "#FF4A55";
      } else {
        document.getElementById("netflixvisuals").style.display = "none";
        document.getElementById("shownetflixvisuals").style.backgroundColor = "#F0F0F0";
      }
    }
  }

  //npm install jspdf --save
  genPDF() {
	
    var docPdf = new jsPDF();
    
    // if ("netflix" in this.state.compiledRequest) {
    
      // Netflix:

      // Not used in pdf:
      // this.state.shows_generalchart
      // this.state.shows_ganttchart

      // Used in pdf:
      /*
        watch count
        shows
        movies
      */

      docPdf.text('Your Data Dump Summary', 70, 20);
      docPdf.text('Netflix Summary', 85, 30);
      docPdf.setFontSize(12);


      var watchCount;
      if (this.state.watch_count == 0) {
        watchCount = "0";
      } else {
        watchCount = JSON.stringify(this.state.watch_count);
      }
      var showList;
      for (var g in this.state.shows) {
        showList = showList + this.state.shows[g] + ", "
      }
      var movieList;
      for (var g in this.state.movies) {
        movieList = movieList + this.state.movies[g] + ", "
      }
      var netflixString = "Watch Count: " + watchCount + '\n\n' + 
                          "Shows: " + showList + '\n\n' +
                          "Movies: " + movieList + 
                          '\n\n';
                      
      var netflixAddString;
      if (netflixString.length > 2000) {
        var l = 0;
        var r = netflixString.length;
        var m = r/2 - l;
        if (m > 2000) {
          m = 2000;
        }
        do {
          var index = m;
          var nfString = netflixString.substr(l, m - l);
          while (index > l) {
            if (nfString[index] == "," || nfString[index] == "\n") {
              index++;
              break;
            } else {
              index--;
            }
          }
          // var pastM = m;
          if (index > l) {
            m = index;
          } else {
            m = m - l;
          }
          nfString = netflixString.substr(l, m);
          netflixAddString = docPdf.splitTextToSize(nfString, 150);
          docPdf.text(netflixAddString, 30, 40);
          // docPdf.text("l: " + l + ", r: " + r + ", m: " + pastM + ", index: " + index, 30, 10);
          if (l + m < r) {
            docPdf.addPage();
            docPdf.setFontSize(16);
            docPdf.text('Your Data Dump Summary', 70, 20);
            docPdf.text('Netflix Summary', 85, 30);
            docPdf.setFontSize(12);
          }
          l += m;
          m = l;
          if (r - m > 2750) {
            m = m + 2750;
          } else if (r - m > 0) {
            m = r;
          } else {
            m = r + 1;
          }
        } while (m <= r);
        
      } else {
        netflixAddString = docPdf.splitTextToSize(netflixString, 150);
        docPdf.text(netflixAddString, 30, 40);
      }


    // }

    // if ("applegeneral" in this.state.compiledRequest) {

      docPdf.addPage();
      

      // Apple:

      // Not used in pdf:
      // this.state.genres_pie = [];
      // this.state.artists_bar = [];
      // this.state.tracks_bar = [];
      // this.state.library_gantt = [];

      // Used in pdf:
      /*
        total size
        listen time
        date range
        genres list
        artists list
        tracks list
      */
      
      docPdf.setFontSize(16);
      docPdf.text('Your Data Dump Summary', 70, 20);
      docPdf.text('Apple Summary', 85, 30);
      docPdf.setFontSize(12);


      var totalSize;
      if (this.state.total_size == 0) {
        totalSize = "0";
      } else {
        totalSize = JSON.stringify(this.state.total_size);
      }
      var listen;
      listen = this.state.listen_time['hours'] + " hours, " + 
               this.state.listen_time['minutes'] + " minutes, " + 
               this.state.listen_time['seconds'] + " seconds ";

      var rang = " ";
      var sdl = 1;
      for (var jlk in this.state.date_range) {
        if (sdl == 1) {
          rang = rang + jlk + ", ";
        } else if (sdl == 2) {
          if (jlk == 1) {
            rang = rang + "January ";
          } else if (jlk == 2) {
            rang = rang + "February ";
          } else if (jlk == 3) {
            rang = rang + "March ";
          } else if (jlk == 4) {
            rang = rang + "April ";
          } else if (jlk == 5) {
            rang = rang + "May ";
          } else if (jlk == 6) {
            rang = rang + "June ";
          } else if (jlk == 7) {
            rang = rang + "July ";
          } else if (jlk == 8) {
            rang = rang + "August ";
          } else if (jlk == 9) {
            rang = rang + "September ";
          } else if (jlk == 10) {
            rang = rang + "October ";
          } else if (jlk == 11) {
            rang = rang + "November ";
          } else if (jlk == 12) {
            rang = rang + "December ";
          } else {
            rang = rang + "Unknown month "
          }
        } else {
          rang = rang + jlk + "  -  ";
        }
        sdl++;
      }
      var mon;
      if (this.state.date_range[1] == 1) {
        mon = "January ";
      } else if (this.state.date_range[1] == 2) {
        mon = "February ";
      } else if (this.state.date_range[1] == 3) {
        mon = "March ";
      } else if (this.state.date_range[1] == 4) {
        mon = "April ";
      } else if (this.state.date_range[1] == 5) {
        mon = "May ";
      } else if (this.state.date_range[1] == 6) {
        mon = "June ";
      } else if (this.state.date_range[1] == 7) {
        mon = "July ";
      } else if (this.state.date_range[1] == 8) {
        mon = "August ";
      } else if (this.state.date_range[1] == 9) {
        mon = "September ";
      } else if (this.state.date_range[1] == 10) {
        mon = "October ";
      } else if (this.state.date_range[1] == 11) {
        mon = "November ";
      } else if (this.state.date_range[1] == 12) {
        mon = "December ";
      } else {
        mon = "Unknown month "
      }
      rang = rang + this.state.date_range[0] + ", " + mon + this.state.date_range[2];

      var gen_list;
      for (var g in this.state.genres_list) {
        gen_list = gen_list + JSON.stringify(g) + ", "
      }


      var appleString = "Total Size of Data Dump: " + totalSize + '\n\n' + 
                        "Total Listen Time: " + listen + '\n\n' +
                        "Date Range of All Activity:" + rang + '\n\n' + 
                        "Genres List: " + gen_list + '\n\n' + 
                        "Artists List: " + this.state.artists_list + '\n\n' +
                        "Tracks List: " + this.state.tracks_list + 
                        '\n\n';


      var appleAddString;
      if (appleString.length > 2000) {
        var l = 0;
        var r = appleString.length;
        var m = r/2 - l;
        if (m > 2000) {
          m = 2000;
        }
        do {
          var index = m;
          var apString = appleString.substr(l, m - l);
          while (index > l) {
            if (apString[index] == "," || apString[index] == "\n") {
              index++;
              break;
            } else {
              index--;
            }
          }
          // var pastM = m;
          if (index > l) {
            m = index;
          } else {
            m = m - l;
          }
          apString = appleString.substr(l, m);
          appleAddString = docPdf.splitTextToSize(apString, 150);
          docPdf.text(appleAddString, 30, 40);
          // docPdf.text("l: " + l + ", r: " + r + ", m: " + pastM + ", index: " + index, 30, 10);
          if (l + m < r) {
            docPdf.addPage();
            docPdf.setFontSize(16);
            docPdf.text('Your Data Dump Summary', 70, 20);
            docPdf.text('Apple Summary', 85, 30);
            docPdf.setFontSize(12);
          }
          l += m;
          m = l;
          if (r - m > 2750) {
            m = m + 2750;
          } else if (r - m > 0) {
            m = r;
          } else {
            m = r + 1;
          }
        } while (m <= r);
        
      } else {
        appleAddString = docPdf.splitTextToSize(appleString, 150);
        docPdf.text(appleAddString, 30, 40);
      }


    // }

    // if ("facebook" in this.state.compiledRequest) {

      docPdf.addPage();

      // Facebook:

      // Not used in pdf:
      // this.state.locations_bar
      // this.state.posts_pie
      // this.state.reactions_bar

      // Used in pdf:
      /*
        facebook name
        category
        sites
        sites count
        off facebook app activities
        off facebook app activities count
        facebook advertisers
        facebook advertisers count
      */

      docPdf.setFontSize(16);
      docPdf.text('Your Data Dump Summary', 70, 20);
      docPdf.text('Facebook Summary', 80, 30);
      docPdf.setFontSize(12);


      var sitesCount;
      if (this.state.sites_ct == 0) {
        sitesCount = "0";
      } else {
        sitesCount = JSON.stringify(this.state.sites_ct);
      }
      var activitiesCount;
      if (this.state.off_ct == 0) {
        activitiesCount = "0";
      } else {
        activitiesCount = JSON.stringify(this.state.off_ct);
      }
      var advertisersCount;
      if (this.state.advs_ct == 0) {
        advertisersCount = "0";
      } else {
        advertisersCount = toString(this.state.advs_ct);
      }
      var siteList = " ";
      for (var g in this.state.site_list) {
        siteList = siteList + this.state.site_list[g] + ", ";
      }
      var off_list = " ";
      for (var g in this.state.off) {
        off_list = off_list + g + ", "
      }
      var advList = " ";
      for (var g in this.state.advs) {
        advList = advList + this.state.advs[g] + ", ";
      }

      var facebookString = "Facebook Name: " + this.state.fb_name + '\n\n' + 
                          "Category: " + this.state.category + '\n\n' +
                          "Number of websites logged into with Facebook: " + sitesCount + '\n\n' + 
                          "List of websites logged into with Facebook:" + siteList + '\n\n' + 
                          "Number of off facebook app activities: " + activitiesCount + '\n\n' + 
                          "List of off facebook app activities:" + off_list + '\n\n' +
                          "Number of advertisers who have accessed your data: " + advertisersCount + '\n\n' + 
                          "List of advertisers who have accessed your data:" + advList + 
                          '\n\n';

      var facebookAddString;
      if (facebookString.length > 2250) {
        var l = 0;
        var r = facebookString.length;
        var m = r/2 - l;
        if (m > 2250) {
          m = 2250;
        }
        do {
          var index = m;
          var fbString = facebookString.substr(l, m - l);
          while (index > l) {
            if (fbString[index] == "," || fbString[index] == "\n") {
              index++;
              break;
            } else {
              index--;
            }
          }
          // var pastM = m;
          if (index > l) {
            m = index;
          } else {
            m = m - l;
          }
          fbString = facebookString.substr(l, m);
          facebookAddString = docPdf.splitTextToSize(fbString, 150);
          docPdf.text(facebookAddString, 30, 40);
          // docPdf.text("l: " + l + ", r: " + r + ", m: " + pastM + ", index: " + index, 30, 10);
          if (l + m < r) {
            docPdf.addPage();
            docPdf.setFontSize(16);
            docPdf.text('Your Data Dump Summary', 70, 20);
            docPdf.text('Facebook Summary', 80, 30);
            docPdf.setFontSize(12);
          }
          l += m;
          m = l;
          if (r - m > 2400) {
            m = m + 2400;
          } else if (r - m > 0) {
            m = r;
          } else {
            m = r + 1;
          }
        } while (m <= r);
        
      } else {
        facebookAddString = docPdf.splitTextToSize(facebookString, 150);
        docPdf.text(facebookAddString, 30, 40);
      }


    // }


    // if ("google" in this.state.compiledRequest) {

    //   docPdf.addPage();
      
    //   //Google
      
    //   // Not used in pdf:
    //   // this.state.gg_ads_waffle
    //   // this.state.gg_maps_activity
    //   // this.state.gg_search_waffle
    //   // this.state.gg_youtube_piechart
    //   // this.state.gg_youtube_search_waffle
      
    //   /*
    //   total size
    //   profile info
    //   bookmarks count
    //   saved places on your map
    //   ads count
    //   ads
    //   map routes count
    //   search count
    //   */
    
    // docPdf.setFontSize(16);
    // docPdf.text('Your Data Dump Summary', 70, 20);
    // docPdf.text('Google Summary', 84, 30);
    // docPdf.setFontSize(12);
    
    
    // var totalSizeGG;
    // if (this.state.gg_total_size_GB == 0) {
    //   totalSizeGG = "0";
    //   } else {
    //     totalSizeGG = toString(this.state.gg_total_size_GB);
    //   }
    //   var bookmarksCount;
    //   if (this.state.gg_bookmarks_count == 0) {
    //     bookmarksCount = "0";
    //   } else {
    //     bookmarksCount = toString(this.state.gg_bookmarks_count);
    //   }
    //   var advertisersCountGG;
    //   if (this.state.gg_ads_count == 0) {
    //     advertisersCountGG = "0";
    //   } else {
    //     advertisersCountGG = toString(this.state.gg_ads_count);
    //   }
    //   var routeCount;
    //   if (this.state.gg_maps_routes_count == 0) {
    //     routeCount = "0";
    //   } else {
    //     routeCount = toString(this.state.gg_maps_routes_count);
    //   }
    //   var searchCount;
    //   if (this.state.gg_search_count == 0) {
    //     searchCount = "0";
    //   } else {
    //     searchCount = toString(this.state.gg_search_count);
    //   }
      
    //   var googleString = "Total Size of Data Dump (GB): " + totalsizeGG + '\n\n' + 
    //   "Profile: " + this.state.gg_profile_info_header + '\n\n' +
    //   "Number of bookmarks: " + bookmarksCount + '\n\n' + 
    //   "Saved places on your map: " + this.state.gg_saved_places_map + '\n\n' + 
    //   "Number of advertisers who have your data: " + advertisersCountGG + '\n\n' + 
    //   "List of advertisers who have your data: " + this.state.gg_ads_list + '\n\n' +
    //   "Number of routes input into Google Maps: " + routeCount + '\n\n' + 
    //   "Number of searches you've made on Google: " + searchCount + 
    //   '\n\n';
      
    // var googleAddString;
    // if (googleString.length > 2000) {
    //   var l = 0;
    //   var r = googleString.length;
    //   var m = r/2 - l;
    //   if (m > 2000) {
    //     m = 2000;
    //   }
    //   do {
    //     var index = m;
    //     var ggString = googleString.substr(l, m - l);
    //     while (index > l) {
    //       if (ggString[index] == "," || ggString[index] == "\n") {
    //         index++;
    //         break;
    //       } else {
    //         index--;
    //       }
    //     }
    //     // var pastM = m;
    //     if (index > l) {
    //       m = index;
    //     } else {
    //       m = m - l;
    //     }
    //     ggString = googleString.substr(l, m);
    //     googleAddString = docPdf.splitTextToSize(ggString, 150);
    //     docPdf.text(googleAddString, 30, 40);
    //     // docPdf.text("l: " + l + ", r: " + r + ", m: " + pastM + ", index: " + index, 30, 10);
    //     if (l + m < r) {
    //       docPdf.addPage();
    //       docPdf.setFontSize(16);
    //       docPdf.text('Your Data Dump Summary', 70, 20);
    //       docPdf.text('Google Summary', 84, 30);
    //       docPdf.setFontSize(12);
    //     }
    //     l += m;
    //     m = l;
    //     if (r - m > 2750) {
    //       m = m + 2750;
    //     } else if (r - m > 0) {
    //       m = r;
    //     } else {
    //       m = r + 1;
    //     }
    //   } while (m <= r);
      
    // } else {
    //   googleAddString = docPdf.splitTextToSize(googleString, 150);
    //   docPdf.text(googleAddString, 30, 40);
    // }
      
      
    // }

    docPdf.save('Test.pdf');
      
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

    /*<IPMap data={this.state.fb_locations_bar} />*/

    return (
      <div id="resultspage">
        <Header />
        <div id="exportedvisuals">
          <div id="sidebar">
            <p>Display</p>
            <button class="showvisualsbutton" id="showfacebookvisuals" onClick={(e) => this.toggleSection(e)}>Facebook</button>
            <button class="showvisualsbutton" id="showgooglevisuals" onClick={(e) => this.toggleSection(e)}>Google</button>
            <button class="showvisualsbutton" id="showapplevisuals" onClick={(e) => this.toggleSection(e)}>Apple</button>
            <button class="showvisualsbutton" id="shownetflixvisuals" onClick={(e) => this.toggleSection(e)}>Netflix</button>
          </div>
          <div id="mainvisuals">
            <h1 class="pagetitle">Results</h1>
            <div class="visualssection" id="facebookvisuals">
              <h1 class="visualstitle" id="facebooktitle">Facebook</h1>
              <h1>Name: {this.state.fb_name}</h1>
              <h2>Category: {this.state.fb_category}</h2>

              <IPAddressChart data={this.state.fb_locations_bar} />
              <PostPieChart data={this.state.fb_posts_pie} />
              <ReactionBarChart data={this.state.fb_reactions_bar} />

              <Grid container spacing={5}>

                <Grid item xs={12}>
                  <Grid container justify="center" spacing={5}>

                    <Grid key={1}>
                      <WebsitesList data={this.state.fb_sites} count={this.state.fb_sites_ct} />
                    </Grid>

                    <Grid key={2}>
                      <OffFacebookWebsitesList data={this.state.fb_off} count={this.state.fb_off_ct} />
                    </Grid>

                    <Grid key={3}>
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
                    <Grid key={4}>
                      <TotalSizeBigNum data={this.state.ap_total_size_GB} />
                    </Grid>

                    <Grid key={5}>
                      <LibraryTracksBigNum data={this.state.ap_library_track_count} />
                    </Grid>
                  </Grid>

                  <Grid key={6}>
                    <ListenTimeBigNum data={this.state.ap_listen_time} date_range={this.state.ap_date_range} />
                  
                    <DevicesList data={this.state.ap_devices_list} />

                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container justify="center" spacing={5}>
                    <Grid key={7}>
                      <TopTenGenresList data={this.state.ap_genres_list} date_range={this.state.ap_date_range} />
                    </Grid>
                    <Grid key={8}>
                      <TopTenArtistsList data={this.state.ap_artists_list} date_range={this.state.ap_date_range} />
                    </Grid>
                    <Grid key={9}>
                      <TopTenTracksList data={this.state.ap_tracks_list} date_range={this.state.ap_date_range} />
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>

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
                  <Grid key={10}>
                    <ShowsList data={this.state.nf_shows} />
                  </Grid>
                  <Grid key={11}>
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
                      <Grid key={12}> 
                        <SearchesBigNum data={this.state.gg_search_count} />
                      </Grid>

                      <Grid key={13}>
                        <DirectionsBigNum data={this.state.gg_maps_routes_count} />
                      </Grid>
                    </Grid>
                    
                    <Grid spacing={3}>
                      <Grid key={14}>
                        <AdsBigNum data={this.state.gg_ads_count} />
                      </Grid>

                      <Grid key={15}>
                        <YoutubePlaylistsBigNum />
                      </Grid>
                    </Grid>
                    
                    <Grid spacing={3}>
                      <Grid key={16}>
                        <BookmarksBigNum data={this.state.gg_bookmarks_count} />
                      </Grid>

                      <Grid key={17}>
                        <YoutubeSubscriptionsBigNum />
                      </Grid>
                    </Grid>
                  </Grid>
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
        <button onClick={(e) => this.genPDF(e)}>Export your results to an image!</button>
        {/* <a href="genPDF()">lkfsdkfjsdflflkdkfsdlk</a> */}
      </div>
    )
  }
}