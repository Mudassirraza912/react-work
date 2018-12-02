import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Avatar, Button, TextField } from '@material-ui/core'
import firebase from '../config/firebase'
import history from '../config/history'


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class PersistentDrawerLeft extends React.Component {
  state = {
    open: false,
    UserUid: '',
    photoUrl: '',
    name: ''
  };

  componentWillMount() {
    const { UserUid, photoUrl, name } = this.state
    var userUid = localStorage.getItem('userUid')
    this.setState({ UserUid: userUid })

    firebase.database().ref('/' + userUid + '/myData/').on('child_added', snap => {
      console.log(snap.val())
      var data = snap.val()
      var uid = data.uid
      var Name = data.profileName
      var url = data.profileUrl
      this.setState({
        UserUid: uid,
        photoUrl: url,
        name: Name
      })
    })
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { open, name, UserUid, photoUrl } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleDrawerOpen}
            className={classNames(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <List>
              <ListItem style={{float: 'right'}}  >
                <center>
                <Button onClick={() => { history.push(`/user/${name}`) }}>
                  <Avatar className='avatar'
                    alt={name}
                    src={photoUrl}
                    sizes='50%'
                  /><br/><br/>
                  <p style={{ color: '#ff0025', float : 'right' }} ><b>{name}</b></p>
                </Button><br />
                </center>
              </ListItem>


              <ListItem>
                {/* <Button variant="contained" color="secondary" onClick={
                  () => {
                    history.push('/')
                    localStorage.clear()
                    firebase.auth().signOut()
                  }
                }>
                  <img src="https://img.icons8.com/metro/50/ffffff/exit.png" height='20px' width='30px' />    <b>Log Out</b>
                </Button> */}
              </ListItem>
            </List>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />

              </ListItem>
            ))}
            <br /><br />
            <Button variant="contained" color="secondary" onClick={
              () => {
                history.push('/')
                localStorage.clear()
                firebase.auth().signOut()
              }
            }>
              <img src="https://img.icons8.com/metro/50/ffffff/exit.png" height='20px' width='30px' />    <b>Log Out</b>
            </Button>
          </List>
        </Drawer>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);