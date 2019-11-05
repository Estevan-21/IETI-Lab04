import React, {Component} from "react";
import Login from "./Components/Login"
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import NavigationDrawer from "./Components/NavigationDrawer";
import NewUser from "./Components/NewUser";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
        this.changeLoggedStatus = this.changeLoggedStatus.bind(this);
    }

    changeLoggedStatus() {
        if (this.state.loggedIn === true) {
            this.setState({loggedIn: false});
        } else {
            this.setState({loggedIn: true});
        }
    }

    componentWillMount() {
        if (localStorage.getItem("accessToken") != null) {
            this.setState({
                loggedIn: true,
            });
        }

    }
    render() {


        return (
            <Router>
                <div>
                    <div className="App">
                        <header className="App-header">
                            <Switch>
                                {this.state.loggedIn === true ?
                                    <>
                                        <Route path={"/mainView"}
                                               component={NavigationDrawer}/>
                                        <Route render={() => <Redirect to="/mainView"/>}/>

                                    </>
                                    :
                                    <>
                                        <Route exact path="/"
                                               render={() => <Login changeLoggedStatus={this.changeLoggedStatus}/>}/>
                                        <Route path={"/createNewUser"}
                                               component={NewUser}/>
                                        <Route render={() => <Redirect to="/"/>}/>
                                    </>}
                            </Switch>
                        </header>
                    </div>

                </div>
            </Router>

        );
    }
}

export default App;
