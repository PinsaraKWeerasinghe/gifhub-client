import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const registerUrl = 'https://kbtgqlyyz7.execute-api.us-east-2.amazonaws.com/user/register'

const Register = () => {
    const history = useNavigate();

    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const forLogin=()=>{
        console.log('Login...');
        history('/login');
    }

    const submitHandler = (event) => {

        event.preventDefault();

        console.log('submit pressed!')

        if (userName.trim() === '' || email.trim() === '' || name.trim() === '' || password.trim() === '') {
            setMessage('All fields are required');
            return;
        }

        const requestBody = {
            username: userName,
            email: email,
            name: name,
            password: password
        }

        axios.post(registerUrl, requestBody).then(response => {
            setMessage('Registration Successful!');
            history('/login');
        }).catch(error => {
            if (error.response.status === 401 || error.response.status === 403) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Back end server is down! Please try again later');
            }
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h1>Register</h1>
                User name: <input type="text" value={userName} onChange={event => setUserName(event.target.value)} /><br />
                Name: <input type="text" value={name} onChange={event => setName(event.target.value)} /><br />
                Email: <input type="text" value={email} onChange={event => setEmail(event.target.value)} /><br />
                Password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /><br />
                <input type="Submit" value={"Register"} />
            </form>
            <form onSubmit={forLogin}>
                <input type="Submit" value={"Do you have a account?"} />
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    )
}

export default Register;