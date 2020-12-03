import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux'

import Whole from './components/whole';
import Home from './components/home';
import Profile from './components/profile';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import store from './store';



class App extends Component {
  render() {
    return (
      <Whole>
        <div>bat</div>
        <div></div>
      </Whole>
      
     
    );
  }
}

export default App;
