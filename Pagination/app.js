import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state={
      data:'',
      inputData:'',
      pageNum:0,
    }
    this.inputData = this.inputData.bind(this);
    // this.nextPage = this.nextPage.bind(this);
  }
  inputData(e){this.setState({inputData:e.target.value})}

  // nextPage(){
  //   const {data,inputData,pageNum} = this.state;
  //   const PATH_BASE = 'https://hn.algolia.com/api/v1'; 
  //   const PATH_SEARCH = '/search'; 
  //   const PARAM_SEARCH = 'query='; 
  //   const PARAM_PAGE = 'page='; 
  //   const fetchURL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`
  //   const page = `&&page=`;
  //   this.setState({pageNum:pageNum+1})
  //   console.log(pageNum);
  //   var nextpg = pageNum + 1;
  //   fetch(`${fetchURL}${inputData}${page}${nextpg}`)
  //   .then((resp) => resp.json())
  //   .then((value) => {
  //     console.log(value);
  //     this.setState({data : data.concat(value.hits)});
  //   })
  // }

  fetchData(){
    const {inputData,pageNum} = this.state;
    const PATH_BASE = 'https://hn.algolia.com/api/v1'; 
    const PATH_SEARCH = '/search'; 
    const PARAM_SEARCH = 'query='; 
    const PARAM_PAGE = 'page='; 
    const fetchURL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`
    const page = `&&page=`;

    console.log(`${fetchURL}${inputData}${page}0`);
    fetch(`${fetchURL}${inputData}${page}${pageNum}`)
    .then((resp) => resp.json())
    .then((value) => {
      console.log(value);
      this.setState({data : value.hits});
    })
  }
 
  // componentDidMount(){
  //   window.addEventListener('scroll', this.onScroll)
  // }
  // onScroll = () => {
  //   if (window.innerHeight + document.documentElement.scrollTop
  //     === document.documentElement.offsetHeight) {
  //     this.nextPage();
  //   }
  // }
  pagination(num){
    const {inputData} = this.state;
    const PATH_BASE = 'https://hn.algolia.com/api/v1'; 
    const PATH_SEARCH = '/search'; 
    const PARAM_SEARCH = 'query='; 
    const PARAM_PAGE = 'page='; 
    const fetchURL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`
    const page = `&&page=`;

    fetch(`${fetchURL}${inputData}${page}${num}`)
    .then((resp) => resp.json())
    .then((value) => {
      console.log(value);
      this.setState({data : value.hits});
    })
  }


  
  render() {
    const {data,inputData,pageNum} = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br/>
        <input type='text' onChange={this.inputData} />

        <button onClick={this.fetchData.bind(this)}>Fetch Data</button>
        {/* <button onClick={this.nextPage}>Fetch More</button> */}

        <ol>{data && data.map(value=>{
          return (<li>{value.title}</li>)
        })}</ol>

        <button onClick={this.pagination.bind(this,1)}>1</button>
        <button onClick={this.pagination.bind(this,2)}>2</button>
        <button onClick={this.pagination.bind(this,3)}>3</button>
        <button onClick={this.pagination.bind(this,4)}>4</button>
        <button onClick={this.pagination.bind(this,5)}>5</button>
        <button onClick={this.pagination.bind(this,6)}>6</button>
        <button onClick={this.pagination.bind(this,7)}>7</button>
        <button onClick={this.pagination.bind(this,8)}>8</button>
        <button onClick={this.pagination.bind(this,9)}>9</button>
        <button onClick={this.pagination.bind(this,10)}>10</button>
        

        
      </div>
    );
  }
}

export default App;
