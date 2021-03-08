import React, {useState} from "react";
import classes from "./Register.module.css";
import {Link as RouterLink} from "react-router-dom";

interface childProps {
    userEmailHandler: Function
}

const Register: React.FC<childProps> = ({userEmailHandler}) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onEmailChange = (event: React.FormEvent) => {
        const target = event.target as HTMLTextAreaElement;
        if (target.value === "") {
            return;
        }
        setEmail(target.value)
    }

    const onPasswordChange = (event: React.FormEvent) => {
        const target = event.target as HTMLTextAreaElement;
        if (target.value === "") {
            return;
        }
        setPassword(target.value);
    }

    const onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(console.log);

        userEmailHandler(email);
    }

    return (
        <React.Fragment>
            <button><RouterLink to="/">back</RouterLink></button>
            <div className={classes.register}>
                <div className={classes.email}>
                    <label htmlFor="email-address">Email</label>
                    <input type="email" name="email-address" id="email-address" onChange={(e) => onEmailChange(e)}
                    />
                </div>
                <div className={classes.password}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={(e) => onPasswordChange(e)}
                    />
                </div>
                <div className={classes.submit}>
                    <RouterLink to="/"><input onClick={onSubmitRegister} type="submit" value="Register"/></RouterLink>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Register;
