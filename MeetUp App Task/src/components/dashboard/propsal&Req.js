import React, { Component } from 'react';
import firebase from '../config/firebase'
import swal from 'sweetalert'
import { AppBar, Avatar, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ListItem, ListItemText, Tabs, Tab, Typography, Button, Divider } from '@material-ui/core'
import AddToCalendar from 'react-add-to-calendar';
import { DeleteIcon, AccessAlarm} from '@material-ui/icons'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

//   TabContainer.propTypes = {
//     children: PropTypes.node.isRequired,
//   };

class PropReq extends Component {
    constructor(props) {
        super(props)
        this.state = {
            proposals: [],
            propSend: [],
            value: 'one',
            event: {
                title: 'Sample Event',
                description: 'This is the sample event provided as an example only',
                location: 'Portland, OR',
                startTime: '2016-09-14T20:15:00-04:00',
                endTime: '2016-09-16T21:45:00-04:00'
              },
              icon : { 'calendar-plus-o': 'left' },
              items : [
                { google: 'Google' }
             ]

        }

    }


    componentWillMount() {

        const { proposals, propSend,event } = this.state       

        firebase.database().ref('/Proposals').on('child_added' , snapProp => {
            var propSnap1 = snapProp.val()
                var key = {key: snapProp.key}
                var propSnap2 = { ...propSnap1, ...key }
                var auth = firebase.auth().currentUser.uid
                event.startTime = propSnap1.startTime
                event.endTime = propSnap1.endTime
            if(propSnap2.senderUid === auth ) {
                propSend.push(propSnap2)
                this.setState({
                    propSend,
                    event,
                })
            }

            if(propSnap2.recieverUid === auth ) {
                proposals.push(propSnap2)
                this.setState({
                    proposals,
                })
            }
        })


    }


    
    


    handleChange = (event, value) => {
        this.setState({ value });
       
    };


    AccEpt(e, index) {
        const {proposals , propSend} = this.state
        console.log(e, index)
        firebase.database().ref('/Proposals/' + e.key + '/').update({status : 'ACCEPTED '})
        proposals[index].status = 'ACCEPTED'
        this.setState({
            proposals,
            propSend
        })

    }

    rejEct(e, index) {
        const {proposals , propSend} = this.state
        console.log(e)
        firebase.database().ref('/Proposals/' + e.key + '/').update({status : 'CANCELED '})
        proposals[index].status = 'CANCELLED'

        this.setState({
            proposals,
            propSend
        })
    }

    render() {
        const { proposals, propSend } = this.state
        const { value } = this.state;

        return (
            <div>

                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab value="one" label="Requests" />
                        <Tab value="two" label="Send Proposals" />
                    </Tabs>
                </AppBar>


                {value === 'one' && <TabContainer>
                    {proposals.length >= 1 ?
                        <div>
                            {proposals.map((value, index) => {
                                console.log(proposals)
                                return (
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                            <ListItem>
                                                <Avatar src={value.senderData.profileUrl} />
                                                <ListItemText primary={value.senderData.profileName} />
                                            </ListItem>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <div>
                                                <Divider style = {{width:'100%'}}/>
                                                <p> <b>Date:</b>{value.endTime} </p>
                                                <Divider style = {{width:'100%'}}/>
                                                <p> <b>Beverages:</b>{value.beverages.map(val => {
                                                    return (
                                                        <ul>
                                                            <li>{val}</li>
                                                        </ul>
                                                    )
                                                })} </p>
                                                <Divider style = {{width:'100%'}}/>
                                                <p> <b>Status:</b>{value.status} </p>
                                                <Divider style = {{width:'100%'}}/>
                                                <p> <b>Durations:</b>{value.senderData.duration.map(val => {
                                                    return (
                                                        <ul>
                                                            <li>{val}</li>
                                                        </ul>
                                                    )
                                                })}</p>
                                                <Divider style = {{width:'100%'}}/>
                                                <div className='AccRej'>
                                                <Button variant="contained" color="primary" onClick={this.AccEpt.bind(this, value, index)}>
                                                    Accept
                                                  </Button>

                                                <Button variant="contained" color="secondary" onClick={this.rejEct.bind(this, value, index)} >
                                                    Reject
                                                 </Button>
                                                 </div>
                                            </div>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>)
                            })}
                        </div>

                        :
                        <div>
                            <h2>No Proposals yet</h2>
                        </div>
                    }

                </TabContainer>}




                {value === 'two' && <TabContainer>
                    {propSend.length >= 1 ?
                        <div>
                            {propSend.map((value, index) => {
                                console.log(propSend)
                                return (
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                            <ListItem>
                                                <Avatar src={value.recieverPhoto} />
                                                <ListItemText primary={value.recieverName} />
                                            </ListItem>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <div>
                                            <Divider style = {{width:'100%'}}/>
                                                <p> <b>Date:</b>{value.endTime} </p>
                                                <Divider style = {{width:'100%'}}/>
                                                <p> <b>Beverages:</b>{value.beverages.map(val => {
                                                    return (
                                                        <ul>
                                                            <li>{val}</li>
                                                        </ul>
                                                    )
                                                })} </p>
                                                <Divider style = {{width:'100%'}}/>
                                                <p> <b>Status:</b>{value.status} </p>
                                                <Divider style = {{width:'100%'}}/>
                                                <p> <b>Durations:</b>{value.senderData.duration.map(val => {
                                                    return (
                                                        <ul>
                                                            <li>{val}</li>
                                                        </ul>
                                                    )
                                                })}</p>
                                            </div>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>)
                            })}
                        </div>

                        :
                        <div>
                            <h2>No Proposals sends</h2>
                        </div>
                    }

                </TabContainer>}
                <AddToCalendar buttonTemplate={this.state.icon}  listItems={this.state.items} event={this.state.event}><AccessAlarm />Delete</AddToCalendar>
            </div>
        )
    }




}

export default PropReq;
