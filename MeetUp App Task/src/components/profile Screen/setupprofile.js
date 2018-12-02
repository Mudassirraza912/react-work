import React, { Component } from 'react';
import firebase from '../config/firebase'
// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond';
// import { Input, Icon } from '@material-ui/core'
import Map from './map'
import Dashboard from '../dashboard/dashboard'
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import { Button, TextField, Checkbox } from '@material-ui/core'
import { connect } from 'react-redux'
import { updateUser } from '../../Redux/Actions/authActions'
import AppBar from '../Constants/appBar'
import history from '../config/history'
import store from '../../Redux'
import { Provider } from 'react-redux'


class Setup extends Component {
    constructor() {
        super()
        this.state = {
            nickName: '',
            phoneNo: '',
            step1: false,
            step2: false,
            step3: false,
            files: [],
            beverages: [],
            duration: [],
            url: [],
            direction: {},
            dashboard: false,
            users: [],
            userinfo: [],
            UserUid: ''

        }
        this.nickName = this.nickName.bind(this)
        this.phoneNo = this.phoneNo.bind(this)
        this.compeleteS1 = this.compeleteS1.bind(this)
        this.uploadPic = this.uploadPic.bind(this)
        this.beverages = this.beverages.bind(this)
        this.duration = this.duration.bind(this)
        this.s3Compelete = this.s3Compelete.bind(this)
        this.lat = this.lat.bind(this)
        this.finally = this.finally.bind(this)

    }

