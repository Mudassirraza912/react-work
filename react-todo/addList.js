import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import firebase from 'firebase'
// import Search from './screens/Search/Search'

class AddWork extends Component {
    constructor() {
        super();

        this.state = {
            todos: [],
            todosWork: [],
            text: '',
            currentIndex: null,
            childkey:''

        }

        this.add = this.add.bind(this);
        this.updateText = this.updateText.bind(this);
        this.cancel = this.cancel.bind(this);
        this.updated = this.updated.bind(this)
    }

    updateText(e) {
        console.log(e.target.value)
        this.setState({ text: e.target.value })
    }


    updated() {
        const { text, todosWork, currentIndex,childkey } = this.state
        console.log('childKey',text,childkey)
        // var obj = {
        //     work: text,
        // }
        todosWork[currentIndex].work.text = text;
        firebase.database().ref('/Work/' + '/' + childkey +'/').update({text})
        this.setState({
            todosWork,
            text: '',
            currentIndex: null
        })
    }
    componentWillMount() {
        const { todosWork } = this.state
        console.log('componentDidMount')
        firebase.database().ref('/Work/').on('child_added', (snapShot) => {
            var data = snapShot.val()
            var key = snapShot.key
            console.log('data', data, snapShot.key)
            // this.setState({todosWork:textFire})
            // console.log(todosWork);
            var obj = {
                work: data,
                key: key
            }
            todosWork.push(obj)
            this.setState({
                todosWork,
            })
        })

    }


    add() {
        const { text, todos, todosWork } = this.state;
        // var obj ={
        //     text:text
        // }
        todos.push(text);
        this.setState({ todos, text: '' });
        firebase.database().ref('/Work/').push({text});

    }

    edit(index, key) {
        const { todos, todosWork,childkey } = this.state;
        
        console.log(key, todosWork[index].work)

        this.setState({ 
            text: todosWork[index].work.text,
             currentIndex: index,
            childkey:key
             })
    }

    delete(index, key) {
        const { todosWork } = this.state
        console.log(key)
        firebase.database().ref('/Work/' + '/' + key + '/').remove();
        // this.setState({
        //     todosWork,
        // })
        // const {todosWork} = this.state;
        todosWork.splice(index, 1);

        this.setState({ currentIndex: null, todosWork });
    }

    cancel() {
        this.setState({ text: '', currentIndex: null })
    }

    //   renderHeader() {
    //     return (
    //       <header className="App-header">
    //           {/* <img src={logo} className="App-logo" alt="logo" />
    //           <h1 className="App-title">Search</h1> */}
    //       </header>
    //     )
    //   }

    renderTodos() {
        const { todos, todosWork } = this.state;
        // this.setState({
        //     todosWork,
        // })
        console.log('todoswork', todosWork)
        return <ol>{todosWork.map((item, index) => {
            console.log(item)

            return <div className='itemContainer'><li className='item' >
                {item.work.text}
                <button className='editBtn' onClick={this.edit.bind(this, index, item.key)}>Edit</button>
                <button className='delBtn' onClick={this.delete.bind(this, index, item.key)}>Delete</button>
            </li>
            </div>
        })}
        </ol>

    }

    render() {
        const { currentIndex } = this.state;

        return (
            <div className="App">
                {/* {this.renderHeader()} */}
                <input className='inp'
                    placeholder="What needs to be done?.."
                    onChange={this.updateText}
                    value={this.state.text}
                />
                {currentIndex == null ?
                    <div>  <button className='addBtn' onClick={this.add}>Add</button></div>
                    :
                    <div>
                        <button className='updateBtn' onClick={this.updated}>Update</button>
                        <button className='cancelBtn' onClick={this.cancel}>Cancel</button>
                    </div>
                }
                <br />
                {currentIndex != null && <p>You editing item # {currentIndex + 1} currently!</p>}

                {this.renderTodos()}
            </div>
        );
    }
}

export default AddWork;

