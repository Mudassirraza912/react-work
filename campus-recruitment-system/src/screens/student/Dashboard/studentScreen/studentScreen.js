import React, { Component } from 'react';
import firebase from 'firebase'
import '../../../../App.css'
import swal from 'sweetalert'

class StudentScreen extends Component {
    constructor() {
        super();
        this.state = {
            skills: '',
            salary: '',
            email: '',
            name: '',
            postion: '',
            vacancies: [],
            applyBy: []
        }
        this.skills = this.skills.bind(this)
        this.salary = this.salary.bind(this)
        this.email = this.email.bind(this)
        this.postion = this.postion.bind(this)
        this.comName = this.comName.bind(this)
    }
    componentWillMount() {
        const { vacancies, applyBy } = this.state
        firebase.database().ref('/vacancy/').on('child_added', (snapVacan) => {
            var snap = snapVacan.val()
            var snapObj = {
                comName: snap.comName,
                postion: snap.postion,
                salary: snap.salary,
                skills: snap.skills,
                email: snap.email,
                trackingKey: snapVacan.key,
                uid: snap.uid
            }
            console.log(snapVacan.key)
            vacancies.push(snapObj)
            this.setState({
                vacancies,
            })
        })

        firebase.database().ref('/' + firebase.auth().currentUser.uid + '/apply/').on('child_added', snap => {
            applyBy.push(snap.val())
            this.setState({
                applyBy
            })
            console.log(applyBy)
        })
    }

    skills(e) {
        console.log(e.target.value)
        this.setState({
            skills: e.target.value
        })
    }


    salary(e) {
        console.log(e.target.value)
        this.setState({
            salary: e.target.value
        })
    }
    email(e) {
        console.log(e.target.value)
        this.setState({
            email: e.target.value
        })
    }
    postion(e) {
        console.log(e.target.value)
        this.setState({
            postion: e.target.value
        })
    }
    comName(e) {
        console.log(e.target.value)
        this.setState({
            name: e.target.value
        })
    }


    apply(skills, uid) {

        firebase.database().ref('/' + firebase.auth().currentUser.uid + '/profile').on('child_added', (studprofile) => {
            firebase.database().ref('/' + uid + '/' + skills + '/').push(studprofile.val()),
                firebase.database().ref('/' + firebase.auth().currentUser.uid + '/apply/').push(skills)
            swal({

                title: "Vacancy",
                text: 'Your applied success ',
                icon: "success",
            })
        })
    }


    render() {
        const { studprofile1 } = this.props
        const { vacancies, applyBy } = this.state
        console.log(vacancies)
        return (
            <div>
                <button onClick={studprofile1}>My Profile</button><br /><br />


                {vacancies.map((value) => {
                    console.log(applyBy.includes(value.skills))
                    return (
                        <div>
                            <h1>Job Offer</h1>
                            <center>
                                <div className='vacancy'>

                                    {(vacancies.length == 0 ?

                                        (<h1>No vacancy yet</h1>)
                                        :
                                        (<div>
                                            <h1>{value.comName}</h1>
                                            <p><b>Job Position</b>:{value.postion}</p>
                                            <p><b>Salary</b>:{value.salary}</p>
                                            <p><b>email</b>:{value.email}</p>
                                            <p><b>Required Skills</b>:{value.skills}</p>
                                            {
                                                applyBy.includes(value.skills) ?
                                                    <button disabled={true} className='disable' >Applied</button> :
                                                    <button onClick={this.apply.bind(this, value.skills, value.uid)}>Apply</button>
                                            }
                                        </div>))
                                    }
                                </div>
                            </center>
                        </div>
                    )
                })}
            </div>
        )
    }
}


export default StudentScreen;
