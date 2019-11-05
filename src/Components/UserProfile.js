import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import {withRouter} from "react-router-dom";
import UserDataForm from "./UserDataFrom";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',

    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }, container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    menu: {
        width: 200,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
        fontSize: 20,
    },
    button: {
        margin: theme.spacing.unit,
        width: 200
    },


});

class NewTask extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            password: "",
            confirmedPassword: "",
            fullName: "",
            email: ""
        }

    }


    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
            </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.updateData(this.state);
        this.props.history.push('/mainView/');
    }


}

NewTask.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(NewTask));