import React from 'react';
import { Button, Divider, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

class Brewery extends React.Component {

  pageButton = (brewery) =>{
    this.clearAllBreweries()
    this.props.grabSelectBrewery(brewery)
    this.props.hideCitySearch()
    this.props.history.push(`/brewery/${brewery.id}`)
  }

  clearAllBreweries = () =>{
  this.props.clearBreweries()
  this.props.clearFilteredBreweries()
  }

noSiteAlert = () =>{
  alert("Website Unavailable")
}


  render() {
    return (
      <div className="single-brewery">
    <h3 className="list">{this.props.data.name}</h3>

    <Button color='yellow' content="More Details" onClick={()=>this.pageButton(this.props.data)} icon='beer'/>
{this.props.data.website.length > 0?
  <a href={this.props.data.website} target="_blank">
      <Button color='blue' content='Website'icon='globe'/>
    </a>
    :
    <Button onClick={this.noSiteAlert} color="grey" content="Website" icon='dont' />
  }
<Divider/>


      </div>
    );
  }

} //<--------end of class-------------------

function mapStateToProps(state){
  return{}
}

function mapDispatchToProps(dispatch){

  return{
    grabSelectBrewery:(brewery)=>{
      dispatch({type:"ADD_SELECT_BREWERY", payload: brewery})
    },
    clearBreweries:()=>{
      dispatch({type:"CLEAR_BREWERIES"})
    },
    clearFilteredBreweries:()=>{
      dispatch({type:"CLEAR_FILTERED_BREWERIES"})
    }
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(Brewery) ;
