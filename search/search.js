import React, { Component } from 'react';



class Search extends Component{
    constructor(){
        super()
        this.state ={
            text:'',
            result:[],
            // result1:[]
            
        }
        this.searcContent = this.searcContent.bind(this)
        // this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        // this.newresult = this.newresult.bind(this)
        this.fetchMore =- this.fetchMore.bind(this)
    }


searcContent(e){
this.setState({
    text:e.target.value
})
}
// newresult(prevResult,newResult){
//     const {result1} = this.state
//  var nResult = [...prevResult,...newResult]
//     result1.push(nResult)
//     this.setState({
//         result1
//     })
// }

// componentDidUpdate(prevProps,prevState){
//     const {result} = this.state
//     // console.log(prevState.result.hits)
//     // console.log(result.hits)
// //     if(prevState.result.hits !=result.hits){
// //    var nResult = [...prevState.result.hits,...result.hits]
// //        console.log(nResult)
// //     }

// }

fetchSearchTopStories() {
    const {text,result} = this.state 
    const PATH_BASE = 'https://hn.algolia.com/api/v1';
    const PATH_SEARCH = '/search';
    const PARAM_SEARCH = 'query='; 
    const PARAM_PAGE = 'page='; 

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${text}&&${ PARAM_PAGE}`)
    .then(response => response.json())
    .then(result =>  {
        // console.log(res.hits)
        // result.push(res.hits)
        
        this.setState({
            result: [...this.state.result,...result.hits]
        })
    }
    
)
    .catch(error => error);
    }

    fetchMore(){

    }

    // setSearchTopStories(result){
    //     const  {result1,resultList} = this.state
    //     console.log(result.hits)
    //     this.setState({
    //         result1:result,
    //         resultList:true
    //     })
    // }

render(){
    const {result,result1} = this.state
    // console.log(result1)
    return(
        <div>
            <input type='text' placeholder='search anything' onChange={this.searcContent}/>
            <button onClick={this.fetchSearchTopStories}>Search</button>
            <button onCLick={this.fetchMore}>Fetch More</button>
            <div>
                <ol>
            {result && result.map((value) => {
                // console.log(value)
                return (
                    <div><li>{value.title} </li> </div>
                )
            })}
            </ol>
            </div>
        </div>
    )
}



}

export default Search;
