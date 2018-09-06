import React, { Component } from 'react';
import './App.css';
class BulbOfKaro extends Component {
    constructor(props){
        super(props);

    }

    bulbOfRender(){
        // this.props.bulbJalao({})
return(
    <div>
        <h1>Bulb JalGaya</h1>
        <img src= {require('./offBulb.PNG')} alt='offBulb'/>
    </div>
)
    }

render(){

return(
    <div>
        {this.bulbOfRender()}
      <button onClick={this.props.jalao}  >jalao</button>
      <button onClick={this.props.toro}>tORO</button>
    </div>
)
}
} 


export default BulbOfKaro;