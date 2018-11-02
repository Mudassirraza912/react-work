import React, { Component } from 'react';
import firebase from 'firebase'
import '../../../../App.css'
class StudDetails extends Component{
    constructor(){
        super()
        this.state = {
            stud:[],
            vacancies:[]
        }
    }
componentWillMount(){
    const {stud,vacancies} = this.state
    {firebase.database().ref('/Students/').on('child_added', (snapStud) => {
        console.log(snapStud.val());
        var snap = snapStud.val();
        var studObj = {
            college:snap.college,   
            email:snap.email,
            faculty:snap.faculty,
            fatherName:snap.fatherName,
            rollNo:snap.rollNo,
            skills:snap.skills,
            student:snap.student
        }
        stud.push(studObj)
        
    })}


    
    firebase.database().ref('/vacancy/').on('child_added',(snapVacan) => {
     var   snap = snapVacan.val()
        console.log(snap)
        vacancies.push(snap)
        this.setState({
            vacancies,
        })
    })
}
    render(){
        const {stud} = this.state
        return(
            <div>
            {stud.map((value,index) => {
                console.log(value)
                return(
                    <div>
                        <center>
                            <div className='vacancy'>
                        <p><b>Name</b>:{value.student}</p><br/>
                        <p><b>Father Name</b>:{value.fatherName}</p><br/>
                        <p><b>Institute</b>:{value.college}</p><br/>
                        <p><b>Email</b>:{value.email}</p><br/>
                        <p><b>Faculty</b>:{value.faculty}</p><br/>
                        <p><b>Skills</b>:{value.skills}</p><br/>
                        <p><b>Roll No</b>:{value.rollNo}</p><br/>
                        </div>
                        </center>
                    </div>
                )
            })}
            </div>
        )
    }
}

export default StudDetails;