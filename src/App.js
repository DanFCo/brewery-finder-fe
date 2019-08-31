import React from 'react';
import Brewery from './Brewery'
import { connect } from 'react-redux'
import './App.css';


class App extends React.Component {

  state={
    select_state: "default",
    city: "",
    citySearch: false
  }

  componentDidMount(){
    // console.log(this.props.breweries)
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

    this.setState({
      filteredBreweries: [],
      citySearch: true
    })

  }
  //--^^^right now this is working----------------------VVV Try to get this working

  dropDownHandler = (event) =>{
    // this.props.clearBreweries()
    this.props.clearFilteredBreweries()

    this.setState({
      //   // filteredBreweries: [], <-----this causes all breweries from previous state to load when new state is chosen
      select_state: event.target.value,
      citySearch: false
    })

    this.breweriesByState(this.state.select_state)

    // this.promise().testing().then(console.log(this.state, "dropDownHandler"))
  }
  //----------------------------------------------------------------------------


  render() {
    let breweryData = this.props.filteredBreweries.length > 0 ? this.props.filteredBreweries : this.props.breweries

    return (

      <div>

        <select onChange={this.dropDownHandler}>
          <option>---Choose State---</option>
          {this.props.us_states.map(state =>{
            return  <option key={state[1]} value={state[0]} >{state[0]}</option>
          })
        }


      </select>

      <button onClick={this.clickHandler} >Submit</button>
      {
        //------------------ternary for city search---------------------------
      }

      { this.state.citySearch ?

        <div>
          <select onChange={this.changeHandler} name="city">
            <option value="Any">Any</option>
            {this.props.cities.map(city =>{

              return <option key={city} value={city}>{city}</option>

            })}


          </select>
          <button onClick={this.breweriesByCity} >Filter by City</button>
          <br/>




        </div>
        :
        null

      }

      {
        //--------------end of ternary for search by city------------------------
      }

      {breweryData.map(brewery =>{

        return <Brewery key={brewery.id} data={brewery} />
      })}

    </div>
  );
}


}//---------end of class------------

function mapStateToProps(state){

  return {
    us_states: state.us_states,
    breweries: state.breweries,
    filteredBreweries: state.filteredBreweries,
    cities: state.cities

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
