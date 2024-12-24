import React, { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";

function NewListing() {
    const { houses, setHouses } = useOutletContext();

    const addNewListing = (newListing) => {
        fetch("/listings", {
          method: "POST",
          headers: {
            "Content-Type": "Application/JSON",
          },
          body: JSON.stringify(newListing),
        })
          .then((response) => response.json())
          .then((house) => {
            setHouses([...houses, house]);
          })
          .catch((error) => console.error("Error adding new listing", error));
      };

    
      const [ formData, setFormData ] = useState({
        price: '',
        address: '',
        sqft: '',
        bedroom: '',
        bathroom: '',
        kitchen: '',
        amenity: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        pets: false,
      });
    
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (name === 'pets') {
            console.log('greppable', name, value, type, e.target.checked);
            setFormData({
                ...formData,
                [name]: !!e.target.checked
            });
        } else if (type === 'number') {
            setFormData({
                ...formData,
                [name]: parseInt(value, 10)
            }); 
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewListing(formData);
        setFormData({
            price: '',
            address: '',
            sqft: '',
            bedroom: '',
            bathroom: '',
            kitchen: '',
            amenity: '',
            pets: true,
        });
    };

    return (
        <div className="addlisting">
            <h2>Add a new listing:</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type='number'
                    name='price'
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='address'
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                />
                <input 
                    type='number'
                    name='sqft'
                    placeholder="sqft"
                    value={formData.sqft}
                    onChange={handleChange}
                />
                <input 
                    type='number'
                    name='bedroom'
                    placeholder="Bedroom"
                    value={formData.bedroom}
                    onChange={handleChange}
                />
                <input 
                    type='number'
                    name='bathroom'
                    placeholder="Bathroom"
                    value={formData.bathroom}
                    onChange={handleChange}
                />
                <input 
                    type='number'
                    name='kitchen'
                    placeholder="Kitchen"
                    value={formData.kitchen}
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='amenity'
                    placeholder="Amenity"
                    value={formData.amenity}
                    onChange={handleChange}
                />
                <label htmlFor='pets'>Pets Allowed?</label>
                <input
                    type='checkbox'
                    name='pets'
                    value={formData.pets}
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='image1'
                    placeholder="image url 1"
                    value={formData.image1}
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='image2'
                    placeholder="image url 2"
                    value={formData.image2}
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='image3'
                    placeholder="image url 3"
                    value={formData.image3}
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='image4'
                    placeholder="image url 4"
                    value={formData.image4}
                    onChange={handleChange}
                />
                <button className="submit-button">Submit New Listing</button>
            </form>
            <Link to='/listings'><button className="submit-button">Back to All Listings</button></Link>
        </div>
    )
}

export default NewListing;