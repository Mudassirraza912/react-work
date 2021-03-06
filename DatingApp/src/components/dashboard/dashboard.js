
/* eslint-disable no-undef */
/* global google */

import React, { Component } from 'react';
import Cards, { Card } from 'react-swipe-deck'
import firebase from '../config/firebase'
// import img1 from '../images/img1.jpg'; 
// import img3 from '../images/img2.jpg'; 
// import img2 from '../images/img3.jpg'; 

import '../../App.css'
import { Slide } from 'react-slideshow-image';
import swal from 'sweetalert'
import { Button, TextField, Radio } from '@material-ui/core'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"




// const data = [ {image:"img1", name:'Haris Ansari' , nickName:'Haris'}, {image:"img2", name:'Muneeb Ansari' , nickName:'Muneeb'}, {image:"img1", name:'Muhammad Umar' , nickName:'Umar'}]; 
// const slideImages = ["img1","img2","img3"] 

const properties = {
    duration: 1000,
    transitionDuration: 100,
    infinite: true,
    indicators: true,
    arrows: true,

}




class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            setMet: false,
            data: [],
            slideImages: [],
            direction: '',
            beverages: '',
            location: '',
            searchTerm: false,
            searchLocation: false,
            selectLocation: '',
            calender: '',
            selectDate: '',
            alldone: false,
            locationRender: false,
            directions: '',
            recieverUid: ''
        }
        this.actionLeft = this.actionLeft.bind(this)
        this.setMet = this.setMet.bind(this)
        this.actionLeft = this.actionLeft.bind(this)
        this.action = this.action.bind(this)
        this.showlocations = this.showlocations.bind(this)
        this.renderLocations = this.renderLocations.bind(this)
        this.serachLoc = this.serachLoc.bind(this)
        this.renderDirection = this.renderDirection.bind(this)
        this.getDirections = this.getDirections.bind(this)
        this.sendProposal =this.sendProposal.bind(this)

    }

    componentWillMount() {
        const { data, slideImages, direction } = this.state
        firebase.database().ref('/Users/').on('child_added', snap => {
            console.log(snap.val());
            var snAp = snap.val()
            console.log(snAp.beverages);
            var latlng = snAp.direction
            var dish = snAp.beverages
            data.push({ nickName: snAp.nickName, name: firebase.auth().currentUser.displayName });
            slideImages.push(...snAp.url)
            this.setState({
                data,
                slideImages,
                direction: latlng,
                beverages: dish

            })
        })
        // venues/explore?client_id=ZJWQ050MTAJAQVAU2GHBN2WI3EIJJ1ZKNNBWTF1CYLVKKRA0&client_secret=NNAT41FP4ZLRDDE2QPNVMNAS4GFKICS5R0Z2DQ4MKFEW1SVT&v=20180323&ll=24.958101%2C-66.9854055&query=park
        // fetch('https://api.foursquare.com/v2/venues/explore?client_id=ZJWQ050MTAJAQVAU2GHBN2WI3EIJJ1ZKNNBWTF1CYLVKKRA0&client_secret=NNAT41FP4ZLRDDE2QPNVMNAS4GFKICS5R0Z2DQ4MKFEW1SVT&v=20180323&ll=24.958101,66.9854055&query=park&limit=3')
        //   .then(response => response.json())
        //   .then(data => console.log(data.response.groups[0].items));

    }

    showlocations() {
        const { direction, searchTerm } = this.state
        console.log(direction.latitude, direction.loongitude)
        fetch(`https://api.foursquare.com/v2/venues/explore?client_id=ZJWQ050MTAJAQVAU2GHBN2WI3EIJJ1ZKNNBWTF1CYLVKKRA0&client_secret=NNAT41FP4ZLRDDE2QPNVMNAS4GFKICS5R0Z2DQ4MKFEW1SVT&v=20180323&ll=${direction.latitude},${direction.loongitude}&query=hotel&limit=3`)
            .then(response => response.json())
            .then(data => {
                console.log(data.response.groups[0].items),
                    this.setState({
                        location: data.response.groups[0].items
                    })
            }
            );
    }

    serachLoc(e) {
        const { direction } = this.state
        var searchTerm = e.target.value
        fetch(`https://api.foursquare.com/v2/venues/search?client_id=ZJWQ050MTAJAQVAU2GHBN2WI3EIJJ1ZKNNBWTF1CYLVKKRA0&client_secret=NNAT41FP4ZLRDDE2QPNVMNAS4GFKICS5R0Z2DQ4MKFEW1SVT&v=20180323&ll=${direction.latitude},${direction.loongitude}&query=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.response)
                searchTerm !== '' ?
                    (this.setState({
                        searchLocation: data.response.venues
                    })) :
                    (this.setState({
                        searchLocation: null
                    }))
            })
            .catch(err => console.log(err))
    }

    setLocation(location) {
        console.log(location)
        this.setState({
            //    calender:true,
            selectLocation: location,
            locationRender: true,
            location: false,
        })
    }

    renderDirection() {
        const { selectLocation, directions, direction } = this.state
        return (
            <div>
                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    cord={selectLocation.location}
                    destination={direction}
                    new={this.newPosition}
                    directions={directions}
                // defaultDraggable = {true} 
                /><br /><br /><br />

                <Button onClick={this.getDirections}>Get Direction</Button><Button onClick={() => { this.setState({ calender: true, locationRender: false }) }}>Next</Button>

            </div>
        )

    }


    getDirections() {

        const { selectLocation, direction, } = this.state
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            origin: new google.maps.LatLng(direction.latitude, direction.loongitude),
            destination: new google.maps.LatLng(selectLocation.location.lat, selectLocation.location.lng),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                alert("Sorry! Can't calculate directions!")
            }
        });
    }


    renderCalender() {
        return (
            <div>
                <TextField
                    id="datetime-local"
                    label="Next appointment"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    onChange={(e) => {
                        this.setState({
                            selectDate: e.target.value
                        })
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button color='primary' onClick={this.sendProposal}>Send</Button>
            </div>
        )
    }

    sendProposal() {
        const {data, slideImages, beverages, selectDate, selectLocation, recieverUid} = this.state

             var proposalObj ={
                senderData : data,
                senderImages:slideImages,
                beverages:beverages,
                selectDate:selectDate,
                selectLocation:selectLocation,
                senderUid:firebase.auth().currentUser.uid,
                recieverUid:recieverUid
             }

        this.setState({ 
            alldone: true,
            setMet: false,
            calender: false,
            location: false }),
            swal("your request send", 
            {
            icon: "success",
        });
    }

    renderLocations() {
        const { location, searchLocation, } = this.state
        console.log(searchLocation)

        return (
            <div>
                <TextField onChange={this.serachLoc} />
                {searchLocation ?
                    <div>
                        {searchLocation.map((value, index) => {
                            console.log(value)
                            return (<div><Button color='primary' onClick={this.setLocation.bind(this, value)}>{value.name}</Button></div>)
                        })}
                    </div>

                    :
                    (location.map((value, index) => {
                        console.log(value)
                        return (
                            <div>
                                <ul>
                                    <li>
                                        <Button color='primary' onClick={this.setLocation.bind(this, value.venue)}>{value.venue.name}</Button>
                                    </li>
                                </ul>
                            </div>
                        )
                    }))}
            </div>
        )
    }
    action(e) {
        console.log(e)
    }

    actionLeft(e, index) {
        const { data } = this.state
        console.log(e)
        data.splice(index, 1)
        this.setState({
            data,
        })
    }
    actionRight(e, name, uid) {
        console.log(e)
        this.setState({
            setMet: false,
            recieverUid: uid
        })
        swal({
            title: "Are you sure?",
            text: `Do you want to meet ${name}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willMeet) => {
                if (willMeet) {
                    swal("Set your meeting info", {
                        icon: "success",
                    });
                    this.showlocations()
                    this.setState({
                        setMet: true
                    })
                } else {
                    swal("Let's go to check more cards");

                    this.setState({
                        setMet: true
                    })
                }
            });
    }

    setMet() {
        this.setState({
            setMet: true
        })
    }
    render() {
        const { setMet, data, slideImages, location, calender, selectDate, selectLocation, beverages, locationRender, direction } = this.state
        console.log('IMAGE URL', slideImages, 'DATE', selectDate, 'SELECT LOCATIOM', selectLocation, 'BEVEREGES', beverages, 'MY DIRECTION', direction)
        return (

            <div>
                <center>
                    {!calender && !setMet && <div>
                        <h2>You haven’t done any meeting yet! <br /> try creating a new meeting! </h2>
                        <Button color='primary' onClick={this.setMet}> Set a meeting</Button>
                    </div>
                    }

                    {!locationRender && !calender && !location && setMet && <div className='card'>
                        <Cards onEnd={() => this.action('function end')} className='master-root'>
                            {data.map((item, index) =>
                                <Card
                                    onSwipeLeft={() => this.actionLeft('swipe left', index)}
                                    onSwipeRight={() => this.actionRight('swipe right', item.name, item.uid)}>
                                    <div>
                                        <Slide {...properties}>
                                            <div className="each-slide">
                                                <div style={{ 'backgroundImage': `url(${slideImages[0]})`, height: '500px', width: '600px' }}>
                                                    <span>Picture 1</span>
                                                </div>
                                            </div>
                                            <div className="each-slide">
                                                <div style={{ 'backgroundImage': `url(${slideImages[1]})`, height: '500px', width: '600px' }}>
                                                    <span>Picture 2</span>
                                                </div>
                                            </div>
                                            <div className="each-slide">
                                                <div style={{ 'backgroundImage': `url(${slideImages[2]})`, height: '500px', width: '600px' }}>
                                                    <span>Picture 3</span>
                                                </div>
                                            </div>
                                        </Slide>
                                        <div className='list'>
                                            <center><h3>{item.name}</h3></center>
                                            <center><b>{item.nickName}</b></center>
                                            <div className='accRej'>
                                                <Button color='primary' className='acc' onClick={() => this.actionRight('swipe right', item.name)}> <img src='https://www.healthandsafetysigns.co.uk/wp-content/uploads/2017/08/tick.png' width='55px' height='40px' /></Button>
                                                <Button color='primary' className='Rej' onClick={() => this.actionLeft('swipe left', index)}> <img src='http://www.urltarget.com/images/cancel-delete-cross-check-box-check-tick-icon.png' width='55px' height='40px' /></Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )}
                        </Cards>

                    </div>

                    }
                </center>
                {!calender && location && this.renderLocations()}
                {calender && this.renderCalender()}
                {locationRender && this.renderDirection()}
            </div>
        )
    }
}

export default Dashboard;



const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={8}
        center={{ lat: props.cord.lat, lng: props.cord.lng }}
    >
        <Marker position='center' defaultDraggable={false} onDrag={props.new} position={{ lat: props.cord.lat, lng: props.cord.lng }} />
        <Marker position='center' defaultDraggable={false} onDrag={props.new} position={{ lat: props.destination.latitude, lng: props.destination.loongitude }} />

        {props.directions && <DirectionsRenderer directions={props.directions} />}


    </GoogleMap>
))