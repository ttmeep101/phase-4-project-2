import React from "react";
import { NavLink } from "react-router-dom";

function NavBar () {
    return (
        <header className="header">
            <span className="title-nav">Renter</span>
            <span className="headerlinks">
                <NavLink className="headerlink" to='/'>Home</NavLink>
                <NavLink className="headerlink" to='/listings'>Listings</NavLink>
                <NavLink className="headerlink" to='/bookings'>Bookings</NavLink>
                <NavLink className="headerlink" to='/signin'>Sign In</NavLink>
                <NavLink className="headerlink" to='/create-listing'>Create Listing</NavLink>
            </span>
        </header>
    )
}

export default NavBar;