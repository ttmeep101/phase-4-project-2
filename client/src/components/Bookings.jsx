import React, { useEffect, useState } from "react";
import HouseCard from "./HouseCard";
import { useOutletContext, Link } from "react-router-dom";
import { useUser } from './UserContext'

function Bookings () {
    const { bookings } = useOutletContext();
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

    return (
        <div>
            {!signedIn ? 
                (<div>
                    <h2>Please sign in to use this page</h2>
                    <Link to='/signin'>Login</Link>
                </div>) :
                (<div>
                    <h2>My Bookings</h2>
                    <ul className="cards">
                        {bookings.map((house) => (
                            <HouseCard 
                                key={house.listing.id}
                                id={house.listing.id}
                                price={house.listing.price}
                                address={house.listing.address}
                                sqft={house.listing.sqft}
                                bedroom={house.listing.bedroom}
                                bathroom={house.listing.bathroom}
                                kitchen={house.listing.kitchen}
                                amenity={house.listing.amenity}
                                img={house.listing.img}
                                pets={house.listing.pets}
                        />
                        ))}
                    </ul>
                </div>)}
        </div>
    )
}

export default Bookings