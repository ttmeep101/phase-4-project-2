import React from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";

function HouseImages(){
    const { houseImages } = useOutletContext();
    const { id } = useParams();
    const houseImgs = houseImages && houseImages.filter((houseImage) => {
        return houseImage?.listing_id?.toString() === id?.toString();
    });

    if (!houseImgs) {
        return (
            <div className="details">
                <h4>Failed to find that house!</h4>
            </div>    
        );
    }
    return (
        <div className="details">
            <section>
                {houseImgs.map(houseImage => (
                    <img className="detail-image" src={houseImage?.file} alt={houseImage?.id} key={houseImage?.id} />
                ))}

                <Link to={`/listings/${id}`}><button className="submit-button">Back to Listing</button></Link>
            </section>
        </div>
    );
}

export default HouseImages;