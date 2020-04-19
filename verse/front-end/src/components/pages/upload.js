import React, { Component } from "react";
import ReactDOM from "react-dom";
// import React from "react";
// import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
// import ModalBody from "react-bootstrap/ModalBody";
// import ModalHeader from "react-bootstrap/ModalHeader";
// import ModalFooter from "react-bootstrap/ModalFooter";
// import ModalTitle from "react-bootstrap/ModalTitle";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import axios from "axios";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import Header from "./../sections/header.js";
import { lightBlue } from "@material-ui/core/colors";
import "./../../css/upload.css";

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      // name: '',
      // team : '',
      // country: '',
      
      // facebook state
      facebookFiles: null,
      facebookRequest: "",
      
      googleFiles: null,
      googleRequest: "",
      
      appleFiles: null,
      appleRequest: "",
      
      facebookData: {},
      facebookButton: "Choose a file...",
      facebookTitle: "Facebook",
      
      googleButton: "Choose a file...",
      googleTitle: "Google",
      
      appleButton: "Choose a file...",
      appleTitle: "Apple",
      
      // google state
      
      
      // apple state
      
    };

    this.toggle = this.toggle.bind(this);
    // this.handleChangeName = this.handleChangeName.bind(this);
    // this.handleChangeTeam = this.handleChangeTeam.bind(this);
    // this.handleChangeCountry = this.handleChangeCountry.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  // const [isOpen, setIsOpen] = React.useState(false);
  
  // const showModal = () => {
  //   setIsOpen(true);
  // };
  
  // const hideModal = () => {
  //   setIsOpen(false);
  // };
  
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  // handleChangeName(event) {
  //   this.setState({name: event.target.value});
  // }
  // handleChangeTeam(event) {
  //   this.setState({team: event.target.value});
  // }
  // handleChangeCountry(event) {
  //   this.setState({country: event.target.value});
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  //    }
  
  
  // shuffles and array, taken from 
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    
    while (0 !== currentIndex) {
      
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleFile(e) {

    console.log(e.target.files);
    const specifiedCompany = e.target.id;
    if (specifiedCompany == "facebookupload") {

      this.setState({ facebookFile: e.target.files[0] });
      /*
      let filesList = [];
      for (let i = 0; i < e.target.files.length; i++) {
        filesList.push(e.target.files[i]);
      }

      console.log("Debug");
      console.log(filesList);

      this.setState({ facebookFile: filesList });*/

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
        } else {
          console.log("internal error");
        }
      }
    } catch {
      console.log(company)
      if (company == "facebook") {
        document.getElementById("appleoption").style.display = "block";
        this.setState({ facebookTitle: "Facebook: Upload Failed..." });
      } else if (company == "google") {
        document.getElementById("appleoption").style.display = "block";
        this.setState({ googleTitle: "Google: Upload Failed..." });
      } else if (company == "apple") {
        document.getElementById("appleoption").style.display = "block";
        this.setState({ appleTitle: "Apple: Upload Failed..." });
      } else {
        console.log("internal error");
      }
    }
    

  }

  /*
  async uploadFacebook(e) {
    let file = this.state.file

    let formData = new FormData();
    formData.append("file", file);
    if (file == null) {
      alert("nothing uploaded")
      return
    } else if (!file.name.includes("facebook")) {
      alert("no facebook data entered")
      return
    }
    formData.append("filename", file.name)


    const promise = await axios({
      url: "http://localhost:8000/upload/",
      method: "POST",
      data: formData
    })

    const status = promise.status;
    if (status === 200) {
      const data = promise.data.num;
      const websites = promise.data.sites;
      this.setState({ num: data, sites: websites });

      // add facebook json to state
      this.setState({ facebookData: promise.data });

      // update ui based on uploads
      this.setState({ facebookButton: "Uploaded successfully!" });

      document.getElementById("facebookoption").style.display = "none";
      this.setState({ facebookTitle: "Facebook: Upload Success!" });
    } else {
      console.log("Upload failed");
      this.setState({ facebookTitle: "Facebook: Upload Failed..." });
    }


    console.log(file);
    for (let vals of formData.values()) {
      console.log("Test: " + vals);
    }

    this.shuffle(this.state.sites);
    /*
    var sel = document.getElementById('listBox');
    for (var i = 0; i < this.state.sites.length; i++) {
      var opt = document.createElement('option');
      opt.innerHTML = this.state.sites[i];
      opt.value = this.state.sites[i];
      sel.appendChild(opt);
    }
  }

  uploadGoogle(e) {
    let file = this.state.file

    let formData = new FormData();
    formData.append("file", file);
    if (file == null) {
      alert("nothing uploaded")
      return
    } else if (!file.name.includes("takeout")) {
      alert("no google data entered")
      return
    }
    alert(file.name)
    formData.append("filename", file.name)


    axios({
      url: "http://localhost:8000/upload/",
      method: "POST",
      data: formData
    })

    console.log(file);
    for (let vals of formData.values()) {
      console.log("Test: " + vals);
    }
  }

  uploadApple(e) {
    let file = this.state.file

    let formData = new FormData();
    formData.append("file", file);
    if (file == null) {
      alert("nothing uploaded")
      return
    } else if (!file.name.includes("takeout")) {
      alert("no apple data entered")
      return
    }
    formData.append("filename", file.name)

    
    axios({
      url: "http://localhost:8000/upload/",
      method: "POST",
      data: formData
    })
    
    console.log(file);
    for (let vals of formData.values()) {
      console.log("Test: " + vals);
    }
  }
  */
 
 render() {
  
   return (
     <div id="uploadpage">
      <Header />
        <div>
          <Modal id="modal" isOpen={this.state.modal} size="xl">
            <ModalHeader>About Your Data Dump</ModalHeader>
            <ModalBody id="modalBody">
              <div>
                  <h1>So what happens when you submit your data?</h1>

                  <p id="paragraphU" >
                      Once you submit your data, we will be looking through your data with our parser and put together 
                      a big summary of what data companies have on you. It may take a while for our parser to get 
                      through all of your data, but once it is done, it will show a success and you can proceed to 
                      the visual results.
                  </p>

                  <h1>So will our data dump information will be shared?</h1>

                  <p id="paragraphU" >
                      Absolutely not. We want to show how much data other companies have accumulated, not contribute to it. 
                      So, once we finish making the summary for your files, we will delete the contents as well as the data 
                      gained from said files and the parsed data once you leave the results screen. Just take care not 
                      to close the website before downloading your new consolidated data, as you won't be able to 
                      access it afterwards without submitting the files again.
                  </p>

                  <h1>What happens when Verse parses our data?</h1>

                  <p id="paragraphU" >
                      Your raw data is uploaded onto the server, where our parser will look through each file line by line. 
                      The data that we gain from it will go into our analyzer, which will count up and pick out some vital 
                      information that can be gleaned from your data dump. After the analyzer is done going through your 
                      data, the consolidated information will go straight to your results page, and 
                      all of the data that you submitted will be deleted. <b>Your data will not be shared with any outside parties.</b>
                  </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button id="button" onClick={this.toggle}>I Have Read This Message</Button>
            </ModalFooter>
          </Modal>
        </div>
        <h1 id="title" >Upload Your Files Here</h1>
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
          <Link to={{
            pathname: "/results",
            state: {
              facebookRequest: this.state.facebookRequest,
              googleRequest: this.state.googleRequest,
              appleRequest: this.state.appleRequest
            }
          }} className="link" id="toResults">Create Visuals</Link>
        </body>
      </div>
    )
  }
}
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Upload />, rootElement);


