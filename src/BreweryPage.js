import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapContainer from './GoogleAPI'


class BreweryPage extends Component {

  render() {


    return (
      <div>
        <div className="BreweryMain">
          {this.props.brewery.website.length > 0 ?
        <a href={this.props.brewery.website} target="_blank">
<button className="brewery-link">
  <h1 className="title">{this.props.brewery.name}</h1>
</button>
<br></br>
<br></br>
</a>

:
<h1 className="title">{this.props.brewery.name}</h1>
}
<span>
  Type Of Brewery:
</span>
<p>
{this.props.brewery.brewery_type}
</p>
<span>
  Phone Number:
</span>
<p>
  {this.props.brewery.phone}
</p>

<span>
  Street:
</span>
<p>
  {this.props.brewery.street}
</p>

<span>
  City:
</span>
<p>
   {this.props.brewery.city}
</p>

<span>
  State:

</span>
<p>
{this.props.brewery.state}
</p>

<span>
  Postal Code:

</span>
<p>
  {this.props.brewery.postal_code}
</p>

</div>
<div className="maps">
{this.props.brewery.latitude === null && this.props.brewery.longitude === null ?

        <h3>No Map Available</h3>

        :

        <MapContainer {...this.props.brewery} />

      }
    </div>
      </div>
    );
  }

}//<-----------end of class component-------


function mapStateToProps(state){
  return{
    brewery: state.selectedBrewery
  }
}

function mapDispatchToProps(dispatch){
return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(BreweryPage);
