import React from 'react';
import classes from './App.module.css';
import TodoApp from "./components/TodoApp/TodoApp";

function App() {
    return (
        <React.Fragment>
            <TodoApp />
            <footer className={classes.info}>
                <p>Double-click to edit a todo</p>
                <p>Created by <a href="http://github.com/remojansen/">Remo H. Jansen</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        </React.Fragment>
    );
}

export default App;
