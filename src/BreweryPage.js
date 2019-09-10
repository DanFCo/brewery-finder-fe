import React, { Component } from 'react';
import { connect } from 'react-redux';


class BreweryPage extends Component {

  render() {

    return (
      <div>
        <div className="BreweryMain">
<h1>{this.props.brewery.name}</h1>
<h5>
  Type Of Brewery:
</h5>
<p>
{this.props.brewery.brewery_type}
</p>
<h5>
  Phone Number:
</h5>
<p>
  {this.props.brewery.phone}
</p>

<h5>
  Street:
</h5>
<p>
  {this.props.brewery.street}
</p>

<h5>
  City:
</h5>
<p>
   {this.props.brewery.city}
</p>

<h5>
  State:

</h5>
<p>
{this.props.brewery.state}
</p>

<h5>
  Postal Code:

</h5>
<p>
  {this.props.brewery.postal_code}
</p>

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
