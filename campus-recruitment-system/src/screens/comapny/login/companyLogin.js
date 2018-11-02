import React, { Component } from 'react';
import '../../../App.css'

class CompanyLogin extends Component {
    constructor(props){
        super(props)
    }
    render() {
const {back,emailValue,passValue,CompanyLogin1} = this.props
        
        return (
            <div>
                <h1>Company Account</h1>
                <label>Email</label>
                <input placeholder='Admin Email' onChange={emailValue} /><br/><br/>
                <label>Password</label>
                <input type='Password' placeholder='Admin Password' onChange={passValue} /><br/><br/>
                <button onClick={CompanyLogin1}>Login</button><br/><br/>
            
            <button onClick={back}> Back</button>
            </div>
        )
    }

}
export default CompanyLogin;