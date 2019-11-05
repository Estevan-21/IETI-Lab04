import React, {Fragment} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EventIcon from "@material-ui/icons/Event";
import LaunchIcon from "@material-ui/icons/Launch";
import FilterIcon from "@material-ui/icons/FilterList";
import Avatar from "@material-ui/core/Avatar";
import CreateIcon from "@material-ui/icons/Create";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Dashboard from "./Dashboard";
import {Link, Route, withRouter} from "react-router-dom";
import MenuList from "@material-ui/core/MenuList";
import NewTask from "./NewTask";
import moment from "moment";
import UserProfile from "./UserProfile";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";


const drawerWidth = 280;

const styles = theme => ({
    root: {
        display: "flex",
        flexGrow: 1,
    },
    avatarBox: {
        width: "80%",
        maxWidth: 200,
        backgroundColor: theme.palette.background.paper,

    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "100%"
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    inline: {
        display: "inline",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",

    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing.unit * 8,
        },
    },
    toolbar: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    avatar: {
        margin: theme.spacing.unit - 10,
        width: 50,
        height: 50,
    }, grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: "none",
        padding: theme.spacing.unit,
        [theme.breakpoints.up("xs")]: {
            display: "flex",
        },
    },
});

class NavigationDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            open: false,
            userFullName: " ",
            userEmail: " ",
            filteredUser: "Select",
            filteredStatus: "Select",
            filteredDueDate: null,
            states: ["Ready", "In progress", "Done", "Select"],
            fUser: "Select",
            fStatus: "Select",
            fDueDate: null,
            users: [],
        };
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.updateUserData = this.updateUserData.bind(this);
        this.handleFilteredUserChange = this.handleFilteredUserChange.bind(this);
        this.handleFilteredStateChange = this.handleFilteredStateChange.bind(this);
        this.handleFilteredDueDateChange = this.handleFilteredDueDateChange.bind(this);
        this.handleApplyFilter = this.handleApplyFilter.bind(this);
        this.handleClearFilter = this.handleClearFilter.bind(this);
    }

    handleDialogOpen = () => {
        this.setState({dialogOpen: true});
    };

    handleDialogClose = () => {
        this.setState({dialogOpen: false});
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    handleFilteredUserChange(ev) {
        this.setState({fUser: ev.target.value});
    }

    handleFilteredStateChange(ev) {
        this.setState({fStatus: ev.target.value});
    }

    handleFilteredDueDateChange(date) {
        this.setState({fDueDate: moment(date).format("YYYY-MM-DD")});
    }

    handleApplyFilter() {
        this.setState({
            filteredDueDate: this.state.fDueDate,
            filteredStatus: this.state.fStatus,
            filteredUser: this.state.fUser
        });
        this.handleDialogClose();
    }

    handleClearFilter() {
        this.setState({
            filteredDueDate: null,
            filteredStatus: "Select",
            filteredUser: "Select",
            fUser: "Select",
            fStatus: "Select",
            fDueDate: null,

        });
        this.handleDialogClose();
    }

    updateUserData(data) {
        this.setState(prevState => ({
            userFullName: data.fullName,
            userEmail: data.email,
        }));

    }

    componentWillMount() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("accessToken");
        axios.get('https://task-panner-api.herokuapp.com/api/users').then((res) => {
            this.setState({users: res.data});
            localStorage.setItem("users", JSON.stringify(res.data))
        }).catch(function (error) {
            console.log(error);
        });
        this.setState({
            userEmail: localStorage.getItem("userEmail"), userFullName: localStorage.getItem("userName")
        })
    }

    render() {
        const {classes, theme} = this.props;
        return (
            <Fragment>
                <CssBaseline/>
                <div className={classes.root}>
                    <AppBar
                        position="fixed"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: this.state.open,
                        })}
                    >
                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, {
                                    [classes.hide]: this.state.open,
                                })}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" noWrap>
                                Task Planner
                            </Typography>
                            {this.props.history.location.pathname === "/mainView"
                                ? <>
                                    <div className={classes.grow}/>
                                    <div className={classes.sectionDesktop}>
                                        <IconButton onClick={this.handleDialogOpen} color="inherit">
                                            <FilterIcon/>
                                        </IconButton>
                                    </div>

                                    <Dialog
                                        open={this.state.dialogOpen}
                                        onClose={this.handleDialogClose}
                                        aria-labelledby="form-dialog-title"
                                    >
                                        <DialogTitle id="form-dialog-title">Filtrar Tareas</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                            </DialogContentText>
                                            <TextField
                                                id="standard-select"
                                                select
                                                label="Usuario"
                                                value={this.state.fUser}
                                                className={classes.textField}
                                                onChange={this.handleFilteredUserChange}
                                                helperText="Seleccione usuario a filtrar"
                                                margin="normal"
                                            >
                                                {this.state.users.map((user, i) => (
                                                    <MenuItem key={i} value={user.email}>
                                                        {user.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            <TextField
                                                id="standard-select"
                                                select
                                                label="Estado"
                                                className={classes.textField}
                                                value={this.state.fStatus}
                                                onChange={this.handleFilteredStateChange}
                                                helperText="Seleccione estado a filtrar"
                                                margin="normal"
                                            >
                                                {this.state.states.map((state, i) => (
                                                    <MenuItem key={i} value={state}>
                                                        {state}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <DatePicker
                                                    margin="normal"
                                                    className={classes.textField}
                                                    label="Date picker"
                                                    id="due-date"
                                                    value={this.state.fDueDate}
                                                    onChange={this.handleFilteredDueDateChange}>
                                                </DatePicker>
                                            </MuiPickersUtilsProvider>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleClearFilter} color="primary">
                                                Limpiar
                                            </Button>
                                            <Button onClick={this.handleApplyFilter} color="primary">
                                                Aplicar
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                </>
                                : null}


                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={classNames(classes.drawer, {
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        })}
                        classes={{
                            paper: classNames({
                                [classes.drawerOpen]: this.state.open,
                                [classes.drawerClose]: !this.state.open,
                            }),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={this.handleDrawerClose}>
                                {theme.direction === "rtl" ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                            </IconButton>
                        </div>
                        <Divider/>
                        <List className={classes.avatarBox}>

                            <ListItem>
                                <ListItemAvatar style={{
                                    left: -5,
                                }}>
                                    <Avatar>E</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={this.state.userFullName}
                                    secondary={this.state.userEmail}
                                />
                                <ListItemSecondaryAction style={{
                                    position: "absolute",
                                    left: 220,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                }}>
                                    <IconButton component={Link} to="/mainView/updateUserInfo">
                                        <CreateIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>

                        </List>
                        <Divider/>
                        <MenuList>

                            <ListItem button key="tasks" component={Link} to="/mainView">
                                <ListItemIcon><EventIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Tareas"/>
                            </ListItem>

                        </MenuList>
                        <Divider/>
                        <List>

                            <ListItem button key="Logout">
                                <ListItemIcon>
                                    <LaunchIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Logout"/>
                            </ListItem>

                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        <Route path={this.props.match.url + "/newTask"}
                               render={props => <NewTask/>}/>
                        <Route exact path={this.props.match.url + "/"}
                               render={props => <Dashboard filteredUser={this.state.filteredUser}
                                                           filteredDueDate={this.state.filteredDueDate}
                                                           filteredStatus={this.state.filteredStatus}/>}/>
                        <Route path={this.props.match.url + "/updateUserInfo"}
                               render={props => <UserProfile updateData={this.updateUserData}/>}/>


                    </main>
                </div>
            </Fragment>
        );
    }


}

NavigationDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, {withTheme: true})(NavigationDrawer));