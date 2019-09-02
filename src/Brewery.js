import React from 'react';
import { Link } from 'react-router-dom'

class Brewery extends React.Component {

  render() {
    return (
      <div>
    {this.props.data.name}


      </div>
    );
  }

}

export default Brewery ;
