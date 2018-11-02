import React, { Component } from 'react';
import firebase from 'firebase'
import '../../../App.css';
import admin from 'firebase-admin'


class AdminDashboard extends Component {
    constructor() {
        super();
        this.state = {
            stundents: [],
            stud: '',
            vacancies: [],
            vacancy: '',
            company:'',
            companies:[]
        }
        this.stundent = this.stundent.bind(this)
        this.renderStudents = this.renderStudents.bind(this)
        this.vacancy = this.vacancy.bind(this)
        this.renderVacancy = this.renderVacancy.bind(this)
        this.back = this.back.bind(this)
        this.company = this.company.bind(this)
        this.renderCompany = this.renderCompany.bind(this)
    }

    componentWillMount() {
        const { stundents, vacancies, companies } = this.state
        {
            firebase.database().ref('/Students/').on('child_added', (snapStud) => {
                console.log(snapStud.val(), 'studKey********888', snapStud.key);
                var snap = snapStud.val();
                var studObj = {
                    college: snap.college,
                    email: snap.email,
                    faculty: snap.faculty,
                    fatherName: snap.fatherName,
                    rollNo: snap.rollNo,
                    skills: snap.skills,
                    student: snap.student,
                    trackingKey: snapStud.key,
                    userId: snap.uid
                }
                stundents.push(studObj)

            })
        }
        // const {vacancies} = this.state
        firebase.database().ref('/vacancy/').on('child_added', (snapVacan) => {
            var snap = snapVacan.val()
            console.log(snap, 'keyy ************', snapVacan.key)
            var vacanObj = {
                comName: snap.comName,
                email: snap.email,
                postion: snap.postion,
                salary: snap.salary,
                skills: snap.skills,
                uid: snap.uid,
                trackingKey: snapVacan.key,
            }
            vacancies.push(vacanObj)
            this.setState({
                vacancies,
            })
        })

        firebase.database().ref('/Companies/').on('child_added',(snapCom) => {
            var snap = snapCom.val()
            console.log(snapCom, 'keyy ************', snapCom.key)
            var comObj = {
                comName: snap.companyName,
                email: snap.email,
                uid: snap.uid,
                country:snap.country,
                emailAdress:snap.emailAdress,
                trackingKey: snapCom.key,
                companyWebsite:snap.companyWebsite,
            }
            companies.push(comObj)
            this.setState({
                companies
            })

        })


    }





    vacancy() {
        this.setState({
            vacancy: true
        })

        firebase.database().ref()
    }

    stundent() {
        this.setState({
            stud: true
        })
        
    }

    company() {
        this.setState({
            company: true
        })
    }



    back() {
        this.setState({
            stud: false,
            vacancy: false,
            company:false
        })
    }

    delete(index, key, uid) {
        const { vacancies } = this.state
        console.log(key)
        firebase.database().ref('/vacancy/' + '/' + key + '/').remove();
        firebase.database().ref('/' + uid + '/vacancy').remove()
        vacancies.splice(index, 1);

        this.setState({ vacancies });
    }

    deleteSudent(uid, key, index) {
        const { stundents } = this.state
        admin.auth().deleteUser(uid)
            .then((succes) => {
                console.log(succes)
               firebase.database().ref('/' + uid + '/').remove()
            })
            .catch((error) => {
                console.log(error)
            })
            firebase.database().ref('/Students/' + key + '/').remove()
            stundents.splice(index, 1);
            this.setState({ stundents });
    }

    renderStudents() {
        const { stundents } = this.state
        return (
            <div>
                {stundents.map((value, index) => {
                    console.log(value)
                    return (
                        <div>
                            <center>
                                <div className='vacancy'>
                                    <p><b>Name</b>:{value.student}</p><br />
                                    <p><b>Father Name</b>:{value.fatherName}</p><br />
                                    <p><b>Institute</b>:{value.college}</p><br />
                                    <p><b>Email</b>:{value.email}</p><br />
                                    <p><b>Faculty</b>:{value.faculty}</p><br />
                                    <p><b>Skills</b>:{value.skills}</p><br />
                                    <p><b>Roll No</b>:{value.rollNo}</p><br />
                                    <button onClick={this.deleteSudent.bind(this, value.userId, value.trackingKey, index)}>Delete</button>
                                </div>
                            </center>
                        </div>
                    )
                })}
                <button onClick={this.back}>Back</button>
            </div>
        )
    }


    renderVacancy() {
        const { vacancies } = this.state
        return (
            <div>
                {vacancies.map((value, index) => {
                    console.log(value)
                    return (
                        <div>
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
                                            <p><b>Required Skills</b>:{value.skills}</p><br />
                                            <button onClick={this.delete.bind(this, index, value.trackingKey, value.uid)}>Delete</button>
                                        </div>))
                                    }
                                </div>
                            </center>
                        </div>
                    )
                })}
                <button onClick={this.back}>Back</button>
            </div>
        )
    }

    companyDelete(uid,key,index){
        const { companies } = this.state
        admin.auth().deleteUser(uid)
            .then((succes) => {
                console.log(succes)
              
               
            })
            .catch((error) => {
                console.log(error)
            })
            firebase.database().ref('/Companies/' + key + '/').remove()
            firebase.database().ref('/'+ uid + '/').remove()
            companies.splice(index, 1);
            this.setState({ companies });
    }

    renderCompany(){
        const {companies} = this.state
        return(
            <div>
                {companies.map((value,index) => {
                    return  (
                        <div>
                            <center>
                                <div className='vacancy'>
                                    <p><b>Comapny Name </b>:{value.companyName}</p><br />
                                    <p><b>Comapny website</b>:{value.companyWebsite}</p><br />
                                    <p><b>Company Mail</b>:{value.emailAdress}</p><br />
                                    <p><b>Email</b>:{value.email}</p><br />
                                    <p><b>Country</b>:{value.country}</p><br />
                                    <button onClick={this.companyDelete.bind(this, value.uid, value.trackingKey, index)}>Delete</button>
                                </div>
                            </center>
                        </div>
                    )
                })}
                <button onClick={this.back}>Back</button>
            </div>
        )
    }




    render() {
        const { stud, vacancy, company} = this.state
        return (
            <div>

                <h1>AdminDashboard</h1>
                {!stud && !vacancy && !company && <button onClick={this.vacancy}>Vacancies</button>}
                {!stud && !vacancy && !company &&<button onClick={this.stundent}>Students</button>}
                {!stud && !vacancy && !company &&<button onClick={this.company}>Companies</button>}

                {stud && this.renderStudents()}
                {vacancy && this.renderVacancy()}
                {company &&  this.renderCompany()}
            </div>
        )
    }
}

export default AdminDashboard;