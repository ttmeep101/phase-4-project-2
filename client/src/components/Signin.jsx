import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

function Signin() {
    const {  setSignedIn, setUser } = useUser(false)
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

        // console.log("Sending the following payload to the backend:", values);

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
                    setSignedIn(true);
                    setUser(user);
                    console.log("Login Sucessful.")
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
        <div className="container">
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
            <div className="row">
                <div className="col-25">
                    <label htmlFor='username'>Username:</label>
                </div>
                <div className="col-75">
                    <input 
                        id='username'
                        name='username'
                        type='text'
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    <label htmlFor='password'>Password:</label>
                </div>
                <div className="col-75">
                    <input 
                        id='password'
                        name='password'
                        type='text'
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
                {signup ? (
                    <div>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor='name'>Name:</label>
                            </div>
                            <div className="col-75">
                                <input 
                                    id='name'
                                    name='name'
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor='age'>Age:</label>
                            </div>
                            <div className="col-75">
                                <input 
                                id='age'
                                name='age'
                                type="number"
                                placeholder="Your Age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    ) : null}
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signin