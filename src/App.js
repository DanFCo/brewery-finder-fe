import React from 'react';
import Brewery from './Brewery'
import './App.css';


class App extends React.Component {

  state={
    breweries: [],
    state: "",
    city: "",
    us_states: [],
    cities: [],
    filteredBreweries: []
  }

  componentDidMount(){
    fetch("http://localhost:3000/us-states")
    .then(response => response.json())
    .then(data =>{
      this.setState({
        us_states: data
      })
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
        state: this.state.state
      })
    }).then(response => response.json())
    .then(breweries =>{
      this.setState({
        breweries
      })
      this.grabCitiesFromBreweries()
    })
  }

  grabCitiesFromBreweries = () =>{

    let breweries = this.state.breweries
    let temp = {}
    for(let i = 0; i < breweries.length; i++){
      temp[breweries[i].city] = true
    }
    this.setState({
      cities: Object.keys(temp).sort()
    })
  }





  breweriesByCity = (city) =>{

    let arrCopy = [...this.state.breweries]
    let newArr = []
    if(city === "Any"){
      newArr = [...this.state.breweries]
    }
    newArr = arrCopy.filter(brewery =>{

      return brewery.city === this.state.city

    })

    this.setState({
      filteredBreweries: newArr
    })


  }


  changeHandler = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  clickHandler = (event) =>{
    this.breweriesByState(this.state.state)
    this.setState({
      filteredBreweries: []
    })

  }

  dropDownHandler = (event) =>{
    this.setState({
      state: event.target.value
    })
  }



  render() {
    let breweryData = this.state.filteredBreweries.length > 0 ? this.state.filteredBreweries : this.state.breweries
    console.log(breweryData, this.state.filteredBreweries, this.state.breweries)
    return (

      <div>

        <select onChange={this.dropDownHandler}>
          <option>---Choose State---</option>
          {this.state.us_states.map(state =>{

            return  <option key={state[1]} value={state[0]} >{state[0]}</option>

          })
        }


      </select>

      <button onClick={this.clickHandler} >Submit</button>



      <select onChange={this.changeHandler} name="city" >
        <option value="Any">Any</option>
        {this.state.cities.map(city =>{

          return <option key={city} value={city}>{city}</option>

        })}


      </select>
      <button onClick={this.breweriesByCity} >Filter by City</button>
      <br/>


      <input onChange={this.changeHandler} name="state" />

      {breweryData.map(brewery =>{

        return <Brewery key={brewery.id} data={brewery} />

      })}



    </div>
  );
}


}//---------end of class------------

export default App;
