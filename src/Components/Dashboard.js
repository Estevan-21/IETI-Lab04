import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";


const styles = theme => ({

    absolute: {
        margin: 0,
        top: "auto",
        left: "auto",
        position: "fixed",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    pos: {
        marginBottom: 12,
    },

});

class Dashboard extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        }
    }

    componentWillMount() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("accessToken");
        const cache = localStorage.getItem("tasks");
        if (cache) {
            this.setState({tasks: JSON.parse(cache)});
        } else {
            axios.get('https://task-panner-api.herokuapp.com/api/tasks').then((res) => {
                this.setState({tasks: res.data});
                localStorage.setItem("tasks", JSON.stringify(res.data));
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
    render() {
        const {classes} = this.props;
        const taskList = this.state.tasks.filter(task => (this.props.filteredUser === task.responsible.email || this.props.filteredUser === "Select")
            && (this.props.filteredDueDate === null || this.props.filteredDueDate === task.dueDate)
            && (this.props.filteredStatus === task.status || this.props.filteredStatus === "Select")).map((task, i) => {
            return (

                <Grid key={i + 1} container spacing={24}>
                    <Grid key={i} item xs={12}>
                        <Card>
                            <CardContent className={classes.card}>
                                <Typography variant="h5" component="h2">
                                    {task.description}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {task.status} - {task.dueDate}
                                </Typography>
                                <Typography component="p">
                                    {task.responsible.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            );
        });
        return (
            <>

                {taskList}
                <Tooltip title="Add" aria-label="Add">
                    <Fab color="gray" component={Link} to={"/mainView/newTask"} className={classes.absolute}>
                        <AddIcon/>
                    </Fab>
                </Tooltip>
            </>
        );
    }

}


export default withStyles(styles)(Dashboard);