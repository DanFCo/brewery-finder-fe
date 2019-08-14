import React from 'react';
import Brewery from './Brewery'
import './App.css';


class App extends React.Component {

  state={
    breweries: [],
    state: "",
    us_states: []
  }

  componentDidMount(){
    // fetch("http://localhost:3000/breweries")
    // .then(response => response.json())
    // .then(data =>{
    //   this.setState({
    //     breweries: data
    //   })
    //
    // })
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
})

}

breweriesByCity = (arr) =>{
  
}


  changeHandler = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  clickHandler = (event) =>{
    event.preventDefault()
    this.breweriesByState(this.state.state)

  }

dropDownHandler = (event) =>{
  this.setState({
    state: event.target.value
  })
}



  render() {
    return (
      <div>
<select onChange={this.dropDownHandler}>
  {this.state.us_states.map(state =>{

      return  <option value={state[0]} >{state[1]}</option>

   })
  }


</select>
        <input onChange={this.changeHandler} name="state" />
        <button onClick={this.clickHandler} >Submit</button>
        {this.state.breweries.map(brewery =>{

          return <Brewery key={brewery.id} data={brewery} />

        })}

      </div>
    );
  }


}//---------end of class------------

export default App;
