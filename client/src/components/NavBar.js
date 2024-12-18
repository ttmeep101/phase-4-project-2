import React from "react";
import { NavLink } from "react-router-dom";

function NavBar () {
    return (
        <nav className="navbar" role="navigation">
            <NavLink className='header-link' to='/'>Home</NavLink>
            <NavLink className='header-link' to='/listings'>Listings</NavLink>
            <NavLink className='header-link' to='/bookings'>Bookings</NavLink>
            <NavLink className='header-link' to='/signin'>Sign In</NavLink>
        </nav>
    )
}

export default NavBar;