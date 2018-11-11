import React, { Component } from 'react';
import firebase from '../config/firebase'
// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond';
// import { Input, Icon } from '@material-ui/core'
import Map from './map'
import Dashboard from '../dashboard/dashboard'
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import { Button, TextField} from '@material-ui/core'
import { connect } from 'react-redux'
import {updateUser} from '../../Redux/Actions/authActions'



class Setup extends Component{
    constructor(){
        super()
        this.state ={
            nickName:'',
            phoneNo:'',
            step1:false,
            step2:false,
            step3:false,
            files: [],
            beverages:[],
            duration:[],
            url:[],
            direction:{},
            dashboard:false,
            users:[],
            userinfo:[]

        }
        this.nickName = this.nickName.bind(this)
        this.phoneNo = this.phoneNo.bind(this)
        this.compeleteS1 = this.compeleteS1.bind(this)
        this.uploadPic = this.uploadPic.bind(this)
        this.beverages  = this.beverages.bind(this)
        this.duration = this.duration.bind(this)
        this.s3Compelete = this.s3Compelete.bind(this)
        this.lat = this.lat.bind(this)
        this.finally = this.finally.bind(this)
        
    }

 componentWillMount(){
const {users} = this.state
     console.log(firebase.auth().currentUser.uid)
     firebase.database().ref('/' + firebase.auth().currentUser.uid + '/myData/').on('child_added' , snap =>{
         console.log(snap.val())
         users.push(snap.val())
         this.setState({
             users,
             dashboard:true
         })
     })
 }

 componentWillReceiveProps(nextProps) {
    console.log('nextProps ==>',nextProps , nextProps.user);
  }

 nickName(e){
     console.log(e.target.value)
     this.setState({
         nickName:e.target.value
     })
 }
 phoneNo(e){
    console.log(e.target.value)
    this.setState({
        phoneNo:e.target.value
    })
}

compeleteS1(){
    this.setState({
        step1:true
    })
}

uploadPic() {
    const { files,url } = this.state
    var task = firebase.storage().ref(`/images/${files[0].name}`).put(files[0])
    task.on('state_changed',
    (progress) => {

    },
    (error) =>{
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
        } )
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
        } )
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
        } )
    }
    )
    this.setState({
        step2:true,
        url,
    })
}

 FirstStep(){
     const {nickName,phoneNo} =  this.state
     console.log(nickName,phoneNo)
     return(
         <div>
        <TextField required placeholder='Enter Your Nick Name' onChange={this.nickName} id="outlined-email-input"
          label="Nick name"
          
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined" /><br/><br/>
        <TextField type='Number' placeholder='Enter Your Phone No..' onChange={this.phoneNo} id="outlined-email-input"
          label="Phone No"
          
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"/><br/><br/>
        <Button color= 'primary' onClick={this.compeleteS1} required >Next</Button>
         </div>
     )
 }

 handleInit() {
    // console.log('FilePond instance has initialised', this.pond.getFiles());
}

