import React, { useState } from "react";
import HouseCard from "./HouseCard";
import { useOutletContext, useParams} from "react-router-dom";

function Bookings () {
    const { bookings } = useOutletContext();

    return (
        <div>
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
        </div>
    )
}

export default Bookings