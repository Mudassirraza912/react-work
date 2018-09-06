import React, { Component } from 'react';
import './App.css';
class DamageBulb extends Component {
    constructor(props){
        super(props);

    }

    bulbOnRender(){
        // this.props.bulbJalao({})
return(
    <div>
        <h1>Bulb JalGaya</h1>
        <img src= {require('./damagdBulb.PNG')} alt='onBulbl'/>
    </div>
)
    }

render(){

return(
    <div>
        {this.bulbOnRender()}
      <button onClick={this.props.default}>bulbJoro</button>
    </div>
)
}
} 


export default DamageBulb;