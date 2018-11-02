import React, { Component } from 'react';
import '../../../App.css';
import * as firebase from 'firebase';
import * as admin from 'firebase-admin'
import serviceAccount from './campus-recruitment-syste-fde0b-firebase-adminsdk-vft7g-2390081c05.json';
import swal from 'sweetalert'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://campus-recruitment-syste-fde0b.firebaseio.com"
});


class AdminLogin extends Component {
    constructor(props){
        super(props)
        // const {back} = this.props
    }

    signinWihGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(result)
            swal({
                title: "SIGN UP!",
                text: "Sign Up Successfull! no you can go Login Form And then Dashboard",
                icon: "success",
              });
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            console.log(error)
            swal({
                title: "SIGN UP!",
                text: "Something Went rong",
                icon: "error",
              });
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }

    render() {
        const {back,emailValue,passValue,adminLogin} = this.props
        return (
            <div>
                <label>Admin Email</label>

                <button onClick={this.signinWihGoogle}>Login with google</button>

                <input placeholder='Admin Email' onChange={emailValue}  /><br/><br/>
                <label>Admin Password</label>
                <input type='Password'  placeholder='Admin Password' onChange={passValue}  /><br/><br/>
                <button onClick={adminLogin}>Login</button>
            
            <div><button onClick={back}>Back</button></div>
            </div>
        )
    }

}
export default AdminLogin;