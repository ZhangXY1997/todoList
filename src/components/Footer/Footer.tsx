import React from "react";
import classes from "./Footer.module.css";

interface childProps {
    leftItemsNumber: number,
    totalNumber: number,
    nowShowing: string,
    clearButtonHandler: Function,
    showingHandler: Function
}

const Footer: React.FC<childProps> = ({leftItemsNumber, totalNumber, nowShowing, clearButtonHandler, showingHandler}) => {
    let clearButton;

    if (leftItemsNumber < totalNumber) {
        clearButton = (
            <button className={classes.clearCompleted} onClick={() => clearButtonHandler()}>
                Clear completed
            </button>
        );
    }

    return (
        <footer className={classes.footer}>
            <span className={classes.todoCount}>{leftItemsNumber} items left</span>
            <ul className={classes.filters} onClick={(e) => showingHandler(e)}>
                <li>
                    <a href="#/" className={nowShowing === "all" ? classes.selected : ""}>All</a>
                </li>
                <li>
                    <a href="#/active" className={nowShowing === "active" ? classes.selected : ""}>Active</a>
                </li>
                <li>
                    <a href="#/completed" className={nowShowing === "completed" ? classes.selected : ""}>Completed</a>
                </li>
            </ul>
            {clearButton}
        </footer>
    );
}

export default Footer;
