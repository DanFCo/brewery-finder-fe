import React from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'




class MapContainer extends React.Component {
  render(){
    return (

      <Map google={this.props.google} zoom={16}
        style={{
          left: "10vw",
          width: "80%",
          height: "60%"
        }}
        initialCenter={{
          lat: this.props.latitude,
          lng: this.props.longitude
        }}
        >
        <Marker position={{ lat: this.props.latitude, lng: this.props.longitude}} />
      </Map>

    )
  }
}//--------------end of class------------------
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer)
