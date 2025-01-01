import React, { useEffect } from "react";
import HouseCard from "./HouseCard";
import { useOutletContext, Link } from "react-router-dom";
import { useUser } from './UserContext'

function Bookings () {
    const { bookings, setBookings } = useOutletContext();
    const { signedIn, setSignedIn, user } = useUser(false);

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
    }, [setSignedIn]);

    useEffect(() => {    
    if (signedIn) {
        fetch(`http://localhost:5555/users-bookings/${user?.id}`)
        .then((resp) => resp.json())
        .then((data) => setBookings(data))
        .catch((error) => console.error("Error fetching bookings", error));
    }
    }, [setBookings, signedIn, user?.id]);

    return (
        <div>
            {!signedIn ? 
                (<div>
                    <section>
                        <h2>Please sign in to see all your bookings</h2>
                        <Link to='/signin'><button className="submit-button">Sign In</button></Link>
                    </section>
                </div>) :
                (<div>
                    <h2>My Bookings</h2>
                    <ul className="cards">
                        {bookings?.length <= 0 ? (
                            <div>No bookings found</div>
                        ) : (
                            bookings.map((house) => (
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
                                    bookingDateTime={house.date_time}
                            />
                        )))}
                    </ul>
                </div>)}
        </div>
    )
}

export default Bookings