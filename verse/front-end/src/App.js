import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import TestApi from "./components/testapi/index";
import Upload from "./components/testapi/upload";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={TestApi} />
        <Route path="/upload" exact component={Upload} />
      </Router>
    )
  }
}

export default App;
