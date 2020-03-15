import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import TestApi from "./components/testapi/index";
import Main from "./components/pages/main";
import Upload from "./components/pages/upload";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Main} />
        <Route path="/upload" exact component={Upload} />
      </Router>
    )
  }
}

export default App;
