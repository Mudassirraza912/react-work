import React, { Component } from 'react';
import '../../../App.css'

class StudentLogin extends Component {
    render() {
        const {back,emailValue,passValue,StudentLogin1} = this.props
        return (
            <div>
                <h1>Student Account</h1>
                <label>Email</label>
                <input placeholder='Enter Email' onChange={emailValue} /><br/><br/>
                <label>Password</label>
                <input type='Password' placeholder='Enter Password' onChange={passValue}  /><br/><br/>
                <button onClick={StudentLogin1}>Login</button><br/><br/>
            
            <button onClick={back}>Back</button>
            </div>
        )
    }

}
export default StudentLogin;