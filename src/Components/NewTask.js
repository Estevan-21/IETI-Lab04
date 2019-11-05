import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {withRouter} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import DoneIcon from "@material-ui/icons/Done";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import Fab from "@material-ui/core/Fab";
import axios from "axios";

const styles = theme => ({
    root: {
        flexGrow: 1,
        textAlign: "center",

    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: "center",
        color: theme.palette.text.secondary,
    }, container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "40vw",

    },
    menu: {
        width: 200,
    },
    absolute: {
        position: "absolute",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
});
const status = [
    {
        value: "Ready",
        label: "Ready",
    },
    {
        value: "In progress",
        label: "In progress",
    },
    {
        value: "Done",
        label: "Done",
    },
];
const priority = [
    {
        value: 1,
        label: "Priority 1",
    },
    {
        value: 2,
        label: "Priority 2",
    },
    {
        value: 3,
        label: "Priority 3",
    },
    {
        value: 4,
        label: "Priority 4",
    },
    {
        value: 5,
        label: "Priority 5",
    },
    {
        value: 6,
        label: "Priority 6",
    },
    {
        value: 7,
        label: "Priority 8",
    },
    {
        value: 9,
        label: "Priority 9",
    },
    {
        value: 10,
        label: "Priority 10",
    },

];

class NewTask extends React.Component {

    constructor(props) {
        super(props);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleAddButton = this.handleAddButton.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleResponsibleChange = this.handleResponsibleChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.state = {
            dueDate: moment(),
            description: "",
            status: "",
            responsible: {name: "", email: "", password: null},
            priority: "",
            users: [],

        };

    }

    componentWillMount() {

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("accessToken");
        const users = localStorage.getItem("users");
        if (users) {
            const value = JSON.parse(users);
            this.setState({users: value})
        } else {
            axios.get('https://task-panner-api.herokuapp.com/api/users').then((res) => {
                this.setState({users: res.data});
                localStorage.setItem("users", JSON.stringify(res.data))
            }).catch(function (error) {
                console.log(error);
            });
        }


    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant="h2">Nueva Tarea</Typography>
                    </Grid>


                    <form className={classes.container} noValidate autoComplete="off">
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="Description"
                                label="Descripción"
                                onChange={this.handleDescriptionChange}
                                value={this.state.description}
                                className={classes.textField}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                id="responsible"
                                label="Responsable"
                                onChange={this.handleResponsibleChange}
                                className={classes.textField}
                                value={this.state.responsible}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                helperText="Seleccione un responsable de tarea"
                                margin="normal"
                            >
                                {this.state.users.map(user => (
                                    <MenuItem key={user.email} value={user}>
                                        {user.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="standard-select"
                                select
                                label="Prioridad"
                                className={classes.textField}
                                value={this.state.priority}
                                onChange={this.handlePriorityChange}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                helperText="Seleccione prioridad de la tarea"
                                margin="normal"
                            >
                                {priority.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="standard-select"
                                select
                                label="Estado"
                                className={classes.textField}
                                value={this.state.status}
                                onChange={this.handleStatusChange}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                helperText="Seleccione estado de la tarea"
                                margin="normal"
                            >
                                {status.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    margin="normal"
                                    className={classes.textField}
                                    label="Fecha de vencimiento"
                                    id="due-date"
                                    value={this.state.dueDate}
                                    onChange={this.handleDateChange}>
                                </DatePicker>
                            </MuiPickersUtilsProvider>

                        </Grid>
                    </form>

                </Grid>
                <Tooltip title="Add" aria-label="Add">
                    <Fab color="primary" onClick={this.handleAddButton} className={classes.absolute}>
                        <DoneIcon/>
                    </Fab>
                </Tooltip>
            </div>
        );
    }

    handleDescriptionChange(ev) {
        this.setState({description: ev.target.value});
    }

    handleResponsibleChange(ev) {
        this.setState({responsible: ev.target.value});
    }

    handleStatusChange(ev) {
        this.setState({status: ev.target.value});
    }

    handlePriorityChange(ev) {
        this.setState({priority: ev.target.value});
    }

    handleAddButton() {
        const newTask = {
            description: this.state.description,
            responsible: this.state.responsible,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate
        };
        axios.post('https://task-panner-api.herokuapp.com/api/tasks', {
            description: this.state.description,
            responsible: this.state.responsible,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate
        }).then((response) => {
            const data = localStorage.getItem("tasks");
            const tasks = JSON.parse(data);
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            this.props.history.push("/mainView");
        }).catch(function (error) {
            alert("An error has ocurred!")
        });

    }

    handleDateChange(date) {
        this.setState({
            dueDate: moment(date)
        });
    }
}

NewTask.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(NewTask));