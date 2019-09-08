import React from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'




class GoogleApi extends React.Component {
render(){
    return (
<div>
<div>
   <Map google={this.props.google} zoom={16}
      style={{
         margin: "0",
         width: "80%", 
         height: "60%"
      }}
      initialCenter={{
         lat: *PLACE THE COORDINATES HERE*,
         lng: *PLACE THE COORDINATES HERE*
       }}
   >
      <Marker onClick={this.onMarkerClick}
       name={'Current location'} />
   </Map>
</div>
</div>
    )
  }
}//--------------end of class------------------
export default GoogleApiWrapper({
apiKey: *PUT YOUR API KEY*})(GoogleApi)
