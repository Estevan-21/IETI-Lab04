import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',

    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "40vw",

    },


});

class UserDataForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFullNameChange = this.handleFullNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);

    }


    render() {
        const {classes} = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Grid item xs={12}>
                    <TextField
                        required
                        id="fullName"
                        label="Full Name"
                        onChange={this.handleFullNameChange}
                        defaultValue={this.props.userState.fullName}
                        className={classes.textField}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="email"
                        label="E-Mail"
                        defaultValue={this.props.userState.email}
                        onChange={this.handleEmailChange}
                        className={classes.textField}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        type="password"
                        id="password"
                        label="Password"
                        defaultValue=""
                        onChange={this.handlePasswordChange}
                        className={classes.textField}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        type="password"
                        id="confirmPassword"
                        label="Confirm Password"
                        defaultValue=""
                        onChange={this.handleConfirmPasswordChange}
                        className={classes.textField}
                        margin="normal"
                    />
                </Grid>

            </form>


        );
    }

    handleConfirmPasswordChange(ev) {
        this.props.userState.password = ev.target.value;
    }

    handlePasswordChange(ev) {
        this.props.userState.confirmedPassword = ev.target.value;
    }

    handleFullNameChange(ev) {
        this.props.userState.fullName = ev.target.value;
    }

    handleEmailChange(ev) {
        this.props.userState.email = ev.target.value;
    }


}

UserDataForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserDataForm);