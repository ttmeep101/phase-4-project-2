import React, { useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "./UserContext";

function NavBar () {

    const { signedIn, setSignedIn } = useUser(false)
    
    useEffect(() => {
        fetch('/check')
        .then((resp) => {
            if(resp.ok) {
                setSignedIn(true)
            }
            else {
                setSignedIn(false)
            }
        })
    }, [setSignedIn])

    function logout() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then((resp) => resp.json)
        .then((data) => setSignedIn(false))
    }

    return (
        <header className="header">
            <span className="title-nav">Renter</span>
            <span className="headerlinks">
                <NavLink className="headerlink" to='/'>Home</NavLink>
                <NavLink className="headerlink" to='/listings'>Listings</NavLink>
                <NavLink className="headerlink" to='/bookings'>Bookings</NavLink>
                {!signedIn ? 
                (<NavLink className="headerlink" to='/signin'>Sign In</NavLink>) :
                (<button className='headerlink' onClick={logout}>Logout</button>)}
                
                <NavLink className="headerlink" to='/create-listing'>Create Listing</NavLink>
            </span>
        </header>
    )
}

export default NavBar;