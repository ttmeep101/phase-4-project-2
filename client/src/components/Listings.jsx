import React, { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import HouseCard from "./HouseCard";
import { useUser } from "./UserContext";

function Listings({isMyListings = false}) {
    const { houses } = useOutletContext();
    const { user } = useUser();
    const [sort, setSort] = useState('asc');
    const [searchTerm, setSearchTerm ] = useState('');

    useEffect(() => {
        setSearchTerm('');
    }, [isMyListings]);

    const handleSortPrice = () => {
        setSort((prevSort) => (prevSort === 'asc' ? 'desc' : 'asc'))
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredHouse = houses
        .filter((listing) => listing?.address?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
        .filter((listing) => isMyListings ? listing?.user_id?.toString() === user?.id?.toString() : true)
        .sort((a, b) => {
            if (sort === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price
            }
        });

    return (
        <main>
            <h2>{isMyListings ? 'My Listings' : 'All Listings'}</h2>
            <div className="searchbar">
                <label htmlFor="search">Search Listings:</label>
                <input type="text"
                id='search'
                placeholder="search here"
                value={searchTerm}
                onChange={handleSearchChange}/>
                <button className="submit-button" onClick={handleSortPrice}>
                    Sort by Price: {sort === 'asc' ? 'High to Low' : 'Low to High'}
                </button>
            </div>
            <ul className="cards">
                {filteredHouse.length <= 0 ? (
                    <div>
                        <p>No listings found</p>
                        <Link to='/create-listing'><button className="submit-button">Create A listing</button></Link>
                    </div>
                ) : (
                    filteredHouse.map((house) => (
                        <HouseCard 
                            key={house.id}
                            id={house.id}
                            price={house.price}
                            address={house.address}
                            sqft={house.sqft}
                            bedroom={house.bedroom}
                            bathroom={house.bathroom}
                            kitchen={house.kitchen}
                            amenity={house.amenity}
                            img={house.img}
                            pets={house.pets}
                            about={house.about}
                            type={house.type}
                            parking={house.parking}
                            heat_water={house.heat_water}
                            security={house.security}
                            ownerUser={house.user_id}
                        />
                    ))
                )}
            </ul>
        </main>
    );
}

export default Listings;