    componentWillMount() {
        const { users, UserUid } = this.state
        console.log(this.state.userUid)
        var userUid = localStorage.getItem('userUid')
        this.setState({ UserUid: userUid })

        firebase.database().ref('/' + userUid + '/myData/').on('child_added', snap => {
            console.log(snap.val())
            users.push(snap.val())
            
            // this.props.updateUser(snap.val())
            this.setState({
                users,
                dashboard: true
            })
        })

        // var userUid = localStorage.getItem('userUid')
        // this.setState({ UserUid: userUid })
        // console.log(UserUid)
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log('nextProps ==>', nextProps, nextProps.user);
    // }

    nickName(e) {
        console.log(e.target.value)
        this.setState({
            nickName: e.target.value
        })
    }
    phoneNo(e) {
        console.log(e.target.value)
        this.setState({
            phoneNo: e.target.value
        })
    }

    compeleteS1() {
        this.setState({
            step1: true
        })
    }

    uploadPic() {
        const { files, url } = this.state
        var task = firebase.storage().ref(`/images/${files[0].name}`).put(files[0])
        task.on('state_changed',
            (progress) => {

            },
            (error) => {
                console.log(error)
            },
            () => {
                firebase.storage().ref(`images/`).child(files[0].name).getDownloadURL().then((URL) => {
                    console.log(URL)
                    url.push(URL)
                    this.setState({
                        url,
                    })

                })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        )

        var task = firebase.storage().ref(`/images/${files[1].name}`).put(files[1])
        task.on('state_changed',
            (progress) => {

            },
            (error) => {
                console.log(error)
            },
            () => {
                firebase.storage().ref(`images/`).child(files[1].name).getDownloadURL().then((URL) => {
                    console.log(URL)
                    url.push(URL)
                    this.setState({
                        url,
                    })
                })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        )

        var task = firebase.storage().ref(`/images/${files[2].name}`).put(files[2])
        task.on('state_changed',
            (progress) => {

            },
            (error) => {
                console.log(error)
            },
            () => {
                firebase.storage().ref(`images/`).child(files[2].name).getDownloadURL().then((URL) => {
                    console.log(URL)
                    url.push(URL)
                    this.setState({
                        url,
                    })
                })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        )
        this.setState({
            step2: true,
            url,
        })
    }

    FirstStep() {
        const { nickName, phoneNo } = this.state
        console.log(nickName, phoneNo)
        return (
            <div>
                <center>
                    <TextField required placeholder='Enter Your Nick Name' onChange={this.nickName} id="outlined-email-input"
                        label="Nick name"

                        type="name"
                        name="name"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined" /><br /><br />
                    <TextField type='Number' placeholder='Enter Your Phone No..' onChange={this.phoneNo} id="outlined-email-input"
                        label="Phone No"

                        type="Number"
                        name="Number"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined" /><br /><br />
                    <Button color='primary' onClick={this.compeleteS1} required >Next</Button>
                </center>
            </div>
        )
    }

    handleInit() {
        // console.log('FilePond instance has initialised', this.pond.getFiles());
    }

    image(e) {
        console.log(e)
    }
    pond() {
        console.log(this.pond.getFiles())
    }

    SecondStep() {
        const { files } = this.state

        return (
            <div>
                <FilePond ref={ref => this.pond = ref}
                    allowMultiple={true}
                    maxFiles={1}
                    onChange={this.image}
                    ref={ref => this.pond = ref}
                    // server=""
                    //  files={[]}
                    oninit={() => this.handleInit()}

                    onaddfile={(error, file) => {
                        //   console.log(file)
                    }}
                    onupdatefiles={(fileItems) => {
                        // Set current file objects to this.state
                        //   console.log(fileItems.map(fileItem => {console.log(fileItem.file)}))
                        fileItems.map(fileItem => {
                            const { files } = this.state
                            console.log(fileItem.file)
                            var file = fileItem.file
                            files.push(file)
                            this.setState({
                                files,
                            })
                        })

                    }}>

                    {/* Update current files  */}
                    {this.state.files.map(file => {
                        // console.log(file)
                        return (
                            <File key={file} src={file} origin="local" />
                        )
                    })}

                </FilePond>

                <FilePond ref={ref => this.pond = ref}
                    allowMultiple={true}
                    maxFiles={1}
                    onChange={this.image}
                    ref={ref => this.pond = ref}
                    // server=""
                    //  files={[]}
                    oninit={() => this.handleInit()}
                    onaddfile={(error, file) => {
                        //   console.log(file)
                    }}
                    onupdatefiles={(fileItems) => {
                        // Set current file objects to this.state
                        //   console.log(fileItems.map(fileItem => {console.log(fileItem.file)}))
                        fileItems.map(fileItem => {
                            const { files } = this.state
                            console.log(fileItem.file)
                            var file = fileItem.file
                            files.push(file)
                            this.setState({
                                files,
                            })
                        })

                    }}>

                    {/* Update current files  */}
                    {/* {this.state.files.map( file => {
                        console.log(file)
                        return(
                        <File key={file} src={file} origin="local" />
                        )
                    })} */}

                </FilePond>

                <FilePond ref={ref => this.pond = ref}
                    allowMultiple={true}
                    maxFiles={1}
                    onChange={this.image}
                    ref={ref => this.pond = ref}
                    // server=""
                    //  files={[]}
                    oninit={() => this.handleInit()}
                    onaddfile={(error, file) => {
                        //   console.log(file)
                    }}
                    onupdatefiles={(fileItems) => {
                        // Set current file objects to this.state
                        //   console.log(fileItems.map(fileItem => {console.log(fileItem.file)}))
                        fileItems.map(fileItem => {
                            const { files } = this.state
                            console.log(fileItem.file)
                            var file = fileItem.file
                            files.push(file)
                            this.setState({
                                files,
                            })
                        })

                    }}>

                    {/* Update current files  */}
                    {/* {this.state.files.map( file => {
                        console.log(file)
                        return(
                        <File key={file} src={file} origin="local" />
                        )
                    })} */}

                </FilePond>
                {files.length >= 3 ? <center><Button color='primary' onClick={this.uploadPic}>Next</Button></center> : <center><p>all 3 are required</p></center>}


            </div>
        )
    }

    beverages(e) {
        const { beverages } = this.state
        var item = e.target.value
        beverages.push(item)
        this.setState({
            beverages,
        })
    }

    duration(e) {
        const { duration } = this.state
        var item = e.target.value
        duration.push(item)
        this.setState({
            duration,
        })
    }

    s3Compelete() {
        console.log('hehehehhehehehehehehhehe')
        this.setState({
            step3: true
        })
    }

    thirdStep() {
        return (
            <div>
                <center>
                    <h2>Select Beverages</h2>
                    <Checkbox color='primary' value='coffee' onChange={this.beverages} type="checkbox" />Coffee <br />
                    <Checkbox color='primary' value='Juice' onChange={this.beverages} type="checkbox" />Juice <br />
                    <Checkbox color='primary' value='Cocktail' onChange={this.beverages} type="checkbox" />Cocktail <br />

                    <h2>Select Duration</h2>
                    <Checkbox color='primary' value='20 Min' onChange={this.duration} type="checkbox" />20 Min <br />
                    <Checkbox color='primary' value='60 Min' onChange={this.duration} type="checkbox" />60 Min <br />
                    <Checkbox color='primary' value='120 Min' onChange={this.duration} type="checkbox" />120 Min <br />

                    <Button color='primary' onClick={this.s3Compelete}>Next</Button>
                </center>
            </div>
        )
    }

    lat(lat, long) {
        console.log(lat, long)
        var direction = {
            latitude: lat,
            loongitude: long
        }
        this.setState({
            direction: direction
        })

    }

    finally() {
        const { nickName, phoneNo, url, beverages, duration, direction, userinfo, UserUid, dashboard } = this.state
       
        var userInfo = {
            nickName: nickName,
            phoneNo: phoneNo,
            url: url,
            beverages: beverages,
            duration: duration,
            direction: direction,
            uid: UserUid,
            profileUrl: firebase.auth().currentUser.photoURL,
            profileName: firebase.auth().currentUser.displayName
        }
        userinfo.push(userInfo)
        this.setState({
            userinfo,
            dashboard: true
        })
        console.log(UserUid, userinfo)
        history.push(`/Dashboard/${UserUid}`)
        firebase.database().ref('/Users/').push(userInfo)
        firebase.database().ref('/' + UserUid + '/myData/').push(userInfo)


    }

    stepfour() {
        const { url } = this.state
        console.log(url.length, 'length!!!!!!!!!!!!!!!!!!', url)
        return (
            <div>
                <Map lat={this.lat} />
                <center>{url.length === 3 ? <Button color='primary' onClick={this.finally}>Done</Button> : <p>Just a second....</p>} </center>
            </div>
        )
    }

    render() {
        const { step1, step2, step3, files, beverages, duration, url, dashboard } = this.state
        // console.log(files, beverages, duration, url)
        return (
            <div>
                <AppBar />
                {!dashboard && !step1 && this.FirstStep()}
                {!dashboard && step1 && !step2 && this.SecondStep()}
                {!dashboard && step1 && step2 && !step3 && this.thirdStep()}
                {!dashboard && step3 && this.stepfour()}
                <center>
                    {/* <Provider store={store}>
                        <Dashboard />
                    </Provider> */}
                    {dashboard && <Dashboard/>}
                 >
                </center>
            </div>
        )
    }

}


// const mapStateToProps = (state) => {
//     return ({
//       user: state.authReducer.user
//     })
//    }

//     const mapDispatchToProps = (dispatch) => {
//     return ({
//       updateUser: (user) => dispatch(updateUser(user))
//     })
//   }



  export default  Setup
