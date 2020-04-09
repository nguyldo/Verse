import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Main from "./components/pages/main";
import Upload from "./components/pages/upload";
import Results from "./components/pages/results";
import About from "./components/pages/about";
import Help from './components/pages/help';
import Loading from './components/pages/loading';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Main} />
        <Route path="/upload" exact component={Upload} />
        <Route path="/results" exact component={Results} />
        <Route path="/about" exact component={About} />
        <Route path="/help" exact component={Help} />
        <Route path="/loading" exact component={Loading} />
      </Router>
    )
  }
}

export default App;
