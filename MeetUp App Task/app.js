import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './components/config/firebase'
import Map from './components/profile Screen/map'
import Setup  from './components/profile Screen/setupprofile'
import { Button, TextField} from '@material-ui/core'




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      user: false,
      cord: ''
    }
    this.login = this.login.bind(this)
  }

  login() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API. 
      var token = result.credential.accessToken;
      // The signed-in user info. 
      var user = result.user;
      console.log(result.user,'props',this.props.history)
      this.setState({
        user: true
      })
    }).catch(function (error) {
      // Handle Errors here. 
      var errorCode = error.code;
      var errorMessage = error.message;
      var errorMessage = error.message;
      console.log(errorMessage)
      // The email of the user's account used. 
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used. 
      var credential = error.credential;
      // ... 
    });
  }

  render() {
    const { user, cord } = this.state
    console.log(cord)

    return (
      <div className='App'>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br />
        {!user && <Button color='primary' onClick={this.login}>Login with Facebook</Button>}
        {user && <Setup/>}

      </div>
    )
  }
}




export default App;
