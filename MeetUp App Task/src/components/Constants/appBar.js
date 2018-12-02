import React, { Component } from 'react';
import firebase from '../config/firebase'
import { Avatar, Button, TextField } from '@material-ui/core'
import swal from 'sweetalert'
import history from '../config/history'
import '../../App.css'
import logo from '../assets/appogo.png'
import PersistentDrawerLeft from './menu'
// import { ArrowLeftDimensions } from 'styled-icons/fa-solid/ArrowLeft'
class AppBar extends Component {

    render() {
        return (
            <div className='App'>
                <PersistentDrawerLeft />
                <header className="App-header">
                    <center>
                        <img src={logo} style={{ height: '70', width: '80px', borderRadius: '20px', }} /></center>
                    {firebase.auth().currentUser && <div style={{ backgroundColor: '#ff0025', color: '#fff', }}>
                        <center>
                            {/* <Button onClick={() => { history.push(`/user/${firebase.auth().currentUser.displayName}`) }} style={{ width: '100px' }}>
                                <Avatar className='avatar' style={{ height: '60px', width: '60px', backgroundColor: '#ff0025', color: '#fff', float: 'right' }}
                                    alt={firebase.auth().currentUser.displayName}
                                    src={firebase.auth().currentUser.photoURL}
                                    sizes='50%'
                                /><br />
                                <p style={{ backgroundColor: '#ff0025', color: '#fff' }}><b>{firebase.auth().currentUser.displayName}</b></p></Button><br /> */}

                            {/* <Button  variant="contained" color="secondary" onClick={
                                () => {
                                    history.push('/')
                                    localStorage.clear()
                                    firebase.auth().signOut()
                                }
                            }>
                                <img src="https://img.icons8.com/metro/50/ffffff/exit.png" height='20px' width='30px' />    <b>Log Out</b>
                            </Button> */}
                        </center>
                        <Button variant="contained" color="primary" style={{ float: 'left', height: '20px' }} onClick={
                            () => {
                                history.goBack()
                            }
                        }>
                            <img src="https://img.icons8.com/ios/50/ffffff/left-filled.png" height='25px' width='30px' color='#fff' />
                        </Button>
                    </div>}
                    {/* <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1> */}
                </header>
            </div>
        )
    }
}

export default AppBar
