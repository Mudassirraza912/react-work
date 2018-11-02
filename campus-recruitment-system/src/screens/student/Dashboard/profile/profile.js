import React, { Component } from 'react';
import firebase from 'firebase'
import '../../../../App.css'


class StudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            fatherName: '',
            rollNo: '',
            college: '',
            faculty: '',
            skills: '',
        }
    }
    componentWillMount() {
        console.log('componentWillMount')
        firebase.database().ref('/' + firebase.auth().currentUser.uid + '/profile').on('child_added', (snap) => {
            console.log('SnapShot******', snap.val())
            var student = snap.val()
            this.setState({
                name: student.student,
                fatherName: student.fatherName,
                rollNo: student.rollNo,
                college: student.college,
                skills: student.skills,
                faculty: student.faculty
            })
        })
    }
    render() {
        const { backtostudentdashboard } = this.props
        const { name, faculty, fatherName, rollNo, skills, college } = this.state
        return (
            <div>
                <button onClick={backtostudentdashboard}>BackToDashboard</button>

                <div>
                    <h1 className='profile'>{name}</h1>


                    <p>Father Name : {fatherName}</p>
                    <p>Faculty : {faculty}</p>
                    <p>Roll No : {rollNo}</p>
                    <p>College Name : {college}</p>
                    <p>skills : {skills}</p>

                </div>

            </div>
        )
    }
}


export default StudentProfile;