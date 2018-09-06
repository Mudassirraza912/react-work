import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import BulbOnKaro from './bulbOnkaro/bulbOnKaro.js'
import BulbOfKaro from './bulbOfkaro/bulbOffKaro.js'
import DamageBulb from './damageBulb/DamageBulb.js'



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      onBulb : false,
      // offBulb : true,
      damageBulb :false
    }
    this.bulbOn = this.bulbOn.bind(this)
    this.bulbOff = this.bulbOff.bind(this)
    this.bulbDamage = this.bulbDamage.bind(this)
    this.defaultBulb = this.defaultBulb.bind(this)
  }

  bulbOn(){
    this.setState({
      onBulb:true
    })
  }
   
  bulbOff(){
    this.setState({
      onBulb:false
    })
  }

  bulbDamage(){
    this.setState({
     damageBulb : true
    })
  }
  defaultBulb(){
    this.setState({
      damageBulb:false
    })
  }

  render() {
    const {onBulb,damageBulb } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          
        </header>
        {!damageBulb ? !onBulb && <BulbOfKaro toro={this.bulbDamage} jalao={this.bulbOn}/>:
        <DamageBulb default={this.defaultBulb}/>}
       {onBulb && <BulbOnKaro of={this.bulbOff}/>}
        
      </div>
    );
  }
}

export default App;
