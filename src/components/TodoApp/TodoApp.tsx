import React, {useRef, useState} from 'react';
import classes from "./TodoApp.module.css";
import TodoItem from "../TodoItem/TodoItem";
import Footer from "../Footer/Footer";
import {getTodoItemsFromLocalStorage} from "./getTodoItemsFromLocalStorage";
import Signin from "../Signin/Signin";
import Register from "../Register/Register";
import {Route, BrowserRouter as Router} from 'react-router-dom';


export interface T {
    name: string,
    completed: boolean,
    id: string,
    dbClick: boolean
}

const TodoApp = () => {
    const [todoList, setTodoList] = useState<T[]>(getTodoItemsFromLocalStorage("todo") || []);
    const [labelChecked, setLabelChecked] = useState<boolean>(false);
    const [leftItemsNumber, setLeftItemNumber] = useState<number>(countLeftItems());
    const [nowShowing, setNowShowing] = useState<string>(getNowShowing());
    const [editText, setEditText] = useState<string>("");
    const [dbClick, setDbClick] = useState<boolean>(false);
    const [signin, setSignin] = useState<boolean>(false);
    const [register, setRegister] = useState<boolean>(false);
    const todoListRef = useRef<HTMLUListElement>(null);

    const destroyHandler = (todo: T) => {
        let index = todoList.indexOf(todo);
        let newTodoList: T[] = [...todoList.slice(0, index), ...todoList.slice(index + 1)];
        setTodoList(newTodoList);
        localStorage.setItem("todo", JSON.stringify(newTodoList));
        if (!todo.completed) {
            if (leftItemsNumber === 1) {
                setLabelChecked(!labelChecked);
            }
            setLeftItemNumber(leftItemsNumber - 1);
        }
    }

    const completedHandler = (todo: T) => {
        if (todo.completed) {
            setLeftItemNumber(leftItemsNumber + 1);
            if (leftItemsNumber === 0) {
                setLabelChecked(!labelChecked);
            }
        } else {
            setLeftItemNumber(leftItemsNumber - 1);
            if (leftItemsNumber === 1) {
                setLabelChecked(!labelChecked);
            }
        }
        todo.completed = !todo.completed;
        localStorage.setItem("todo", JSON.stringify(todoList));
    }

    const clearButtonHandler = () => {
        let newTodoList: T[] = [];
        for (let i = 0; i < todoList.length; i++) {
            if (!todoList[i].completed) {
                newTodoList.push(todoList[i]);
            }
        }
        setTodoList(newTodoList);
        localStorage.setItem("todo", JSON.stringify(newTodoList));
    }

    const showingHandler = (event: MouseEvent) => {
        let a = event.target as HTMLElement;
        if (a.innerText === "All") {
            setNowShowing("all");
        } else if (a.innerText === "Active") {
            setNowShowing("active");
        } else if (a.innerText === "Completed") {
            setNowShowing("completed");
        }
    }

    const editHandler = (todo: T) => {
        for (let i = 0; i < todoList.length; i++) {
            todoList[i].dbClick = false;
        }
        todo.dbClick = true;
        setEditText(todo.name);
        setDbClick(true);
    }

    const blurHandler = (todo: T) => {
        todo.dbClick = false;
        todo.name = editText;
        setDbClick(false);
    }

    const changeHandler = (event: React.FormEvent) => {
        let input: any = event.target;
        setEditText(input.value);
    }

    const editKeyDownHandler = (event: React.KeyboardEvent, todo: T) => {
        if (event.key === "Enter") {
            todo.dbClick = false;
            todo.name = editText;
            setDbClick(false);
            localStorage.setItem("todo", JSON.stringify(todoList));
        }
    }

    const SigninHandler = () => {
        setSignin(!signin);
    }

    const RegisterHandler = () => {
        setRegister(!register);
    }

    function uuid(): string {
        let i, random;
        let uuid = '';

        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            // eslint-disable-next-line no-mixed-operators
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
                .toString(16);
        }
        return uuid;
    }

    function countLeftItems() {
        let left = 0;
        for (let i = 0; i < todoList.length; i++) {
            if (!todoList[i].completed) {
                left++;
            }
        }
        return left;
    }

    function getNowShowing() {
        if (!window.location.hash.split("/")[1]) {
            return "all";
        }
        return window.location.hash.split("/")[1];
    }

    let main;
    let todoItems = todoList.map((todo) => {
        if ((nowShowing === "active" && !todo.completed) || (nowShowing === "completed" && todo.completed) || nowShowing === "all") {
            return (<TodoItem key={todo.id} todo={todo} editText={editText} destroyHandler={destroyHandler}
                              completedHandler={completedHandler} editHandler={editHandler} blurHandler={blurHandler}
                              changeHandler={changeHandler} editKeyDownHandler={editKeyDownHandler}/>);
        }
    })
    let footer;

    function inputKeyDownHandler(event: React.KeyboardEvent) {
        if (event.key !== "Enter") {
            return;
        }
        const target = event.target as HTMLTextAreaElement;
        if (target.value === "") {
            return;
        }
        let newTodoList: T[] = [...todoList, {name: target.value, completed: false, id: uuid(), dbClick: false}];
        localStorage.setItem("todo", JSON.stringify(newTodoList));
        setTodoList(newTodoList);
        setLeftItemNumber(leftItemsNumber + 1);
        target.value = "";
    }

    function labelChangeHandler() {
        setLabelChecked(!labelChecked);
        if (todoListRef.current) {
            let todoListUl = todoListRef.current;
            if (leftItemsNumber === 0) {
                for (let i = 0; i < todoList.length; i++) {
                    todoList[i].completed = false;
                }
                setLeftItemNumber(todoList.length);
            } else {
                for (let i = 0; i < todoList.length; i++) {
                    todoList[i].completed = true;
                }
                setLeftItemNumber(0);
            }
        }
        localStorage.setItem("todo", JSON.stringify(todoList));
    }

    if (todoList.length) {
        main = (
            <section>
                <input
                    id="toggle-all"
                    className={classes.toggleAll}
                    type="checkbox"
                    onChange={labelChangeHandler}
                    checked={labelChecked}
                />
                <label htmlFor="toggle-all" className={classes.toggleAllLabel}/>
                <ul className={classes.todoList} ref={todoListRef}>
                    {todoItems}
                </ul>
            </section>
        )
        footer = (
            <Footer leftItemsNumber={leftItemsNumber} totalNumber={todoList.length} nowShowing={nowShowing}
                    clearButtonHandler={clearButtonHandler} showingHandler={showingHandler}/>
        )
    }

    return (
        <React.Fragment>
            <section className={classes.todoapp}>
                <header className={classes.header}>
                    <h1>todos</h1>
                    <input className={classes.newTodo} placeholder="What needs to be done?"
                           onKeyDown={inputKeyDownHandler}/>
                </header>

                {main}
                {footer}
            </section>
            <div className={classes.info}>
                <p>Double-click to edit a todo</p>
                <p>Created by <a href="http://github.com/remojansen/">Remo H. Jansen</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </div>
        </React.Fragment>

    );
}

export default TodoApp;
