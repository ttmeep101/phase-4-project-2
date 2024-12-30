import React from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";

function SingleImage(){
    const { houseImages } = useOutletContext();
    const { id } = useParams();
    const firstHouseImage = houseImages && houseImages.find((houseImage) => {
        return houseImage?.id?.toString() === id?.toString();
    });
    if (!firstHouseImage) {
        return (
            <div className="details">
                <h4>Failed to find that image!</h4>
            </div>    
        );
    }
    return (
        <div className="details">
            <section className="single-image-gallery">
                <img className="single-image" src={firstHouseImage?.file} alt={firstHouseImage?.id} key={firstHouseImage?.id} />
            </section>
            <div className="image-gallery-back-link-container">
                <button className="submit-button image-gallery-back-button"><Link className="image-gallery-back-link" to={`/listings/${firstHouseImage.listing_id}/images`}>Back to All Images</Link></button>
            </div>
        </div>
    );
}

export default SingleImage;