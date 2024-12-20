import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import HouseCard from "./HouseCard";

function Listings() {
    const { houses } = useOutletContext();
    const [sort, setSort] = useState('asc');
    const [searchTerm, setSearchTerm ] = useState('');

    const handleSortPrice = () => {
        setSort((prevSort) => (prevSort === 'asc' ? 'desc' : 'asc'))
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredHouse = houses
        .filter((listing) => listing.address.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sort === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price
            }
        })

    return (
        <main>
            <div className="searchbar">
                <label htmlFor="search">Search Listings:</label>
                <input type="text"
                id='search'
                placeholder="search here"
                value={searchTerm}
                onChange={handleSearchChange}/>
            </div>
            <button className="submit-button" onClick={handleSortPrice}>
                Sort by Price: {sort === 'asc' ? 'High to Low' : 'Low to High'}
            </button>
            <ul className="cards">
                {filteredHouse.map((house) => (
                    <HouseCard 
                        key={house.id}
                        id={house.id}
                        price={house.price}
                        address={house.address}
                        bedroom={house.bedroom}
                        bathroom={house.bathroom}
                        kitchen={house.kitchen}
                        amenity={house.amenity}
                        img={house.img}
                        pets={house.pets}
                />
                ))}
            </ul>
        </main>
    )
}

export default Listings;