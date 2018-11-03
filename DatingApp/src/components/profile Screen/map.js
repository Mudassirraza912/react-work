import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cord: ''

        }
        this.newPosition = this.newPosition.bind(this)
    }
    componentDidMount() {
        this.setposition()
    }


    newPosition(e) {
        console.log(e.latLng.lat(), e.latLng.lng())
        this.props.lat(e.latLng.lat(), e.latLng.lng())
        this.setState({
            cord: { latitude: e.latLng.lat(), longitude: e.latLng.lng() }

        })
    }

    setposition() {
        navigator.geolocation.getCurrentPosition((postion) => {
            console.log(postion)
            
            this.setState({
                cord: postion.coords
            })
            this.props.lat(postion.coords.latitude,postion.coords.longitude)
        })
        
    }



    render() {
        const { cord } = this.state
        return (
            <div>
                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    cord={cord}
                    new={this.newPosition}
                // defaultDraggable = {true} 
                />
            </div>
        )
    }
}

export default Map;

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={8}
        center={{ lat: props.cord.latitude, lng: props.cord.longitude }}
    >
        {props.isMarkerShown && <Marker position='center' defaultDraggable={true} onDrag={props.new} position={{ lat: props.cord.latitude, lng: props.cord.longitude }} />}
    </GoogleMap>
))
