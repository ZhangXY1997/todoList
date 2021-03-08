import React, {useState} from 'react';
import classes from './App.module.css';
import TodoApp from "./components/TodoApp/TodoApp";
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import {Link as RouterLink} from 'react-router-dom';


function App() {
    const [userEmail, setUserEmail] = useState<string>("");

    const userEmailHandler = (email: string) => {
        setUserEmail(email);
    }

    return (
        <React.Fragment>
            <Router>
                {
                    userEmail ?
                        <h6 className={classes.email}>{userEmail}</h6>
                        :
                        <div>
                            <button className={classes.signin}><RouterLink to="/signin">Singin</RouterLink></button>
                            <button className={classes.register}><RouterLink to="/register">Register</RouterLink>
                            </button>
                        </div>
                }
                <div className="App-content">
                    <Route exact path="/" component={TodoApp}/>
                    <Route exact path="/signin" component={Signin}/>
                    <Route exact path="/register" render={props => <Register userEmailHandler = {userEmailHandler} />} />
                </div>
            </Router>
        </React.Fragment>
    );
}

export default App;
