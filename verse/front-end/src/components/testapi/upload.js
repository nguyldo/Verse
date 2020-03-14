import React, { Component } from "react";

import axios from "axios";
import $ from "jquery";
import jsPDF from "jspdf";

export default class Upload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        file: null,
        num: "",
        sites: [],
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
        }

        console.log(file);
        for (let vals of formData.values()) {
            console.log("Test: " + vals);
        }

        this.shuffle(this.state.sites);

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

    exportPDF(e) {
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
    }  

    render() {
      return(
        <div>
            <h1>Upload file</h1>
            <body>
              <p>Facebook</p>
              <form>
                <input type="file" name="file" onChange={(e)=>this.handleFile(e)} />
                <button type="button" onClick={(e)=>this.uploadFacebook(e)}>Upload</button>
              </form>
              <p>Google</p>
              <form>
                <input type="file" name="file" onChange={(e)=>this.handleFile(e)} />
                <button type="button" onClick={(e)=>this.uploadGoogle(e)}>Upload</button>
              </form>
              <p>Apple</p>
              <form>
                <input type="file" name="file" onChange={(e)=>this.handleFile(e)} />
                <button type="button" onClick={(e)=>this.uploadApple(e)}>Upload</button>
              </form>
              <button onClick={(e)=>this.exportPDF(e)}>Export to PDF</button>
              <div id="visualcontent">
                <p>{this.state.num}</p>
                <select id="listBox" size="5"></select>
                <p>Hello</p>
              </div>
              <div id="eventH"></div>
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