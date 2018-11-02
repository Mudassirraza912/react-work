import React, { Component } from 'react';
import '../../../App.css'

class CompanySignUp extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        const { back, emailValue, passValue, companyName,companyLogin,companySignup,companyWebsite,emailAdress,country } = this.props
        return (
            <div>
                <h1>Company Account</h1>
                <label>Full Name Of Comapny</label><br/>
                <input placeholder='Comapny name' onChange={companyName} /><br /><br />
                <label>Mailing Address</label><br/>
                <input placeholder='Enter Mailing Address' onChange={emailAdress} /><br /><br />
                <label>Website</label><br/>
                <input placeholder='Enter Website URL' onChange={companyWebsite} /><br /><br />
                <label>Country</label><br/>
                <input placeholder='Country' onChange={country} /><br /><br />
                <label>Email</label><br/>
                <input placeholder='Enter Email' onChange={emailValue} /><br /><br />
                <label>Password</label><br/>
                <input type='Password' placeholder='Admin Password' onChange={passValue} /><br /><br />
                <button onClick={companySignup}>Sign Up</button><br/><br/>
                <span>if you have already an account so <button onClick={companyLogin}>logIn</button> here</span><br/><br/>
                <div><button onClick={back}>Back</button></div>

                
            </div>
        )
    }

}
export default CompanySignUp;