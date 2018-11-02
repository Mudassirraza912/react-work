import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AdminLogin from './screens/admin/login/adminLogin'
import CompanyLogin from './screens/comapny/login/companyLogin'
import CompanySignUp from './screens/comapny/signup/companysignup'
import StudentLogin from './screens/student/login/studentLogin'
import StudentSignUp from './screens/student/signup/studentSignUp'
import firebase from 'firebase'
import StudentProfile from './screens/student/Dashboard/profile/profile'
import StudentScreen from './screens/student/Dashboard/studentScreen/studentScreen'
import swal from 'sweetalert'
import CompanyScreen from './screens/comapny/Dashboard/Company Screen/CompanyScreen'
import CompanyProfile from './screens/comapny/Dashboard/Company Profile/companyProfile';
import AdminDashboard from './screens/admin/adminDashboard/dashboard'
import * as admin from "firebase-admin";
import Routes from '../src/config/router'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyABJto_eN2rQjk_FsYPQoKr6E5UhA7izSs",
  authDomain: "campus-recruitment-syste-fde0b.firebaseapp.com",
  databaseURL: "https://campus-recruitment-syste-fde0b.firebaseio.com",
  projectId: "campus-recruitment-syste-fde0b",
  storageBucket: "campus-recruitment-syste-fde0b.appspot.com",
  messagingSenderId: "14159389304"
};
firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super();
    this.state = {
      studentUsers: [],
      companyUsers: [],
      admin: false,
      student: false,
      company: false,
      emailValue: '',
      passValue: '',
      studentName: '',
      companyName: '',
      collegeName: '',
      faculty: '',
      fatherName: '',
      rollNo: '',
      skills: '',
      studentprofile: '',
      studentScreen: '',
      faltu: '',
      user: '',
      companyprofile: '',
      companyscreen: '',
      companyWebsite: '',
      country: '',
      emailAdress: '',
      adminScreen: ''
    }
    this.renderStudentLogin = this.renderStudentLogin.bind(this)
    this.renderAdminLogin = this.renderAdminLogin.bind(this)
    this.renderCompanyLogin = this.renderCompanyLogin.bind(this)
    this.back = this.back.bind(this)
    this.emailValue = this.emailValue.bind(this)
    this.passValue = this.passValue.bind(this)
    this.companyName = this.companyName.bind(this)
    this.collegeName = this.collegeName.bind(this)
    this.studentName = this.studentName.bind(this)
    this.fatherName = this.fatherName.bind(this)
    this.faculty = this.faculty.bind(this)
    this.rollNo = this.rollNo.bind(this)
    this.skills = this.skills.bind(this)
    this.studLogin = this.studLogin.bind(this)
    this.comLogin = this.comLogin.bind(this)
    this.adminLogin = this.adminLogin.bind(this)
    this.StudentSignup = this.StudentSignup.bind(this)
    this.StudentLogin1 = this.StudentLogin1.bind(this)
    this.companySignup = this.companySignup.bind(this)
    this.CompanyLogin1 = this.CompanyLogin1.bind(this)
    this.studprofile = this.studprofile.bind(this)
    this.backToSudentDashBoard = this.backToSudentDashBoard.bind(this)
    this.logOut = this.logOut.bind(this)
    this.comapnyProfile = this.comapnyProfile.bind(this)
    this.companyWebsite = this.companyWebsite.bind(this)
    this.emailAdress = this.emailAdress.bind(this)
    this.country = this.country.bind(this)
    this.backToComapanyDashBoard = this.backToComapanyDashBoard.bind(this)
  }

  componentWillMount() {
    const { studentUsers, companyUsers } = this.state
    firebase.database().ref('/Students/').on('child_added', (snapChild) => {
      console.log(snapChild.val(), Useremail)
      var studentData = snapChild.val()
      var Useremail = studentData.email
      studentUsers.push(Useremail)
      this.setState({
        studentUsers,
      })
      console.log(studentUsers)
    })

    firebase.database().ref('/Companies/').on('child_added', (snapChild) => {
      console.log(snapChild.val(), Useremail)
      var CompaniesData = snapChild.val()
      var Useremail = CompaniesData.email
      companyUsers.push(Useremail)
      this.setState({
        companyUsers,
      })
      console.log(companyUsers)
    })
  }

  //RENDER SIGN UP BUTTONS
  renderStudentLogin() {
    this.setState({ student: true })
  }
  renderAdminLogin() {
    this.setState({ admin: true }) 
    this.props.history.push(`/admin-login`)
    // console.log(props)
  }
  renderCompanyLogin() {
    this.setState({ company: true })
  }

  //GETTING VALUES OG AL SIGN UP FORMS
  emailValue(e) {
    // console.log(e.target.value)
    this.setState({
      emailValue: e.target.value
    })
  }

  passValue(e) {
    // console.log(e.target.value)
    this.setState({
      passValue: e.target.value
    })
  }

  collegeName(e) {
    console.log(e.target.value)
    this.setState({
      collegeName: e.target.value
    })
  }

  companyName(e) {
    console.log(e.target.value)
    this.setState({
      companyName: e.target.value
    })
  }

  studentName(e) {
    console.log(e.target.value)
    this.setState({
      studentName: e.target.value
    })
  }

  fatherName(e) {
    console.log(e.target.value)
    this.setState({
      fatherName: e.target.value
    })
  }

  faculty(e) {
    console.log(e.target.value)
    this.setState({
      faculty: e.target.value
    })
  }

  rollNo(e) {
    console.log(e.target.value)
    this.setState({
      rollNo: e.target.value
    })
  }

  skills(e) {
    console.log(e.target.value)
    this.setState({
      skills: e.target.value
    })
  }

  companyWebsite(e) {
    console.log(e.target.value)
    this.setState({
      companyWebsite: e.target.value
    })
  }
  country(e) {
    console.log(e.target.value)
    this.setState({
      country: e.target.value
    })
  }
  emailAdress(e) {
    console.log(e.target.value)
    this.setState({
      emailAdress: e.target.value
    })
  }
  //RENDER LOG IN FORMS

  studLogin() {
    this.setState({
      studentLogin: true,
      //  student:false
    })
  }

  comLogin() {
    this.setState({
      companyLogin: true
    })
  }

  //Back TO HOme
  back() {
    this.setState({
      company: '',
      student: '',
      admin: '',
      studentLogin: '',
      companyLogin: ''
    })
  }



  //Signup/LogIn FunctionS

  // 1) Admin Signup 
  adminLogin() {
    const { emailValue, passValue } = this.state
    if (emailValue === 'admin@domain.com' && passValue === 'admin123') {
      console.log('LOGIN SUCCESFULL')
      swal({
        title: "LOG IN!",
        text: "Sign Up Successfull !",
        icon: "success",
      });
      this.setState({
        user: true,
        adminScreen: true,
        admin: false, student: '',
        faltu: true,
      })
    }
    else {
      swal({
        title: "LOG IN",
        text: "Sometthing Went Wrong!",
        icon: "error",
      });
    }
  }

  // 2) For Student****************

  //*** STudent SignUp
  StudentSignup() {
    const { emailValue, passValue, collegeName, studentName, faculty, fatherName, rollNo, skills } = this.state

    firebase.auth().createUserWithEmailAndPassword(emailValue, passValue)
      .then((success) => {
        success.user.updateProfile({
          displayName: studentName
        })
        console.log('SignUp Successfully', success)
        var StudObj = {
          email: emailValue,
          pass: passValue,
          college: collegeName,
          student: studentName,
          uid: success.user.uid,
          fatherName: fatherName,
          faculty: faculty,
          rollNo: rollNo,
          skills: skills
        }
        if (success) {
          firebase.database().ref('/' + success.user.uid + '/profile').push(StudObj)
          firebase.database().ref('/Students/').push(StudObj)
          this.setState({
            studentScreen: true,
            student: '',
            faltu: true,
            user: success.user.uid
          })
          swal({
            title: "SIGN UP!",
            text: "Sign Up Successfull !",
            icon: "success",
          });
        }
        else {
          console.log('unsucces')
        }
      })
      .catch((error) => {
        // console.log(error)
        swal({

          title: "LOG IN",
          text: error.code,
          icon: "error",
        });

      })

  }


  //*** STudent LOgin

  StudentLogin1() {
    const { emailValue, passValue, companyUsers } = this.state
    console.log('Includesss', companyUsers.includes(emailValue))

    !companyUsers.includes(emailValue) ?

      (firebase.auth().signInWithEmailAndPassword(emailValue, passValue)
        .then((success) => {
          console.log('LogIn Successfull', success)
          swal({
            title: "LOG IN!",
            text: success.code,
            icon: "success",
          });
          this.setState({
            studentScreen: true,
            student: '',
            faltu: true,
            user: success.user.uid

          })
        })
        .catch((error) => {
          swal({

            title: "LOG IN",
            text: error.code,
            icon: "error",
          });

        })
      )
      :
      swal({

        title: "LOG IN",
        text: 'Something Went Wrong',
        icon: "error",
      });

  }


  // 2)FOr Company************************** 

  //Company Sign Up

  companySignup() {
    const { emailValue, passValue, companyName, country, companyWebsite, emailAdress } = this.state

    firebase.auth().createUserWithEmailAndPassword(emailValue, passValue)
      .then((success) => {
        success.user.updateProfile({
          displayName: companyName
        })
        console.log('SignUp Successfully', success)
        var CompanyObj = {
          email: emailValue,
          pass: passValue,
          companyName: companyName,
          // student:studentName,
          uid: success.user.uid,
          country: country,
          emailAdress: emailAdress,
          companyWebsite: companyWebsite,
        }
        if (success) {
          firebase.database().ref('/' + success.user.uid + '/profile/').push(CompanyObj)
          firebase.database().ref('/Companies/').push(CompanyObj)
          swal({
            title: "SIGN UP!",
            text: "Sign Up Successfull !",
            icon: "success",
          });
          this.setState({
            user: success.user.uid,
            companyscreen: true,
            company: false,
            faltu: true,

          })
        }
        else {
          console.log('unsucces')
        }
      })
      .catch((error) => {
        swal({

          title: "LOG IN",
          text: error.code,
          icon: "error",
        });
      })

  }

  //Company LogIn
  CompanyLogin1() {
    const { emailValue, passValue, studentUsers } = this.state

    !studentUsers.includes(emailValue) ?

      (firebase.auth().signInWithEmailAndPassword(emailValue, passValue)
        .then((success) => {
          console.log('LogIn Successfull', success)
          swal({
            title: "LOG IN!",
            text: "Sign Up Successfull !",
            icon: "success",
          });
          this.setState({
            user: success.user.uid,
            companyscreen: true,
            company: '',
            faltu: true,
          })
        })
        .catch((error) => {
          swal({
            title: "LOG IN",
            text: error.code,
            icon: "error",
          });
        })
      )
      :
      swal({
        title: "LOG IN",
        // text: error.code,
        icon: "error",
      });
  }


  //REnder Student Profile
  studprofile() {
    console.log('studprofile')
    this.setState({
      studentprofile: 'hi',
      studentScreen: '',
    })
  }

  //Back To Student DashBoard
  backToSudentDashBoard() {
    this.setState({
      studentprofile: false,
      studentScreen: true
    })
  }

  //For LogOut
  logOut() {
    firebase.auth().signOut();
    this.setState({
      faltu: false,
      company: false,
      student: false,
      admin: false,
      user: '',
      studentprofile: false,
      studentScreen: false,
      companyprofile: false,
      companyscreen: false,
      adminScreen: false
    })
  }

  //REnder Company Profile
  comapnyProfile() {
    console.log('comapnyProfile')
    this.setState({
      companyprofile: 'hi',
      companyscreen: '',
    })
  }

  //Back To Comapny DashBoard
  backToComapanyDashBoard() {
    this.setState({
      companyprofile: false,
      companyscreen: true
    })
  }

  render() {
    const { student, company, admin, studentLogin, companyLogin, studentScreen, studentprofile, faltu, user, companyscreen, companyprofile, adminScreen } = this.state
    console.log(studentScreen);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"><img src='http://www.marketwire.com/library/MwGo/2017/1/19/11G127935/CMC_Logo-d43e69ce5518a888a758ca7d6bbe7086.jpg' width='20%' height='60px' /></h1>
        </header>
        {
          !faltu && !student && !admin && !company &&
          <div>
            <button onClick={this.renderStudentLogin}>Create Student account/ Login</button>
            <button onClick={this.renderCompanyLogin}>Create Company account/ Login</button>
            <button onClick={this.renderAdminLogin}> admin Login</button>
          </div>
        }

        {admin && < AdminLogin adminLogin={this.adminLogin} emailValue={this.emailValue} passValue={this.passValue} back={this.back} />}

        {company && (!companyLogin ? <CompanySignUp companyWebsite={this.companyWebsite} emailAdress={this.emailAdress} country={this.country} companySignup={this.companySignup} companyLogin={this.comLogin} companyName={this.companyName} emailValue={this.emailValue} passValue={this.passValue} back={this.back} />
          : <CompanyLogin CompanyLogin1={this.CompanyLogin1} emailValue={this.emailValue} passValue={this.passValue} back={this.back} />)}


        {student && (!studentLogin ? <StudentSignUp skills={this.skills} rollNo={this.rollNo} faculty={this.faculty} fatherName={this.fatherName} StudentSignUp={this.StudentSignup} studentLogin={this.studLogin} studentName={this.studentName} collegeName={this.collegeName} emailValue={this.emailValue} passValue={this.passValue} back={this.back} />
          : <StudentLogin StudentLogin1={this.StudentLogin1} emailValue={this.emailValue} passValue={this.passValue} back={this.back} />)}

        {studentScreen && <StudentScreen studprofile1={this.studprofile} />}
        {studentprofile && <StudentProfile backtostudentdashboard={this.backToSudentDashBoard} />}
        {companyscreen && <CompanyScreen comapnyProfile={this.comapnyProfile} />}
        {companyprofile && <CompanyProfile backToComapanyDashBoard={this.backToComapanyDashBoard} />}
        {adminScreen && <AdminDashboard />}
          <Routes/>
        {user && < button onClick={this.logOut}>Log out</button>}
      </div>
    );
  }
}

export default App;
