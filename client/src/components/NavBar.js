import React from "react";
import { Link } from 'react-router-dom'

function NavBar () {
    return (
        <header>
            <span className="title">Renter</span>
            <span>
                <Link className='header-link' to='/'>Home</Link>
                <Link className='header-link' to='/listings'>Listings</Link>
                <Link className='header-link' to='/bookings'>Bookings</Link>
                <Link className='header-link' to='/signin'>Sign In</Link>
            </span>
        </header>
    )
}

export default NavBar;