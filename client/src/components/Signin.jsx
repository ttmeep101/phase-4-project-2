import React, { useState } from "react";
import NavBar from "./NavBar";

function Signin() {
    const [curUser, setUser] = useState(null)
    const [signup, setSignup] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')
    const [name, setName] = useState('')

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
                    setUser(user)
                    console.log("Login Sucessful. Current User: ",user)
                })
            } else {
                resp.json().then((data) => {
                    console.log('Error:', data.error)
                })
            }
        })
    }

    return (
        <div>
            <NavBar />
            {signup ? (
                <>
                    <button onClick={() => setSignup(false)}>I already have an account</button>
                    <h1>Register New User</h1>
                </>
            ) : (
                <>
                    <button onClick={() => setSignup(true)}>I want to register an account</button>
                    <h1>Login</h1>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signin