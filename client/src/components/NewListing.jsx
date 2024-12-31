import React, { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { useUser } from "./UserContext";

function NewListing() {
    const { houses, setHouses, houseImages, setHouseImages } = useOutletContext();
    const [ images, setImages ] = useState(Array(4).fill(''));
    const { signedIn, setSignedIn } = useUser(false);
    // TODO remove this hardcoded user id
    const userId = '1';
        
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
            body: JSON.stringify(newListing),
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
                .then((results) => setHouseImages([...houseImages, ...results]))
                .catch((error) => console.error("Error adding new listing images", error));
            } catch(e) {
                console.error('image upload failed');
            }
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
        user_id: userId,
      });
    
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (name === 'pets') {
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
            user_id: userId,
        });
    };

    return (
        <div>
            {!signedIn ? 
            ((<div>
                <h2>Please sign in to use this page</h2>
                <Link to='/signin'>Login</Link>
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
                        <label htmlFor="adress">Adress</label>
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
                            minLength="1"
                        />
                    </div>
                </div>
                    <label htmlFor='pets'>Pets Allowed?</label>
                    <div>
                        <input
                            className="new-listing-input"
                            type='checkbox'
                            name='pets'
                            value={formData.pets}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type='file'
                            name='image1'
                            accept="image/*"
                            placeholder="image url 1"
                            onChange={(e) => {
                                if (e?.target?.files) {
                                    images[0] = e.target.files[0];
                                    setImages([...images])
                                }
                            }}
                        />
                    </div>
                    <div>
                        <input 
                            type='file'
                            name='image2'
                            accept="image/*"
                            placeholder="image url 2"
                            onChange={(e) => {
                                if (e?.target?.files) {
                                    images[1] = e.target.files[0];
                                    setImages([...images])
                                }
                            }}
                        />
                    </div>
                    <div>
                        <input 
                            type='file'
                            name='image3'
                            accept="image/*"
                            placeholder="image url 3"
                            onChange={(e) => {
                                if (e?.target?.files) {
                                    images[2] = e.target.files[0];
                                    setImages([...images])
                                }
                            }}
                        />
                    </div>
                    <div>
                        <input 
                            type='file'
                            name='image4'
                            accept="image/*"
                            placeholder="image url 4"
                            onChange={(e) => {
                                if (e?.target?.files) {
                                    images[3] = e.target.files[0];
                                    setImages([...images])
                                }
                            }}
                        />
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