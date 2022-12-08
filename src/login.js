import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "./services/AuthService";
import { useNavigate } from 'react-router-dom';

const registerUrl = 'https://kbtgqlyyz7.execute-api.us-east-2.amazonaws.com/user/login'

const Login = () => {
    const history = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const forRegister = ()=>{
        console.log('Register...');
        history('/register');        
    }

    const submitHandler = (event) => {
        event.preventDefault();

        console.log('Login...')

        if (userName.trim() === '' || password.trim() === '') {
            setMessage('All fields are required');
            return;
        }

        const requestBody = {
            username: userName,
            password: password
        }

        axios.post(registerUrl, requestBody).then(response => {
            setUserSession(response.data.user,response.data.token);
            
            history('/');
        }).catch(error => {
            console.log('error: ', error);
            // console.log('status: ',error.response.status);
            if (error.response.status === 401 || error.response.status === 403) {
                setMessage(error.response.data.message);
                return;
            } else {
                setMessage('Back end server is down! Please try again later');
                return;
            }
        })
    }

    return (
        <div className="loginclass">
            <form onSubmit={submitHandler}>
                <h1>Login</h1>
                User name: <input type="text" value={userName} onChange={event => setUserName(event.target.value)} /><br />
                Password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /><br />
                <input type="Submit" value={"Login"} />
            </form>
            
            <form onSubmit={forRegister}>
                <input type="Submit" value={"Don't you have a account?"} />
            </form>
            
            {message && <p className="message">{message}</p>}
        </div>
    )
}

export default Login;