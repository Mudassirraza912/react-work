import React, { Component } from 'react';
import Cards, { Card } from 'react-swipe-deck'
import firebase from '../config/firebase'
// import img1 from '../images/img1.jpg'; 
// import img3 from '../images/img2.jpg'; 
// import img2 from '../images/img3.jpg'; 

// import './app.css' 
import { Slide } from 'react-slideshow-image';
import swal from 'sweetalert'
import { Button, TextField,Radio } from '@material-ui/core'




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
            calender:'',
            selectDate:'',
            alldone:false
        }
        this.actionLeft = this.actionLeft.bind(this)
        this.setMet = this.setMet.bind(this)
        this.actionLeft = this.actionLeft.bind(this)
        this.action = this.action.bind(this)
        this.showlocations = this.showlocations.bind(this)
        this.renderLocations = this.renderLocations.bind(this)
        this.serachLoc = this.serachLoc.bind(this)
        // this.setLocation = this.setLocation.bind(this)

    }

    componentWillMount() {
        const { data, slideImages, direction } = this.state
        firebase.database().ref('Users/' + firebase.auth().currentUser.uid + '/').on('child_added', snap => {
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
           calender:true,
           selectLocation:location
        })
    }

    renderCalender(){
        return(
            <div>
                <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        onChange={(e) => {this.setState({
            selectDate:e.target.value
        })
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button color='primary' onClick={() => {this.setState({alldone:true, setMet:false,calender:false,location:false}), swal("your request send", {
                        icon: "success",
                    });}}>Send</Button>
            </div>
        )
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
    actionRight(e, name) {
        console.log(e)
        this.setState({
            setMet: false
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
        const { setMet, data, slideImages, location,calender,selectDate,selectLocation,beverages} = this.state
        console.log(slideImages, selectDate,selectLocation,beverages)
        return (

            <div>
                <center>
                    {!calender && !setMet && <div>
                        <h2>You haven’t done any meeting yet! <br /> try creating a new meeting! </h2>
                        <Button color='primary' onClick={this.setMet}> Set a meeting</Button>
                    </div>
                    }

                    { !calender && !location && setMet && <div className='card'>
                        <Cards onEnd={() => this.action('function end')} className='master-root'>
                            {data.map((item, index) =>
                                <Card
                                    onSwipeLeft={() => this.actionLeft('swipe left', index)}
                                    onSwipeRight={() => this.actionRight('swipe right', item.name)}>
                                    <div>
                                        <Slide {...properties}>
                                            <div className="each-slide">
                                                <div style={{ 'backgroundImage': `url(${slideImages[0]})`, height: '100px' }}>
                                                    <span>Slide 1</span>
                                                </div>
                                            </div>
                                            <div className="each-slide">
                                                <div style={{ 'backgroundImage': `url(${slideImages[1]})`, height: '100px' }}>
                                                    <span>Slide 2</span>
                                                </div>
                                            </div>
                                            <div className="each-slide">
                                                <div style={{ 'backgroundImage': `url(${slideImages[2]})`, height: '100px' }}>
                                                    <span>Slide 3</span>
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
                { !calender && location && this.renderLocations()}
                {calender && this.renderCalender()}
            </div>
        )
    }
}

export default Dashboard;