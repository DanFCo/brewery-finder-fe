import React from 'react';
import Brewery from './Brewery'
import './App.css';


class App extends React.Component {

state={
  breweries: []
}

componentDidMount(){
  fetch("http://localhost:3000/breweries")
  .then(response => response.json())
  .then(data =>{
    this.setState({
      breweries: data
    })

  })
}






  render() {

    return (
      <div>
        {this.state.breweries.map(brewery =>{

        return <Brewery key={brewery.id} data={brewery} />

        })}

      </div>
    );
  }


}//---------end of class------------

export default App;
