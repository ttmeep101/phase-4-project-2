import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

function Signin() {
    const { signedIn, setSignedIn } = useUser(false)
    const [signup, setSignup] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const values = {
            username: username,
            password: password
        }

        if(signup) {
            values.age = age
            values.name = name
        }

        setUsername('')
        setPassword('')
        setAge('')
        setName('')

        console.log("Sending the following payload to the backend:", values);

        const endpoint = signup ? '/signup' : '/login'

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => {
                    setSignedIn(true)
                    console.log("Login Sucessful. Current User: ",user)
                    if(signup) {
                        alert("Account created successfully!")
                        navigate('/')
                    } else {
                        alert("Login Successful!")
                        navigate('/')
                    }
                })
            } else {
                resp.json().then((data) => {
                    console.log('Error:', data.error)
                    alert(`Error: ${data.error}`)
                })
            }
        })
    }

    return (
        <div>
            {signup ? (
                <>
                    <button className="submit-button" onClick={() => {
                        setSignup(false)
                        setUsername('')
                        setPassword('')
                        setAge('')
                        setName('')
                        }}>I already have an account</button>
                    <h2>Register New User</h2>
                </>
            ) : (
                <>
                    <button className="submit-button" onClick={() => {
                        setSignup(true)
                        setUsername('')
                        setPassword('')
                        setAge('')
                        setName('')
                        }}>I want to register an account</button>
                    <h2>Login</h2>
                </>
            )}
            <form className="signin" onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
                <input 
                    id='username'
                    name='username'
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor='password'>Password:</label>
                <input 
                    id='password'
                    name='password'
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {signup ? (
                    <>
                        <label htmlFor='age'>Age:</label>
                        <input 
                        id='age'
                        name='age'
                        placeholder="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        />
                        <label htmlFor='name'>Name:</label>
                        <input 
                            id='name'
                            name='name'
                            placeholder="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </>) : null}
                <button className="submit-button" type="submit" disabled={!username || !password || (signup && (!age || !name))}>Submit</button>
            </form>
        </div>
    )
}

export default Signin