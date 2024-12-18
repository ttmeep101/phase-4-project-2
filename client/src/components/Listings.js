import React from "react";
// import HouseCard 

function Listings() {
    return (
        <main>
            <ul>
                <HouseCard 
                    key={id}
                    id={id}
                    price={price}
                    address={address}
                    bedroom={bedroom}
                    bathroom={bathroom}
                    kitchen={kitchen}
                    amenities={amenities}
                />
            </ul>
        </main>
    )
}

export default Listings;