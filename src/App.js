import React from 'react';
import Brewery from './Brewery'
import { connect } from 'react-redux'
import './App.css';


class App extends React.Component {

  state={
    breweries: [],
    select_state: "default",
    city: "",
    cities: [],
    filteredBreweries: [],
    citySearch: false
  }

  componentDidMount(){

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
      // this.setState({
      //   breweries
      // })
      this.props.grabBreweries(breweries)
      this.grabCitiesFromBreweries()
    })
  }

  grabCitiesFromBreweries = () =>{

    let breweries = this.props.breweries
    let temp = {}
    for(let i = 0; i < breweries.length; i++){
      temp[breweries[i].city] = true
    }
    this.setState({
      cities: Object.keys(temp).sort()
    })
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
    // this.props.grabFilteredBreweries(newArr)

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

    this.setState({
    //   // filteredBreweries: [], <-----this causes all breweries from previous state to load when new state is chosen
      select_state: event.target.value,
      citySearch: false

    })

    this.breweriesByState(this.state.select_state)

    // this.promise().testing().then(console.log(this.state, "dropDownHandler"))
  }
//----------------------------------------------------------------------------
citySearchToggle = () =>{
  this.setState(prevState => ({
    citySearch: !prevState.citySearch
  }))
}

  render() {
    let breweryData = this.state.filteredBreweries.length > 0 ? this.state.filteredBreweries : this.props.breweries
console.log(this.state)
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

{ this.state.citySearch ?

  <div>
      <select onChange={this.changeHandler} name="city">
        <option value="Any">Any</option>
        {this.state.cities.map(city =>{

          return <option key={city} value={city}>{city}</option>

        })}


      </select>
      <button onClick={this.breweriesByCity} >Filter by City</button>
      <br/>




    </div>
      :
      null

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
    filteredBreweries: state.filteredBreweries

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
      }
  }
}






export default connect(mapStateToProps,mapDispatchToProps)(App)
