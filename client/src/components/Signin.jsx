import React, { useState } from "react";
import NavBar from "./NavBar";

function Signin() {
    const [curUser, setUser] = useState(null)
    const [signup, setSignup] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')
    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const values = {
            username: username,
            password: password,
            age: age,
            name: name
        }

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
                })
            } else {
                console.log('login failed')
            }
        })
    }

    return (
        <div>
            <NavBar />
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
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signin