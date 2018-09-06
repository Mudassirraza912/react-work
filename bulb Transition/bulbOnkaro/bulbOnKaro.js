import React, { Component } from 'react';
import './App.css';
class BulbOnKaro extends Component {
    constructor(props){
        super(props);

    }

    bulbOnRender(){
        // this.props.bulbJalao({})
return(
    <div>
        <h1>Bulb JalGaya</h1>
        <img src= {require('./onBulb.PNG')} alt='onBulbl'/>
    </div>
)
    }

render(){

return(
    <div>
        {this.bulbOnRender()}
      <button onClick={this.props.of}  >bulboff</button>
    </div>
)
}
} 


export default BulbOnKaro;