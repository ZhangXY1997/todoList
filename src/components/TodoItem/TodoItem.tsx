import React, {useRef} from "react";
import classes from "./TodoItem.module.css";
import CloseIcon from '@material-ui/icons/Close';

interface childProps {
    todo: any,
    editText: string,
    destroyHandler: Function,
    completedHandler: Function,
    editHandler: Function,
    blurHandler: Function,
    changeHandler: Function,
    editKeyDownHandler: Function
}

const TodoItem: React.FC<childProps> = ({todo, editText, destroyHandler, completedHandler, editHandler, blurHandler, changeHandler, editKeyDownHandler}) => {
    const editRef = useRef<HTMLInputElement>(null);

    return (
        <li className={todo.dbClick ? classes.todoitem + " " + classes.editing : classes.todoitem}>
            <div className={classes.view}>
                <input type="checkbox" className={classes.toggle} onClick={() => completedHandler(todo)}
                       checked={todo.completed}/>
                <label onDoubleClick={() => editHandler(todo)}>{todo.name}</label>
                <button className={classes.destroy} onClick={() => destroyHandler(todo)}><CloseIcon/></button>
            </div>
            <input className={classes.edit} ref={editRef} value={editText} onBlur={() => blurHandler(todo)}
                   onChange={(e) => changeHandler(e)} onKeyDown={(e) => editKeyDownHandler(e, todo)}/>
        </li>
    );
}

export default TodoItem;
