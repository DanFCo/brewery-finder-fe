import React from 'react';
import Brewery from './Brewery'
import { connect } from 'react-redux'
import BreweryPage from './BreweryPage'
import { Switch, Route } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'
import './App.css';



class App extends React.Component {

  state={
    select_state: "default",
    city: "",
    citySearch: false
  }

  componentDidMount(){


  }

  hideCitySearch = () =>{
    this.setState({
      citySearch: false
    })
  }

  breweriesByState = (state) =>{
    fetch("http://localhost:3000/search",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify({
        state: this.state.select_state
      })
    }).then(response => response.json())
    .then(breweries =>{
      this.props.grabBreweries(breweries)
      this.grabCitiesFromBreweries()
    })
  }

  grabCitiesFromBreweries = () =>{

    let breweries = this.props.breweries
    let temp = {}
    let cities = []
    for(let i = 0; i < breweries.length; i++){
      temp[breweries[i].city] = true
    }
    cities = Object.keys(temp).sort()
    this.props.grabCities(cities)
  }





  breweriesByCity = (city) =>{

    let arrCopy = [...this.props.breweries]
    let newArr = []
    if(city === "Any"){
      newArr = [...this.props.breweries]
    }
    newArr = arrCopy.filter(brewery =>{
      return brewery.city === this.state.city
    })

    this.setState({
      filteredBreweries: newArr
    })
    this.props.grabFilteredBreweries(newArr)
  }


  changeHandler = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  clickHandler = (event) =>{
    this.breweriesByState(this.state.select_state)
    this.props.history.push('/')

    this.setState({
      filteredBreweries: [],
      citySearch: true
    })

  }


  dropDownHandler = (event) =>{
    this.props.clearBreweries()
    this.props.clearFilteredBreweries()


    this.setState({

      select_state: event.target.value,
      citySearch: false
    })
    this.props.history.push('/')



  }
  //----------------------------------------------------------------------------


  render() {
    let breweryData = this.props.filteredBreweries.length > 0 ? this.props.filteredBreweries : this.props.breweries
    return (
<div>
  <div className="search-container">
      <div className="state-search">

      <select onChange={this.dropDownHandler}>
      <option>---Choose State---</option>
      {this.props.us_states.map(state =>{
        return  <option key={state[1]} value={state[0]} >{state[0]}</option>
      })
    }


    </select>

    <Button color="black" onClick={this.clickHandler} content="Search This State" icon='search' />
</div>


    {
      //------------------ternary for city search---------------------------
    }

    { this.state.citySearch ?

      <div className="city-search">
          <select onChange={this.changeHandler} name="city">
              <option value="Any">Any</option>
                  {this.props.cities.map(city =>{
                    return <option key={city} value={city}>{city}</option>

                  })}


          </select>
        <Button color="black" onClick={this.breweriesByCity} content="Search This City" icon="search" />
          <br/>




      </div>
      :
        null

    }
</div>
    {
      //--------------end of ternary for search by city------------------------
    }

<div className="BreweryList">
    {breweryData.map(brewery =>{

      return <Brewery key={brewery.id} data={brewery} history={this.props.history} hideCitySearch={this.hideCitySearch} />
      })
    }


</div>
    <Switch>
    <Route exact path="/brewery/:id" component={(routerProps) => <BreweryPage {...routerProps} /> } />



    </Switch>


    </div>
  );
}


}//---------end of class------------

function mapStateToProps(state){

  return {
    us_states: state.us_states,
    breweries: state.breweries,
    filteredBreweries: state.filteredBreweries,
    cities: state.cities,
    selectedBrewery: state.selectedBrewery

  }

}

function mapDispatchToProps(dispatch){

  return {
    grabBreweries:(breweries)=>{
      dispatch({type:"ADD_BREWERIES", payload: breweries})
    },
    grabFilteredBreweries:(breweries)=>{
      dispatch({type:"ADD_FILTERED_BREWERIES", payload: breweries})
    },
    clearFilteredBreweries:()=>{
      dispatch({type:"CLEAR_FILTERED_BREWERIES"})
    },
    clearBreweries:()=>{
      dispatch({type:"CLEAR_BREWERIES"})
    },
    grabCities:(cities)=>{
      dispatch({type:"GRAB_CITIES", payload: cities})
    }
  }
}






export default connect(mapStateToProps,mapDispatchToProps)(App)
