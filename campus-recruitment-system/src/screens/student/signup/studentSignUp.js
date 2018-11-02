import React, { Component } from 'react';
import '../../../App.css'

class StudentSignUp extends Component {

    constructor(props) {
        super(props)

    }
    render() {
        const { back, emailValue, passValue, studentName, collegeName, studentLogin, StudentSignUp, faculty, fatherName, rollNo, skills } = this.props
        return (

            <div>
                <h1>Student Account</h1>
                <label>College Name</label><br/>
                <input placeholder='Enter College' onChange={collegeName} /><br /><br />
                <label>Student Name</label><br/>
                <input placeholder='Enter Student Name' onChange={studentName} /><br /><br />
                <label>Father Name</label><br/>
                <input placeholder='Enter Father Name' onChange={fatherName} /><br /><br />
                <label>Faculty</label><br/>
                <input placeholder='Enter Faculty' onChange={faculty} /><br /><br />
                <label>Roll No</label><br/>
                <input type='Number' placeholder='Roll no' onChange={rollNo} /><br /><br />
                <label>Skills</label><br/>
                <input placeholder='Enter Skills' onChange={skills} /><br /><br />
                <label>Email</label><br/>
                <input placeholder='Enter Email' onChange={emailValue} /><br /><br />
                <label>Password</label><br/>
                <input type='Password' placeholder='Enter Password' onChange={passValue} /><br /><br />
                <button onClick={StudentSignUp}>Sign Up</button><br /><br />
                <span>if you have already an account so <button onClick={studentLogin}>logIn</button> here</span><br /><br />

                <div><button onClick={back}>Back</button></div>
            </div>
        )
    }

}
export default StudentSignUp;