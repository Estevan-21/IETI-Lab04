import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import {Link, withRouter} from "react-router-dom";
import TextField from "@material-ui/core/TextField";


const styles = theme => ({
    main: {
        width: "auto",
        display: "block", // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    bigAvatar: {
        margin: theme.spacing.unit,
        width: 100,
        height: 100,
    },
});

class NewUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: "", email: "", password: "", confirmPassword: ""};
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <main className={classes.main}>
                    <CssBaseline/>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Create an account
                        </Typography>
                        <Avatar src={window.location.origin + "/images/task.png"} className={classes.bigAvatar}/>
                        <form className={classes.form} onSubmit={this.handleSubmit}>
                            <TextField required label="Full name" fullWidth
                                       onChange={event => this.setState({name: event.target.value})}/>
                            <br/>
                            <br/>
                            <TextField required label="Email" fullWidth
                                       onChange={event => this.setState({email: event.target.value})}/>
                            <br/>
                            <br/>

                            <TextField required label="Password" type="password" fullWidth
                                       onChange={event => this.setState({password: event.target.value})}/>
                            <br/>
                            <br/>
                            <TextField required label="Confirm password" type="password" fullWidth
                                       onChange={event => this.setState({confirmPassword: event.target.value})}/>
                            <br/><br/>
                            <Button type="submit" color="primary" variant="contained" fullWidth>
                                Create account
                            </Button>
                            <br/>
                            <br/>
                            <Button color="primary" variant="contained" fullWidth component={Link} to={"/"}>
                                Back
                            </Button>
                        </form>
                    </Paper>
                </main>
            </div>
        );

    }


    handleSubmit(e) {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            window.alert("Las constraseñas no coinciden");
        } else {
            axios.post('https://task-panner-api.herokuapp.com/user', {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            }).then((response) => {
                alert("New user succesfully registered!");
                this.props.history.push("/");

            }).catch(function (error) {
                console.log(error)
            });
        }


    }

}

export default withRouter(withStyles(styles)(NewUser));