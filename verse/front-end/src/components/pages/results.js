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
import ShowsGanttChart from "../visuals/ShowsGanttChart.js";

// import jsPDF from "../visuals/jspdf.min.js";
import jsPDF from 'jspdf';
import { json } from "d3";


export default class Results extends Component {
  
  constructor(props) {
    super(props);
    console.log(props.location.state);
    this.state = props.location.state;

    // DATA SENT FROM UPLOADS CAN BE FOUND AT 'this.state.compiledRequest'

  }

  componentWillMount() {

    // Facebook API Response
    if ("facebook" in this.state.compiledRequest) {
      console.log("cwm: facebook data was loaded");
      this.state.fb_name = this.state.compiledRequest.facebook.name_category_header[0];
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
      this.state.fb_name = "";
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

    // Netflix API Response
    if ("netflix" in this.state.compiledRequest) {
      console.log("cwm: netflix data was loaded");
      this.state.watch_count = this.state.compiledRequest.netflix.totalCount;
      this.state.shows = this.state.compiledRequest.netflix.shows;
      this.state.movies = this.state.compiledRequest.netflix.movies;
      this.state.shows_generalchart = this.state.compiledRequest.netflix.shows_piechart;
      this.state.shows_ganttchart = this.state.compiledRequest.netflix.shows_ganttchart;
    } else {
      console.log("cwm: netflix data was NOT loaded");
      this.state.watch_count = 0;
      this.state.shows = [];
      this.state.movies = [];
      this.state.shows_generalchart = [];
      this.state.shows_ganttchart = [];
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
      var show_list;
      for (var g in this.state.shows) {
        show_list = show_list + JSON.stringify(g) + ", "
      }
      var netflixString = "Watch Count: " + watchCount + '\n\n' + 
                          "Shows: " + show_list + '\n\n' +
                          "Movies: " + this.state.movies + 
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

      this.state.date_range = ([0, 1, 2], [3, 4, 5]);
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
      var site_list;
      for (var g in this.state.sites) {
        site_list = site_list + JSON.stringify(g) + ", "
      }
      var off_list;
      for (var g in this.state.off) {
        off_list = off_list + g + ", "
      }

      var facebookString = "Facebook Name: " + this.state.fb_name + '\n\n' + 
                          "Category: " + this.state.category + '\n\n' +
                          "Number of websites logged into with Facebook: " + sitesCount + '\n\n' + 
                          "List of websites logged into with Facebook: " + site_list + '\n\n' + 
                          "Number of off facebook app activities: " + activitiesCount + '\n\n' + 
                          "List of off facebook app activities: " + off_list + '\n\n' +
                          "Number of advertisers who have accessed your data: " + advertisersCount + '\n\n' + 
                          "List of advertisers who have accessed your data: " + this.state.advs + 
                          '\n\n';

      var facebookAddString;
      if (facebookString.length > 2000) {
        var l = 0;
        var r = facebookString.length;
        var m = r/2 - l;
        if (m > 2000) {
          m = 2000;
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
          if (r - m > 2750) {
            m = m + 2750;
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
              <h1 class="visualstitle" id="appletitle">Apple</h1>
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
              <h1 class="visualstitle" id="netflixtitle">Netflix</h1>
              <WatchedNetflixBigNum data={this.state.watch_count} />
              <Grid item xs={12}>
                <Grid container justify="center" spacing={3}>
                  <Grid key={0}>
                    <ShowsList data={this.state.shows} />
                  </Grid>
                  <Grid key={1}>
                    <MoviesList data={this.state.movies} />
                  </Grid>
                </Grid>
              </Grid>
              <div class="chart">
                <ShowsPieChart data={this.state.shows_generalchart} />
              </div>
              <div class="chart">
                <ShowsBarChart data={this.state.shows_generalchart} />
              </div>
              <ShowsGanttChart data={this.state.shows_ganttchart} />
            </div>
          </div>
        </div>
        <button onClick={(e) => this.genPDF(e)}>Export your results to an image!</button>
        {/* <a href="genPDF()">lkfsdkfjsdflflkdkfsdlk</a> */}
      </div>
    )
  }
}