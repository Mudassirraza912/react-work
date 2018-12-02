import React, { Component } from 'react';
import firebase from '../config/firebase'
import history from '../config/history'
import '../../App.css'
import swal from 'sweetalert'
import { CardMedia, Button, TextField, CardContent, CardActions, CardActionArea, Card, Typography, Input, Checkbox } from '@material-ui/core'
import AppBar from '../Constants/appBar'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: [],
            profileName: '',
            phoneNo: '',
            nickName: '',
            url: [],
            edit: false,
            userUid: '',
            key: '',
            beverages: [],
            duration: []
        }

        this.prName = this.prName.bind(this)
        this.phNo = this.phNo.bind(this)
        this.nckName = this.nckName.bind(this)
        this.update = this.update.bind(this)
        this.beverag = this.beverag.bind(this)
        this.durat = this.durat.bind(this)

    }

    componentWillMount() {
        const { user, profileName, phoneNo, nickName, url, userUid, beverages, duration } = this.state
        var UserUid = localStorage.getItem('userUid')
        this.setState({ userUid: UserUid })
        firebase.database().ref('/' + UserUid + '/myData/').on('child_added', snap => {
            var userDetail = snap.val()
            var name = userDetail.profileName
            var phone = userDetail.phoneNo
            var nick = userDetail.nickName
            var prUrl = userDetail.url
            var key = snap.key
            var bever = userDetail.beverages
            var dura = userDetail.duration
            beverages.push(...bever)
            duration.push(...dura)
            console.log(userDetail, name, phone, nick)
            this.setState({
                profileName: name,
                phoneNo: phone,
                nickName: nick,
                url: prUrl,
                key: key
            })
            // for(var key in userDetail) {
            //     user.push(userDetail[key])
            //     this.setState({
            //         user,
            //     })
            // }

        })



    }

    prName(e) {
        this.setState({
            profileName: e.target.value
        })
    }

    nckName(e) {
        this.setState({
            nickName: e.target.value
        })
    }

    phNo(e) {
        this.setState({
            phoneNo: e.target.value
        })
    }

    update() {
        const { userUid, phoneNo, profileName, nickName, key, beverages, duration } = this.state
        firebase.database().ref('/' + userUid + '/myData/' + key + '/').update({
            nickName: nickName,
            phoneNo: phoneNo,
            profileName: nickName,
            beverages : beverages,
            duration : duration
        })

        this.setState({
            edit: false
        })
    }


    beverag(e) {
        const { beverages } = this.state
        var item = e.target.value
        var itemArr = [item]
        // beverages.push(item)
        this.setState({
            beverages: itemArr
        })
    }

    durat(e) {
        const { duration } = this.state
        var item = e.target.value
        var itemArr = [item]
        // duration.push(item)
        this.setState({
            duration: itemArr
        })
    }

    render() {
        const { user, profileName, phoneNo, nickName, url, edit, beverages, duration } = this.state
        console.log(user)
        return (
            <div>
                <AppBar />
                <div>
                    <center>
                        <Card style={{ width: '60%' }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="40%"
                                    width='40%'
                                    image={url[0]}
                                    title="value.profileName"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {!edit ?
                                            <div>
                                                <Button onClick={() => { this.setState({ edit: true }) }}>Edit</Button><br /><br />
                                                <b>{profileName}</b><br /><br />
                                                <b>Phone No:</b>{phoneNo}<br /><br />
                                                <b>Nick Name:</b>{nickName}<br /><br />
                                                <p><b>Beverages:</b>{beverages.map(val => {
                                                    return (
                                                        <ul>
                                                            <li>{val}</li>
                                                        </ul>
                                                    )
                                                })} </p><br />

                                                <p><b>Duration:</b>{duration.map(val => {
                                                    return (
                                                        <ul>
                                                            <li>{val}</li>
                                                        </ul>
                                                    )
                                                })} </p>
                                            </div>

                                            :
                                            <div>
                                                <TextField
                                                    id="outlined-name"
                                                    label="Profile Name"
                                                    value={profileName}
                                                    onChange={this.prName}
                                                    margin="normal"
                                                    variant="outlined"
                                                /><br /><br />
                                                <TextField
                                                    id="outlined-name"
                                                    label="Phone No"
                                                    value={phoneNo}
                                                    onChange={this.phNo}
                                                    margin="normal"
                                                    variant="outlined"
                                                /><br /><br />
                                                <TextField
                                                    id="outlined-name"
                                                    label="Nick Name"
                                                    value={nickName}
                                                    onChange={this.nckName}
                                                    margin="normal"
                                                    variant="outlined"
                                                /><br /><br />
                                                <h2>Select Beverages</h2>
                                                <Checkbox color='primary' value='coffee' onChange={this.beverag} type="checkbox" />Coffee <br />
                                                <Checkbox color='primary' value='Juice' onChange={this.beverag} type="checkbox" />Juice <br />
                                                <Checkbox color='primary' value='Cocktail' onChange={this.beverag} type="checkbox" />Cocktail <br />

                                                <h2>Select Duration</h2>
                                                <Checkbox color='primary' value='20 Min' onChange={this.durat} type="checkbox" />20 Min <br />
                                                <Checkbox color='primary' value='60 Min' onChange={this.durat} type="checkbox" />60 Min <br />
                                                <Checkbox color='primary' value='120 Min' onChange={this.durat} type="checkbox" />120 Min <br />

                                            {beverages.length >= 1 && duration.length >= 1    && <Button onClick={this.update}>Done</Button> }
                                            </div>

                                        }



                                        {/* <p><b>Beverages:</b>{value.beverages.map(val => {
                                                return (
                                                    <ul>
                                                         <li>{val}</li>
                                                    </ul>
                                                    )
                                                })} </p> */}
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
            </div>
        )
    }
}

export default Profile;
