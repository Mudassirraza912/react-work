import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      issue: [
        {
          title: "Document new features",
          date: new Date().toLocaleDateString(),
          commentsCount: 1,
          isOpen: false,
          isFavourite: false
        },
        {
          title: "JSX not working",
          date: new Date().toLocaleDateString(),
          commentsCount: 2,
          isOpen: true,
          isFavourite: false
        },
        {
          title: "Babel is not compiling",
          date: new Date().toLocaleDateString(),
          commentsCount: 5,
          isOpen: false,
          isFavourite: false
        },
        {
          title: "create-react-app not working",
          date: new Date().toLocaleDateString(),
          commentsCount: 1,
          isOpen: true,
          isFavourite: false
        }
      ],
      open:false
    };
    this.favourite = this.favourite.bind(this)
    this.unfavourite = this.unfavourite.bind(this)
    this.search = this.search.bind(this)
  }

  favourite(index){
    const {issue} = this.state
    issue[index].isFavourite = true

this.setState({
  issue
})
  }

  unfavourite(index){
    const {issue} = this.state
    issue[index].isFavourite = false

this.setState({
  issue
})
  }

  search(e){
    const {open} = this.state
console.log('search Value',e.target.value);
if(e.target.value === 'open'){
  this.setState({
    open:true
  })
}

console.log('state',open)
  }

  render() {
    const { issue } = this.state;
    return (
      <div>
      <input type="text" onChange={(e) =>{this.search(e)}}/>
        {issue.map((value, index) => (
          <div>
            {value.isOpen ?
            <img className="icon" src='https://hanslodge.com/images/8TE6knjec.png'/> :   <img className="icon" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpzCa81PQNk9zi35nlvmb71tPChwdtYu8skng-SLXSnkuzRoQGBA'
            />
            }
            <span className="heading">{value.title}</span>
            <div>{value.date}</div>
            <div>
              <img
                className="icon"
                src="https://www.shareicon.net/data/128x128/2016/12/29/866474_comment_512x512.png"
                alt=""
              />
              {value.commentsCount}
              |
              {value.isFavourite? 
             <button onClick={() => {this.unfavourite(index)}} > <img className="icon" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png" alt="" /></button>
              :
             <button onClick={() => {this.favourite(index)}}> <img className="icon" src="https://banner2.kisspng.com/20180425/zpe/kisspng-coloring-book-emoji-heart-drawing-the-heart-icon-5ae04c65b33188.229609541524649061734.jpg" alt="" /></button>}
            </div>
            <br />
            <hr />
            <br />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
