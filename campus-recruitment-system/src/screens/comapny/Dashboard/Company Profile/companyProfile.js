import React, { Component } from 'react';
import firebase from 'firebase'
import '../../../../App.css'

class CompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName:'',
            website:'',
            country:'',
            mailingaddress:'',
            Email:'',
            
        }
    }
    componentWillMount() {
        const {Email} = this.state
        console.log('componentWillMount')
        firebase.database().ref('/' + firebase.auth().currentUser.uid + '/profile/').on('child_added', (snap) => {
            // console.log('SnapShot******', snap.val())
            var company = snap.val()
            console.log('SnapShot******', snap.val(),'Name!!!!!!!!!!!!!!!!!COmpany',company.companyName)
            
            this.setState({
                companyName:company.companyName ,
                website:company.companyWebsite ,
                country:company.country ,
                mailingaddress:company.emailAdress ,
                Email:company.email ,
                // faculty: student.faculty
            })
      
        })
    }
    render() {
        const { backToComapanyDashBoard } = this.props
        const { companyName,website,mailingaddress,Email,country } = this.state
        console.log( companyName,website,mailingaddress,Email,country )
        return (
            <div>
                <button onClick={backToComapanyDashBoard}>BackToDashboard</button>

                <div>
                    <h1 className='profile'>{companyName}</h1>

                    <p>Company Name : {companyName} </p>
                    <p>Mailin Address : {mailingaddress}</p>
                    <p>Email : {Email}</p>
                    <p>Website : {website}</p>
                    <p>Country Name : {country}</p>
                    {/* <p>skills : {skills}</p> */}

                </div>

            </div>
        )
    }
}


export default CompanyProfile;