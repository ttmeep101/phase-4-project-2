import React from "react";
import { Link } from "react-router-dom"; 

function HouseCard({id, price, address, sqft, bedroom, bathroom, kitchen, amenity, img, pets, bookingId}) {
   
    return (
        <ul className="card">
            <img src={img} alt={address} />
            <h4>{`$ ${price}`}</h4>
            <p>{address}</p>
            <Link to={`/listings/${id}`}><button>More Details</button></Link>
        </ul>
    )
}

export default HouseCard;