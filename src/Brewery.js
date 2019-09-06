import React from 'react';
import { Button, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'

class Brewery extends React.Component {

  pageButton = (brewery) =>{
    this.clearAllBreweries()
    this.props.grabSelectBrewery(brewery)
    this.props.history.push(`/brewery/${brewery.id}`)
  }

  clearAllBreweries = () =>{
  this.props.clearBreweries()
  this.props.clearFilteredBreweries()
  }


  render() {
// console.log(this.props, "hello from Brewery")
    return (
      <div>
    <h3>{this.props.data.name}</h3>

    <Button color='yellow' content="More Details" onClick={()=>this.pageButton(this.props.data)} />
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
