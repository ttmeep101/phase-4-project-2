import React from "react";
import { Link } from "react-router-dom"; 
import { useOutletContext } from "react-router-dom";

function HouseCard({id, price, address, sqft, bedroom, bathroom, kitchen, amenity, img, pets, bookingId}) {
    const { houseImages } = useOutletContext();
    
    const firstHouseImage = houseImages && houseImages.find((houseImage) => {
        return houseImage.listing_id?.toString() === id?.toString();
    });

    return (
        <Link className="card-link" to={`/listings/${id}`}>
            <div className="card">
                <img className="card-image" src={firstHouseImage?.file} alt={id} />
                <div>{`$ ${price.toFixed(2)}`}</div>
                <ul className="cardlist">
                    <li>{bedroom} beds | </li>
                    <li>{bathroom} bath | </li>
                    <li>{sqft} sqft</li>       
                </ul>
                <p>{address}</p>
                <button className="submit-button">More Details</button>
            </div>
        </Link>
    )
}

export default HouseCard;