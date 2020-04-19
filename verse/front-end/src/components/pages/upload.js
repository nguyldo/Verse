import React, { Component } from "react";

import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import html2canvas from "html2canvas";
import Header from "./../sections/header.js";

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {

      redirect: null,

      // facebook state
      facebookFiles: null,
      facebookRequest: "",

      googleFiles: null,
      googleRequest: "",

      appleFiles: null,
      appleRequest: "",

      netflixFiles: null,
      netflixRequest: "",

      facebookData: {},
      facebookButton: "Choose a file...",
      facebookTitle: "Facebook",

      googleButton: "Choose a file...",
      googleTitle: "Google",

      appleButton: "Choose a file...",
      appleTitle: "Apple",

      netflixButton: "Choose a file...",
      netflixTitle: "Netflix",

    };
  }

  handleFile(e) {

    console.log(e.target.files);
    const specifiedCompany = e.target.id;
    if (specifiedCompany == "facebookupload") {

      this.setState({ facebookFile: e.target.files[0] });

      if (e.target.files.length > 1) {
        const label = e.target.files.length + " files selected";
        this.setState({ facebookButton: label });
      } else {
        this.setState({ facebookButton: e.target.files[0].name });
      }
    } else if (specifiedCompany == "googleupload") {
      this.setState({ googleFile: e.target.files[0] });
      if (e.target.files.length > 1) {
        const label = e.target.files.length + " files selected";
        this.setState({ googleButton: label });
      } else {
        this.setState({ googleButton: e.target.files[0].name });
      }
    } else if (specifiedCompany == "appleupload") {
      this.setState({ appleFile: e.target.files[0] });
      if (e.target.files.length > 1) {
        const label = e.target.files.length + " files selected";
        this.setState({ appleButton: label });
      } else {
        this.setState({ appleButton: e.target.files[0].name });
      }
    } else if (specifiedCompany == "netflixupload") {
      this.setState({ netflixFile: e.target.files[0] });
      if (e.target.files.length > 1) {
        const label = e.target.files.length + " files selected";
        this.setState({ netflixButton: label });
      } else {
        this.setState({ netflixButton: e.target.files[0].name });
      }
    }

  }

  async globalUpload(e) {

    const specifiedId = e.target.id;
    let company = null;
    let file = null;
    if (specifiedId == "facebookuploadconfirm") {
      file = this.state.facebookFile;
      company = "facebook";
    } else if (specifiedId == "googleuploadconfirm") {
      file = this.state.googleFile;
      company = "google";
    } else if (specifiedId == "appleuploadconfirm") {
      file = this.state.appleFile;
      company = "apple";
    } else if (specifiedId == "netflixuploadconfirm") {
      file = this.state.netflixFile;
      company = "netflix";
    } else {
      console.log("Error in confirming upload");
    }

    if (file == null) {
      alert("Nothing was uploaded, please try again.");
      return;
    }

    if (company == "facebook") {
      document.getElementById("facebookoption").style.display = "none";
      this.setState({ facebookTitle: "Facebook: Loading..." });
    } else if (company == "google") {
      document.getElementById("googleoption").style.display = "none";
      this.setState({ googleTitle: "Google: Loading..." });
    } else if (company == "apple") {
      document.getElementById("appleoption").style.display = "none";
      this.setState({ appleTitle: "Apple: Loading..." });
    } else if (company == "netflix") {
      document.getElementById("netflixoption").style.display = "none";
      this.setState({ netflixTitle: "Netflix: Loading..." });
    } else {
      console.log("internal error");
    }

    let formData = new FormData();
    formData.append("files", file);
    formData.append("filename", file.name);
    formData.append("company", company);

    console.log("Ultimate debug");
    console.log(file);
    console.log(company);

    try {
      const promise = await axios({
        url: "http://localhost:8000/upload/",
        method: "POST",
        data: formData
      });
  
      const status = promise.status;
      if (status === 200) {
  
        if (company == "facebook") {
          this.setState({ facebookRequest: promise.data.fileName });
          document.getElementById("facebookoption").style.display = "none";
          this.setState({ facebookTitle: "Facebook: Upload Success!" });
        } else if (company == "google") {
          this.setState({ googleRequest: promise.data.fileName });
          document.getElementById("googleoption").style.display = "none";
          this.setState({ googleTitle: "Google: Upload Success!" });
        } else if (company == "apple") {
          this.setState({ appleRequest: promise.data.fileName });
          document.getElementById("appleoption").style.display = "none";
          this.setState({ appleTitle: "Apple: Upload Success!" });
        } else if (company == "netflix") {
          this.setState({ netflixRequest: promise.data.fileName });
          document.getElementById("netflixoption").style.display = "none";
          this.setState({ netflixTitle: "Netflix: Upload Success!" });
        } else {
          console.log("internal error");
        }
      }
    } catch {
      console.log(company)
      if (company == "facebook") {
        document.getElementById("facebookoption").style.display = "block";
        this.setState({ facebookTitle: "Facebook: Upload Failed..." });
      } else if (company == "google") {
        document.getElementById("googleoption").style.display = "block";
        this.setState({ googleTitle: "Google: Upload Failed..." });
      } else if (company == "apple") {
        document.getElementById("appleoption").style.display = "block";
        this.setState({ appleTitle: "Apple: Upload Failed..." });
      } else if (company == "netflix") {
        document.getElementById("netflixoption").style.display = "block";
        this.setState({ netflixTitle: "Netflix: Upload Failed..." });
      } else {
        console.log("internal error");
      }
    }

  }

  prepareData(e) {
    let requests = [];
    if (this.state.facebookRequest != "") {
      requests.push(
        axios.get("http://localhost:8000/facebookData/" + this.state.facebookRequest)
      );
    }
    if (this.state.googleRequest != "") {
      
    }
    if (this.state.appleRequest != "") {
      requests.push(
        axios.get("http://localhost:8000/appleGeneralData/" + this.state.appleRequest)
      );
      requests.push(
        axios.get("http://localhost:8000/appleMusicData/" + this.state.appleRequest)
      );
      requests.push(
        axios.get("http://localhost:8000/appleAppsGamesData/" + this.state.appleRequest)
      );
    }
    if (this.state.netflixRequest != "") {
      requests.push(
        axios.get("http://localhost:8000/netflixData/" + this.state.netflixRequest)
      );
    }
    axios.all(requests).then(axios.spread((...responses) => {
      console.log("Requests successful!")
      console.log(responses)
      
      let count = 0;
      let retrievedData = {}
      if (this.state.facebookRequest != "") {
        retrievedData["facebook"] = responses[count].data.data;
        count++;
      }
      if (this.state.googleRequest != "") {
        retrievedData["google"] = responses[count].data.data;
        count++;
      }
      if (this.state.appleRequest != "") {
        retrievedData["applegeneral"] = responses[count].data.data;
        count++;
        retrievedData["applemusic"] = responses[count].data.data;
        count++;
        retrievedData["applegames"] = responses[count].data.data;
        count++;
      }
      if (this.state.netflixRequest != "") {
        retrievedData["netflix"] = responses[count].data.data;
        count++;
      }

      console.log("retrieved data");
      console.log(retrievedData);

      this.setState({redirect: retrievedData});
      
    })).catch(errors => {
      console.log("error...")
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: "/results",
        state: {
          compiledRequest: this.state.redirect
        }
       }} />
    }
    return (
      <div id="uploadpage">
        <Header />
        <h1>Upload file</h1>
        <body>
          <div class="uploadoption">
            <p>{this.state.facebookTitle}</p>
            <form id="facebookoption">
              <label for="facebookupload" class="customupload">{this.state.facebookButton}</label>
              <input multiple id="facebookupload" type="file" name="file" onChange={(e) => this.handleFile(e)} />
              <button type="button" id="facebookuploadconfirm" onClick={(e) => this.globalUpload(e)}>Upload</button>
            </form>
          </div>
          <div class="uploadoption">
            <p>{this.state.googleTitle}</p>
            <form id="googleoption">
              <label for="googleupload" class="customupload">{this.state.googleButton}</label>
              <input multiple id="googleupload" type="file" name="file" onChange={(e) => this.handleFile(e)} />
              <button type="button" id="googleuploadconfirm" onClick={(e) => this.globalUpload(e)}>Upload</button>
            </form>
          </div>
          <div class="uploadoption">
            <p>{this.state.appleTitle}</p>
            <form id="appleoption">
              <label for="appleupload" class="customupload">{this.state.appleButton}</label>
              <input multiple id="appleupload" type="file" name="file" onChange={(e) => this.handleFile(e)} />
              <button type="button" id="appleuploadconfirm" onClick={(e) => this.globalUpload(e)}>Upload</button>
            </form>
          </div>
          <div class="uploadoption">
            <p>{this.state.netflixTitle}</p>
            <form id="netflixoption">
              <label for="netflixupload" class="customupload">{this.state.netflixButton}</label>
              <input multiple id="netflixupload" type="file" name="file" onChange={(e) => this.handleFile(e)} />
              <button type="button" id="netflixuploadconfirm" onClick={(e) => this.globalUpload(e)}>Upload</button>
            </form>
          </div>
          <button id="createvisuals" onClick={(e) => this.prepareData(e)}>Create Visuals</button>
        </body>
      </div>
    )
  }
}

