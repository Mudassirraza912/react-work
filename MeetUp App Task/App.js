import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './components/config/firebase'
import Map from './components/profile Screen/map'
import Setup from './components/profile Screen/setupprofile'
import { Avatar, Button, TextField } from '@material-ui/core'
import swal from 'sweetalert'
import store from './Redux/store'
import { Provider } from 'react-redux'



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
      console.log(result.user, 'props', this.props.history)
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
      swal({
        title: "Error",
        text: errorMessage,
        icon: "error",
        buttons: true,
        dangerMode: true,
      })
      // ... 
    });
  }

  render() {
    const { user, cord } = this.state
    console.log(cord)

    return (
      <div className='App'> 
        <header className="App-header">
        {user && <div style = {{backgroundColor: '#3B5998', color: '#fff'}}>
          <center>
            <Avatar className='avatar' style = {{height:'70px', width:'70px', backgroundColor: '#3B5998', color: '#fff'}}
              alt={firebase.auth().currentUser.displayName}
              src={firebase.auth().currentUser.photoURL}
              sizes='50%'
            />
            <p><b>{firebase.auth().currentUser.displayName}</b></p>
          </center>
        </div>}
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br />

        {!user && <Button style = {{ backgroundColor:'#3B5998',color:'#fff'}} color='primary' onClick={this.login}>Login with Facebook</Button>}

        {user &&
          <Provider store={store}>
          <Setup />
          </Provider>
          }
        {user && <div>


        </div>}

      </div>
    )
  }
}




export default App;