import React, { Component } from 'react';
import firebase from '../config/firebase'
import history from '../config/history'
import '../../App.css'
import swal from 'sweetalert'
import { CardMedia, Button, TextField, CardContent, CardActions, CardActionArea, Card, Typography } from '@material-ui/core'
import AppBar from '../Constants/appBar'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: []
        }
    }

    componentWillMount() {
        const { user } = this.state
        var UserUid = localStorage.getItem('userUid')
        this.setState({ UserUid })
        firebase.database().ref('/' + UserUid + '/').on('child_added', snap => {
            var userDetail = snap.val()
            for(var key in userDetail) {
                user.push(userDetail[key])
                this.setState({
                    user,
                })
            }
            
        })



    }

    render() {
        const { user } = this.state
        console.log(user)
        return (
            <div>
                <AppBar />
                {
                    user.map((value, index) => {
                        console.log(value)
                        return (
                            <div>
                                <center>
                                <Card  style={{width:'40%'}}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"                                          
                                            height="40%"
                                            width='40%'
                                            image={value.url[0]}
                                            title="value.profileName"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                <b>{value.profileName}</b><br/><br/>
                                                <b>Phone No:</b>{value.phoneNo}<br/>
                                                <p> <b>Beverages:</b>{value.beverages.map(val => {
                                                    return (
                                                        <ul>
                                                            <li>{val}</li>
                                                        </ul>
                                                    )
                                                })} </p>
                                         </Typography>

                                        
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        {/* <Button size="small" color="primary">
                                            Share
        </Button>
                                        <Button size="small" color="primary">
                                            Learn More
        </Button> */}
                                    </CardActions>
                                </Card>
                                </center>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Profile;