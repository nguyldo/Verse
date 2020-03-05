import React, { Component } from "react";

import axios from "axios";

export default class TestApi extends Component {
    constructor(props) {
      super(props);
      this.state = {
        str: "",
      };
      this.loadApi = this.loadApi.bind(this);
    }
  
    componentWillMount() {
      this.loadApi();
    }
  
    async loadApi()
    {
      const promise = await axios.get("http://localhost:8000/testapi/");
      const status = promise.status;
      if(status===200)
      {
        const data = promise.data.data;
        this.setState({str:data});
      }
    }
  
    render() {
      return(
        <div>
          <h1>Test API</h1>
          <p>{this.state.str}</p>
        </div>
      )
    }
  }