image(e){
    console.log(e)
}
pond(){
    console.log(this.pond.getFiles())
}

 SecondStep(){
     const {files} = this.state

    return(
        <div>
       <FilePond ref={ref => this.pond = ref}
                          allowMultiple={true}
                          maxFiles={1}
                          onChange={this.image}
                          ref={ref => this.pond = ref}
                            // server=""
                            //  files={[]}
                          oninit={() => this.handleInit() }

                          onaddfile = {(error, file) => {
                            //   console.log(file)
                          }}
                          onupdatefiles={(fileItems) => {
                              // Set current file objects to this.state
                            //   console.log(fileItems.map(fileItem => {console.log(fileItem.file)}))
                               fileItems.map(fileItem => {
                                   const {files} = this.state
                                  console.log(fileItem.file) 
                                  var file = fileItem.file
                                  files.push(file)
                                  this.setState({
                                    files,
                                  })
                                })
                              
                          }}>
                    
                    {/* Update current files  */}
                    {this.state.files.map( file => {
                        // console.log(file)
                        return(
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
                          oninit={() => this.handleInit() }
                          onaddfile = {(error, file) => {
                            //   console.log(file)
                          }}
                          onupdatefiles={(fileItems) => {
                              // Set current file objects to this.state
                            //   console.log(fileItems.map(fileItem => {console.log(fileItem.file)}))
                               fileItems.map(fileItem => {
                                   const {files} = this.state
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
                          oninit={() => this.handleInit() }
                          onaddfile = {(error, file) => {
                            //   console.log(file)
                          }}
                          onupdatefiles={(fileItems) => {
                              // Set current file objects to this.state
                            //   console.log(fileItems.map(fileItem => {console.log(fileItem.file)}))
                               fileItems.map(fileItem => {
                                   const {files} = this.state
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
                {files.length >= 3 ? <Button color='primary'  onClick={this.uploadPic}>Next</Button> : <p>all 3 are required</p>}


        </div>
    )
   }

beverages(e){
    const {beverages} = this.state
    var item= e.target.value
    beverages.push(item)
       this.setState({
        beverages,
       })
   }

duration(e){
    const {duration} = this.state
    var item= e.target.value
    duration.push(item)
       this.setState({
        duration,
       })
}

s3Compelete() {
    console.log('hehehehhehehehehehehhehe')
    this.setState({
        step3:true
    })
}

thirdStep() {
    return(
        <div>
            <h2>Select Beverages</h2>
           <input value='coffee' onChange={this.beverages} type="checkbox" />Coffee <br/>
           <input value='Juice' onChange={this.beverages} type="checkbox" />Juice <br/>
           <input value='Cocktail' onChange={this.beverages} type="checkbox" />Cocktail <br/>

            <h2>Select Duration</h2>
           <input value='20 Min' onChange={this.duration} type="checkbox" />20 Min <br/>
           <input value='60 Min' onChange={this.duration} type="checkbox" />60 Min <br/>
           <input value='120 Min' onChange={this.duration} type="checkbox" />120 Min <br/>

           <Button color='primary' onClick={this.s3Compelete}>Next</Button>
        </div>
    )
}

lat(lat,long){
console.log(lat,long)
var direction = {
    latitude:lat,
    loongitude:long
}
this.setState({
    direction:direction
})

}

finally(){
    const {nickName,phoneNo,url,beverages,duration,direction, userinfo} = this.state
var userInfo = {
    nickName : nickName,
    phoneNo:phoneNo,
    url:url,
    beverages:beverages,
    duration:duration,
    direction:direction,
    uid:firebase.auth().currentUser.uid,
    profileUrl:firebase.auth().currentUser.photoURL,
    profileName:firebase.auth().currentUser.displayName
}
userinfo.push(userInfo)
this.setState({
    userinfo
})
firebase.database().ref('/Users/').push(userInfo)
firebase.database().ref('/' + firebase.auth().currentUser.uid + '/myData/' ).push(userInfo)

this.props.updateUser(userinfo)

}

stepfour(){
    const {url} = this.state
    console.log(url.length,'length!!!!!!!!!!!!!!!!!!',url)
    return(
        <div>
            <Map  lat={this.lat}/>
         {url.length === 3 ?  <Button color='primary' onClick={this.finally}>Done</Button> : <p>Just a second....</p>} 
        </div>
    )
}

render(){
    const {step1,step2,step3,files,beverages,duration,url,dashboard} = this.state
    console.log(files,beverages,duration,url)
    console.log(this.props.user)
    return(
        <div>
            <h1>Welcome to setup</h1>
            {!dashboard && !step1 && this.FirstStep()}
            { !dashboard && step1 && !step2 && this.SecondStep()}
            {!dashboard && step1 && step2 && !step3  && this.thirdStep()}
             {!dashboard && step3 && this.stepfour()}
            {dashboard && <Dashboard/>}
        </div>
    )
}

}

const mapStateToProps = (state) => {
    console.log(state)
    return {
      user: state.reducer.user
    }
   }
    const mapDispatchToProps = (dispatch) => {
    return {
      updateUser: (user) => dispatch(updateUser(user))
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Setup) 
