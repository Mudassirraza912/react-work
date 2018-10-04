import React, { Component } from 'react';
// import logo from './logo.svg';
// import add from './add.png';
// import edit from './61456.svg';
// import delet from './delete-big.webp';
import './App.css';
// importScripts("https://unpkg.com/sweetalert/dist/sweetalert.min.js")
import swal from 'sweetalert'
class App extends Component {
constructor(){
  super()
  this.state = {
    employers : [],
    emailRef:'',
    password: '',
    user:'',
    firstName:'',
    lastName:'',
    employEmail:'',
    salary:'',
    date:'',
    addForm: '',      
    currentIndex: null,
  }
  this.edit = this.edit.bind(this)
  this.showTable = this.showTable.bind(this)
  this.addEmployeeForm = this.addEmployeeForm.bind(this)
  this.emailValue = this.emailValue.bind(this);
  this.passValue = this.passValue.bind(this);
  this.login = this.login.bind(this);
  this.firstName = this.firstName.bind(this);
  this.lastName = this.lastName.bind(this);
  this.employEmail = this.employEmail.bind(this);
  this.salary = this.salary.bind(this);
  this.date = this.date.bind(this);
this.addform = this.addform.bind(this);
this.delete = this.delete.bind(this);
this.updateText = this.updateText.bind(this);
    this.cancel = this.cancel.bind(this);
}
emailValue(email){
  const emailRef = email.target.value;
// console.log(emailRef);
this.setState({emailRef})
}
passValue(pass){
  const password = pass.target.value;
// console.log(password);
this.setState({password})
}
updateText() {
  const {firstName, lastName, employEmail, salary, date, employers, currentIndex} = this.state;
  // console.log(firstName, lastName, emailRef, salary, date, employers)
  // console.log(employers.firstName)
// let updatedName = 
let addForm = {
  firstName: firstName,
  lastName: lastName,
  employEmail: employEmail,
  salary: salary,
  date: date
}
console.log(addForm)
  employers.splice(currentIndex,1,addForm)
  this.setState({firstName, lastName, employEmail, salary, date, employers})
  swal('List is updated','successfull','success')
}
addEmployeeForm(){
  const { currentIndex } = this.state;
  return(
    <div className="login">
      <h1>Add New Employee</h1>
      <div>
      <p>First Name</p>
        <input placeholder="First Name" onChange={this.firstName} /></div>
        <div><p>Last Name</p>
        <input placeholder="Last Name" onChange={this.lastName}/></div>
        <div><p>Email</p>
        <input type="email" placeholder="Email" onChange={this.employEmail}/></div>
        <div> <p>Salary</p>
        <input  placeholder="Salary" onChange={this.salary}/></div>
        <div> <p>Date</p>
        <input type="date" placeholder="Job Start Date" onChange={this.date}/><br/></div>
{currentIndex == null ? <button onClick={this.addform}>add employer details</button>
:
<div>

  <button onClick={() => {this.updateText()}}>Update</button>
  <button onClick={this.cancel}>Cancel</button>
</div>
  }
</div>
  )
}
firstName(e){
  // console.log(e.target.value);
  const firstName = e.target.value;
  this.setState({firstName})
}
lastName(e){
  // console.log(e.target.value);
  const lastName = e.target.value;
  this.setState({lastName})
}
employEmail(e){
  // console.log(e.target.value);
  const employEmail = e.target.value;
  this.setState({employEmail})
}
salary(e){
  // console.log(e.target.value);
  const salary = e.target.value;
  this.setState({salary})
}
date(e){
  // console.log(e.target.value);
  const date = e.target.value;
  this.setState({date})
}
login(){
  let user
  const {emailRef,password} = this.state
  // console.log('email=>',emailRef,'password=>',password)
  emailRef === 'admin@domain.com' && password === 'admin' ? user='admin'  : user = ''
this.setState({user})
user ? swal('Login','succesful','success') : swal('Login','unsuccesful','error')
}
cancel() {
  this.setState({ currentIndex: null})
  swal('cencel update!')
}
delete(index){
  const { employers } = this.state;

  index || swal({
    title: "Are you sure?",
    text: "you want to delete this list!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      employers.splice(index,1);
this.setState({employers, currentIndex:null})
      swal("Your employers list has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your employer list is safe!");
    }
    
  });
 
// console.log(index);
// let currentIndex = index

// console.log(employers)

}
edit(index){
// console.log(index)
let currentIndex = index
const { employers } = this.state
this.setState({employers,currentIndex:  currentIndex})
// console.log(employers);
swal('Now editing your list!')

}
addform(){
  const {firstName,lastName,employEmail,salary,date,employers} = this.state;
  let addForm = {
    firstName: firstName,
    lastName: lastName,
    employEmail: employEmail,
    salary: salary,
    date: date
  }

employers.push(addForm);
    // console.log(employers);
    this.setState({employers,addForm});
    swal('employee addded','done!','success')
}

renderHeader(){
return(
<header className="App-header">
{/* <img src={logo} className="App-logo" alt="logo" /> */}
<h1 className="App-title">My employers details</h1>
</header>       
)
}
renderLogin(){
  return(
    <div className="login">
      <h1>Required Admin Access</h1>
      
   <p>Email</p>
   <input type='email' placeholder='admin email' onChange={this.emailValue}/><br/>
   <p>Password</p>
   <input type='password' placeholder='password' onChange={this.passValue}/><br/>
   <button onClick={this.login} >Log in</button>
    </div>
  )
}
showTable(){
  let a = 0;
  const { employers } = this.state;
  return employers.map((value,index)=>{
    // let name = `${value.firstName} ${value.lastName}
    // console.log(firstName, lastName, employEmail, salary, date, employers)
    return(
      
      <div className="table" key={Math.random()}>
      <h1>Employer # {++a}</h1>
      <center>
          <table>
    <thead>
      <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Salary</th>
      <th>Date</th>
      <th></th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>{`${value.firstName} ${value.lastName}`}</td>
      <td>{value.employEmail}</td>
      <td>{value.salary}</td>
      <td>{value.date}</td>
     <td><button onClick={this.edit.bind(this,index)}><img height='50px' width="50px" src='data:image/png;base64,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'/></button>
  <button  onClick={this.delete.bind(this,index)}><img height='50px' width="50px" src='https://cdn1.iconfinder.com/data/icons/ui-5/502/trash-512.png'/></button></td></tr>
      </tbody>
      </table>
      </center>

      </div>
    )
  })
}
  render() {
    const {user, addForm} = this.state
return (
        <div className="App">
{this.renderHeader() }
{!user && this.renderLogin()}
{user && addForm && this.addEmployeeForm()}
{user && addForm && this.showTable()}
{user && !addForm && this.addEmployeeForm() }
 {/* {this.addEmployeeForm()}
{this.showTable()} */}
 
              </div>
             
    );
  }
}

export default App;
