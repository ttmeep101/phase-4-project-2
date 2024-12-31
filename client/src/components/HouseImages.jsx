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
            <section className="image-gallery">
                {houseImgs.map(houseImage => (
                    <div className="gallery-image-container" key={houseImage.id}>
                        <Link className="gallery-image-link" to={`/images/${houseImage?.id}`}>
                            <img className="gallery-image" src={houseImage?.file} alt={houseImage?.id} key={houseImage?.id} />
                        </Link>
                    </div>
                ))}
            </section>
            <div className="image-gallery-back-link-container">
                <button className="submit-button image-gallery-back-button"><Link className="image-gallery-back-link" to={`/listings/${id}`}>Back to Listing Details</Link></button>
            </div>
        </div>
    );
}

export default HouseImages;