import React, { Component } from 'react';
import firebase from 'firebase'
import StudDetails from './studDetail'
import '../../../../App.css'
import swal from 'sweetalert'

class CompanyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initial: '',
            studentDet: '',
            seeVacancy: '',
            postVacancy: '',
            skills: '',
            salary: '',
            email: '',
            name: '',
            postion: '',
            vacancies:[],
            applicants:[],
            view:false
        }

        this.stud = this.stud.bind(this)
        this.skills = this.skills.bind(this)
        this.salary = this.salary.bind(this)
        this.email = this.email.bind(this)
        this.postion = this.postion.bind(this)
        this.comName = this.comName.bind(this)
        this.submit = this.submit.bind(this)
        this.formState = this.formState.bind(this)
        this.renderApplicant = this.renderApplicant.bind(this)
    }
componentWillMount(){
    const {vacancies} = this.state
    firebase.database().ref('/'+ firebase.auth().currentUser.uid+'/vacancy/').on('child_added',(snapVacan) => {
     var   snap = snapVacan.val()
        console.log(snap)
        vacancies.push(snap)
        this.setState({
            vacancies,
        })
    })
}

    stud() {
        this.setState({
            initial: true,
            studentDet: true
        })
        console.log('runnnnnnnnnnnnnnn')
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
    submit() {
    const {skills,postion,salary,email,name} = this.state
      this.setState({})
    var VacancyObj = {
        skills:skills,
        postion:postion,
        email:email,
        salary:salary,
       comName:name,
       uid : firebase.auth().currentUser.uid
    }
firebase.database().ref('/' + firebase.auth().currentUser.uid + '/vacancy/').push(VacancyObj)
firebase.database().ref('/vacancy/').push(VacancyObj)
this.setState({
    postVacancy:false,
    initial:false
})
swal({
          
    title: "Vacancy",
    text: 'Submitted',
    icon: "success",
  });
 
    }

    formState(){
        const {postVacancy} = this.state
        this.setState({
            postVacancy:true,
            initial:true
        })
    }

    renderForm() {
        return (

            <div>
                <label>Full Name Of Comapny</label>
                <input placeholder='Comapny name' onChange={this.comName} /><br /><br />
                <label>Job Position</label>
                <input placeholder='Enter Position' onChange={this.postion} /><br /><br />
                <label>Salary</label>
                <input placeholder='Salary' onChange={this.salary} /><br /><br />
                <label>SKills</label>
                <input placeholder='Required skills' onChange={this.skills} /><br /><br />
                <label>Company mail</label>
                <input placeholder='Enter Email' onChange={this.email} /><br /><br />
                <button onClick={this.submit}>Submit</button>
            </div>
        )
    }

    


    applicants(skills,uid){
        const {applicants} = this.state
        firebase.database().ref('/' + uid + '/' + skills + '/').on('child_added' , (applies) => {
            var applicant = applies.val()
            applicants.push(applicant)
            this.setState({
                applicants,
                view:true,
                studentDet:false,
                postVacancy:true
            })
        })
    }
    back(){
        this.setState({
            view:false,
            postVacancy:false,
            applicants:[]

        })
    }


    renderApplicant(){
        const {applicants} = this.state
        return (
            <div>
            {applicants.map((value,index) => {
                return <div>
                <center>
                    <div className='vacancy'>
                <p><b>Name</b>:{value.student}</p><br/>
                <p><b>Father Name</b>:{value.fatherName}</p><br/>
                <p><b>Institute</b>:{value.college}</p><br/>
                <p><b>Email</b>:{value.email}</p><br/>
                <p><b>Faculty</b>:{value.faculty}</p><br/>
                <p><b>Skills</b>:{value.skills}</p><br/>
                <p><b>Roll No</b>:{value.rollNo}</p><br/><br/><br/>
                <button onClick={this.back.bind(this)}>Back</button>
                </div>
                </center>
            </div>
            })}
            </div>
        )
    }

    render() {
        const { comapnyProfile } = this.props
        const { initial, studentDet, postVacancy,vacancies,view } = this.state
        console.log(vacancies.length == 0)
        return (
            <div>
                <button onClick={comapnyProfile}>My Profile</button>
                {/* <h1>COMPANY DASHBOARD</h1><br /><br /><br /> */}
                {!view && !initial && <button onClick={this.stud}>Student Details</button>}
               
                {!view && !postVacancy  && !studentDet && <div> <h1>My Vacancy</h1><br/><br/></div>}  
                {vacancies.map((value) =>{
                    return(
                     <div>
                     
                     {!postVacancy  && !studentDet && (vacancies.length == 0 ? 

                     (<h1>No vacancy yet</h1>)
                     :
                     (<div>
                         <center>
                     <div className='vacancy'>
                     <h1>{value.comName}</h1>
                     <p><b>Job Position</b>:{value.postion}</p>
                     <p><b>Salary</b>:{value.salary}</p>
                     <p><b>email</b>:{value.email}</p>
                     <p><b>Required Skills</b>:{value.skills}</p>
                     <button onClick={this.applicants.bind(this,value.skills,value.uid)}>View</button>
                     </div>
                     </center>
                     </div>
                     ))
                     }
                     </div>
                     )
                })}
                 {!initial && !view && <button onClick={this.formState} className='post'>+</button>}
                 {view && this.renderApplicant()}
                 {!view && postVacancy && this.renderForm()}
                {studentDet && <StudDetails />}
                
            </div>
        )
    }
}

export default CompanyScreen