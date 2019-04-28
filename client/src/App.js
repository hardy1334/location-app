import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Components for Navbar, Create Hostel and Display
import Navbar from './components/Navbar';
import Hostel from './components/Hostel';
import Available from './components/Available';

import './App.css';

class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Hostel} />
          <Route exact path="/hostels" component={Available} />
        </div>
      </Router>
    );
  }
}

export default App;
