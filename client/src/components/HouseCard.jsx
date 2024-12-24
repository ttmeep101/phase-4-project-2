import React from "react";
import { Link } from "react-router-dom"; 
import { useOutletContext } from "react-router-dom";

function HouseCard({id, price, address, sqft, bedroom, bathroom, kitchen, amenity, img, pets, bookingId}) {
    const { houseImages } = useOutletContext();
    
    const firstHouseImage = houseImages && houseImages.find((houseImage) => {
        return houseImage.listing_id.toString() === id.toString();
    });

    return (
        <div className="card">
            <img className="card-image" src={firstHouseImage?.file} alt={id} />
            <div>{`$ ${price.toFixed(2)}`}</div>
            <ul className="cardlist">
                <li>{bedroom} beds | </li>
                <li>{bathroom} bath | </li>
                <li>{sqft} sqft</li>       
            </ul>
            <p>{address}</p>
            <Link to={`/listings/${id}`}><button className="submit-button">More Details</button></Link>
        </div>
    )
}

export default HouseCard;