import React, { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { useUser } from "./UserContext";

function NewListing() {
    const { houses, setHouses, houseImages, setHouseImages } = useOutletContext();
    const [ images, setImages ] = useState([]);
    const { user, signedIn, setSignedIn } = useUser();

    const initialFormData = {
        price: '',
        address: '',
        sqft: '',
        bedroom: '',
        bathroom: '',
        kitchen: '',
        amenity: '',
        pets: false,
        about: '',
        type: '',
        parking: false,
        heat_water: false,
        train: '',
        airport: '',
        security: ''
    };
    
    const [ formData, setFormData ] = useState({...initialFormData});
        
    useEffect(() => {
        fetch('/check')
        .then((resp) => {
            if(resp.ok) {
                setSignedIn(true)
            }
            else {
                setSignedIn(false)
            }
        })
    }, [setSignedIn])

    const addNewListing = (newListing) => {
        fetch("/listings", {
            method: "POST",
            headers: {
                "Content-Type": "Application/JSON",
            },
            body: JSON.stringify({ ...newListing, user_id: user?.id }),
        })
        .then((response) => response.json())
        .then((house) => {
            setHouses([...houses, house]);
            const imageFetches = images.reduce((result, image) => {
                if (!!image) {
                    const data = new FormData();
                    data.append('file', image);
                    data.append('name', 'image');
                    const imageUploadFetch = fetch(`/listing-images/${house.id}`, {
                        method: "POST",
                        body: data
                    });
                    result.push(imageUploadFetch);
                }
                return result;
            }, []);
            try {
                Promise.all(imageFetches)
                .then((results) => Promise.all(results.map(r => r.json())))
                .then((results) => {
                    setHouseImages([...houseImages, ...results]);
                    setFormData({ ...initialFormData });
                })
                .catch((error) => console.error("Error adding new listing images", error));
            } catch(e) {
                console.error('image upload failed');
            }
        })
        .catch((error) => console.error("Error adding new listing", error));
      };
    
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (['pets', 'parking', 'heat_water'].includes(name)) {
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
    };

    return (
        <div>
            {!signedIn ? 
            ((<div>
                <section>
                    <h2>Please sign in to create a new listing</h2>
                    <Link to='/signin'><button className="submit-button">Sign In</button></Link>
                </section>
            </div>)) : (
            <div className="container">
                <h2>Add a new listing:</h2>
                <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="price">Price</label>
                    </div>
                    <div className="col-75">
                        <input
                            className="new-listing-input"
                            type='number'
                            name='price'
                            placeholder="Price"
                            min="100"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="adress">Address</label>
                    </div>
                    <div className="col-75">
                        <input
                            className="new-listing-input"
                            type='text'
                            name='address'
                            placeholder="Address"
                            minLength="10"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="type">Type</label>
                    </div>
                    <div className="col-75">
                        <input
                            className="new-listing-input"
                            type="text"
                            name="type"
                            placeholder="Type of listing"
                            minLength="1"
                            value={formData.type}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="sqft">Sqft</label>
                    </div>
                    <div className="col-75">
                        <input
                            className="new-listing-input"
                            type='number'
                            name='sqft'
                            placeholder="sqft"
                            min="100"
                            value={formData.sqft}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="bedrooms">Bedrooms</label>
                    </div>
                    <div className="col-75">
                        <input
                            className="new-listing-input"
                            type='number'
                            name='bedroom'
                            placeholder="Bedroom"
                            min="0"
                            value={formData.bedroom}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="bathrooms">Bathrooms</label>
                    </div>
                    <div className="col-75">
                        <input
                            className="new-listing-input"
                            type='number'
                            name='bathroom'
                            placeholder="Bathroom"
                            min="0"
                            value={formData.bathroom}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="kitchen">Kitchen</label>
                    </div>
                    <div className="col-75">
                        <input
                            className="new-listing-input"
                            type='number'
                            name='kitchen'
                            placeholder="Kitchen"
                            min="0"
                            value={formData.kitchen}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="amenity">Amenity</label>
                    </div>
                    <div className="col-75">
                        <input
                            className="new-listing-input"
                            type='text'
                            name='amenity'
                            placeholder="Amenity"
                            minLength="1"
                            value={formData.amenity}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="about">About</label>
                    </div>
                    <div className="col-75">
                        <input
                            className="new-listing-input"
                            type="text"
                            name="about"
                            placeholder="Write something about the listing"
                            minLength="10"
                            value={formData.about}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="train">Public Transport</label>
                    </div>
                    <div className="col-75">
                        <input
                            className="new-listing-input"
                            type="text"
                            name="train"
                            placeholder="Write nearby trains, subway, buses"
                            minLength="1"
                            value={formData.train}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="airport">Airport</label>
                    </div>
                    <div className="col-75">
                        <input
                            className="new-listing-input"
                            type="text"
                            name="airport"
                            placeholder="Write nearby airports"
                            minLength="1"
                            value={formData.airport}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="security">Security</label>
                    </div>
                    <div className="col-75">
                        <input
                            className="new-listing-input"
                            type="text"
                            name="security"
                            placeholder="Write form of security"
                            minLength="1"
                            value={formData.security}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25"> 
                        <label htmlFor='pets'>Pets Allowed</label>
                    </div>
                    <div className="col-75">
                        <input
                            className="new-listing-input"
                            type='checkbox'
                            name='pets'
                            value={formData.pets}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25"> 
                        <label htmlFor='parking'>Parking</label>
                    </div>
                    <div className="col-75">
                        <input
                            className="new-listing-input"
                            type='checkbox'
                            name='parking'
                            value={formData.parking}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25"> 
                        <label htmlFor='heat_water'>Heat and Water Included</label>
                    </div>
                    <div className="col-75">
                        <input
                            className="new-listing-input"
                            type='checkbox'
                            name='heat_water'
                            value={formData.heat_water}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="images">Image(s)</label>
                    </div>
                    <div className="col-75">
                        <input
                            multiple
                            type='file'
                            name='images'
                            accept="image/*"
                            placeholder="images"
                            onChange={(e) => {
                                if (e?.target?.files) {
                                    setImages([...e.target.files])
                                }
                            }}
                        />
                    </div>
                </div>
                <div>
                    <button className="submit-button">Submit New Listing</button>
                </div>
                </form>
                <Link to='/listings'><button className="submit-button">Back to All Listings</button></Link>
            </div>
        )
    }</div>)
}

export default NewListing;