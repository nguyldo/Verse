import React, { Component } from "react";

import axios from "axios";

export default class Upload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        file: null,
      };
      //this.loadApi = this.loadApi.bind(this);
    }
  
    componentWillMount() {
      //this.loadApi();
    }

    handleFile(e) {

        console.log(e.target.files, "12345");
        console.log(e.target.files[0], "12345");

        this.setState({file: e.target.files[0]})

    }
    
    uploadFacebook(e) {
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

        
        axios({
            url: "http://localhost:8000/upload/",
            method: "POST",
            data: formData
        })

        console.log(file);
        for (let vals of formData.values()) {
            console.log("Test: " + vals);
        }

        /*
        const promise = await axios.get("http://localhost:8000/testapi/");
        const status = promise.status;
        if(status===200)
        {
        const data = promise.data.data;
        this.setState({str:data});
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