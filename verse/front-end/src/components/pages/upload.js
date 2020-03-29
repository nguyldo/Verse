import React, { Component } from "react";

import axios from "axios";
import {Link} from "react-router-dom";
import $ from "jquery";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Header from "./../sections/header.js";

export default class Upload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        file: null,
        num: "",
        sites: [],
        facebookData: {},
        facebookButton: "Choose a file..."
      };
    }

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

        console.log(e.target.files, "12345");
        console.log(e.target.files[0], "12345");

        this.setState({file: e.target.files[0]})

        this.setState({facebookButton: e.target.files[0].name});

    }
    
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
        if (status===200) {
          const data = promise.data.num;
          const websites = promise.data.sites;
          this.setState({num:data, sites:websites});
          this.setState({facebookData: promise.data});
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
        }*/
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

    exportPDF(e) {
        /*
        let pdf = new jsPDF();
        let htmlDiv = $("#visualcontent").html();
        let specialEventHandlers = {
            "#elementH": function(element, handler) {
                return true;
            }
        }
        pdf.fromHTML(htmlDiv, 15, 15, {
            "width": 170,
            "elementHandlers": specialEventHandlers
        })
        pdf.save("visuals.pdf");
        */
       html2canvas(document.getElementById("visualcontent"), {scale: 1}).then(canvas => {
         //document.body.appendChild(canvas);
         //let image = canvas.toDataURL("visuals/jpg");
         let dwnld = document.createElement("a");
         dwnld.download = "visuals";
         dwnld.href = canvas.toDataURL();
         dwnld.click();
         //window.location.href = image;

       });
       
    }

    render() {
      return(
        <div id="uploadpage">
            <Header />
            <h1>Upload file</h1>
            <body>
              <div class="uploadoption">
                <p>Facebook</p>
                <form>
                  <label for="facebookupload" class="customupload">{this.state.facebookButton}</label>
                  <input id="facebookupload" type="file" name="file" onChange={(e)=>this.handleFile(e)} />
                  <button type="button" onClick={(e)=>this.uploadFacebook(e)}>Upload</button>
                </form>
              </div>
              <div class="uploadoption">
                <p>Google</p>
                <form>
                  <label for="googleupload" class="customupload">Choose a file</label>
                  <input id="googleupload" type="file" name="file" onChange={(e)=>this.handleFile(e)} />
                  <button type="button" onClick={(e)=>this.uploadGoogle(e)}>Upload</button>
                </form>
              </div>
              <div class="uploadoption">
                <p>Apple</p>
                <form>
                  <label for="appleupload" class="customupload">Choose a file</label>
                  <input id="appleupload" type="file" name="file" onChange={(e)=>this.handleFile(e)} />
                  <button type="button" onClick={(e)=>this.uploadApple(e)}>Upload</button>
                </form>
              </div>
              <Link to={{
                pathname: "/results",
                state: {
                  facebookData: this.state.facebookData
                }
              }} className="link">Create Visuals</Link>
              {/*
              <button onClick={(e)=>this.exportPDF(e)}>Export to PDF</button>
              <div id="visualcontent">
                <p>{this.state.num}</p>
                <select id="listBox" size="5"></select>
              </div>
              <div id="eventH"></div>
              */}
            </body>
        </div>
      )
    }
  }

/*
    <form method="post" enctype="multipart/form-data">
        {% csrf_token %}
        <input type="file" name="document" id="document" multiple>
        <button type="submit" onclick="checkType()">Upload</button>
        <button type="button" onclick="clearUpload()">Delete Upload</button>
    </form>
*/

/*
<!-- 
    UPLOAD PORTAL PAGE (this is temporary, we can use React later on)
    Learned from this tutorial: https://www.youtube.com/watch?v=Zx09vcYq1oc
    $('#document').replaceWith($('#document').val('').clone(true))
 -->

 
 <!DOCTYPE html>
 <html>
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <!-- Show message on page load -->
        <script>
            $(document).ready(function(){
                $("#exampleModal").modal('show');
            });
        </script>
    </head>
    <body>

        <!-- Button triggers modal (below) -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Button
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <!-- Message Title -->
                <h5 class="modal-title" id="exampleModalLabel">Data Title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <!-- Body message -->
                <div class="modal-body">
                description...
                </div>

                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">I have read and understand that my files will not be shared</button>
                <!--<button type="button" class="btn btn-primary">Save changes</button> -->
                </div>
            </div>
            </div>
        </div>

        <!-- End of Modal -->




        <h1>Upload Page</h1>
        <label for="data-type">Choose a data type:</label>
        <select type="menu" name="data-type" id="data-type">
            <option value="facebook">FaceBook</option>
            <option value="google">Google</option>
            <option value="apple">Apple</option>
        </select>
        <p>
            
        </p>
        <form method="post" enctype="multipart/form-data">
            {% csrf_token %}
            <input type="file" name="document" id="document" multiple>
            <button type="submit" onclick="checkType()">Upload</button>
            <button type="button" onclick="clearUpload()">Delete Upload</button>
        </form>
        {% load static %}
        <a href="{% static 'facebook_tutorial.pdf' %}">Link to facebook tutorial</a>
        <!--
        <a href="https://drive.google.com/file/d/1fQPsknv3G_hxiGKkyOeUYXfTrBU3qYbL/view?usp=sharing">Tutorial to download your Facebook data</a>
        -->
    </body>

    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script language="javascript" type="text/javascript">
        
        // Tutorial here: https://css-tricks.com/snippets/jquery/clear-a-file-input/
        function clearUpload() {
            var input = $("#document");
            input.replaceWith(input.val('').clone(true));
        }
        function checkType() {
            var filename = document.getElementById("document").value;
            var data = document.getElementById("data-type").value;
            if (data.includes("facebook")) {
                if (!filename.includes("facebook")) {
                    alert("You are not uploading facebook data!");
                    clearUpload();
                }
            }
            else if (data.includes("google")) {
                if (!filename.includes("takeout")) {
                    alert("You are not uploading google data!");
                    clearUpload();
                }
            }
            else {
                if (!filename.includes("apple")) {
                    alert("You are not uploading apple data!");
                    clearUpload();
                }
            }
        }
    </script>
    
</html>
*/