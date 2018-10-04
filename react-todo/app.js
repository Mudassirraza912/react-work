import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddWork from './addList'
import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyAC3CwZgzhqtaOjp8vL1e8Sp5svChvViCw",
  authDomain: "infinite-scrolll.firebaseapp.com",
  databaseURL: "https://infinite-scrolll.firebaseio.com",
  projectId: "infinite-scrolll",
  storageBucket: "infinite-scrolll.appspot.com",
  messagingSenderId: "173591444007"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Todo App</h1>
        </header>
        <AddWork/>
      </div>
    );
  }
}

export default App;
