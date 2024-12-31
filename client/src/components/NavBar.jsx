import React, { useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "./UserContext";

function NavBar () {

    const { signedIn, setSignedIn, setUser } = useUser();
    
    useEffect(() => {
        fetch('/check')
        .then((resp) => resp.json())
        .then((data) => {
            if(data?.id) {
                setSignedIn(true);
                setUser(data);
            }
            else {
                setSignedIn(false);
                setUser(null);
            }
        })
    }, [setSignedIn, setUser])

    function logout(e) {
        e.preventDefault();
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(() => {})
        .then(() => {
            setSignedIn(false);
            setUser(null);
        })
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
                (<NavLink className='headerlink' onClick={logout}>Logout</NavLink>)}
                
                <NavLink className="headerlink" to='/create-listing'>Create Listing</NavLink>
            </span>
        </header>
    )
}

export default NavBar;