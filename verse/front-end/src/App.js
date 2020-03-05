import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import TestApi from "./components/testapi/index";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={TestApi} />
      </Router>
    )
  }
}

export default App;
