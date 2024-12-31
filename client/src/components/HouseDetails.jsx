import React, { useState } from "react";
import { Link, useOutletContext, useParams, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import ConfirmationModal from "./ConfirmationModal";

function HouseDetails(){
    const { houses, checkIfBooked, bookedOrNot, houseImages } = useOutletContext();
    const { user, signedIn } = useUser();
    const [ images, setImages ] = useState(Array(4).fill(''));
    const { id } = useParams();
    const [isOwner, setIsOwner] = useState(false)
    const navigate = useNavigate()

    const isBooked = checkIfBooked(id);
    const [dateTimePickerIsOpen, setDateTimePickerIsOpen] = useState(false);
    const [dateTimePickerError, setDateTimePickerError] = useState(false);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [showModal, setShowModal] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

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
        user_id: user?.id,
    });

    fetch(`/check`)
    .then((resp) => resp.json())
    .then((data) => {
        const curUserId = data.id
        fetch(`/listings/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
            if(curUserId == data.user_id) {
                setIsOwner(true)
            }
        })
    })

    const house = houses.find((house) => house?.id?.toString() === id.toString());
    if (!house) {
        return (
            <div className="details">
                <h4>Failed to find that house!</h4>
            </div>    
        );
    }

    const handleDateChange = (e) => {
        setDateTimePickerError(false);
        const dateAsJSDate = new Date(e.target.value);
        if (dateAsJSDate instanceof Date && !isNaN(dateAsJSDate)) {
            setDate(e.target.value);
        } else {
            setDateTimePickerError(true);
        }
    };

    const handleTimeChange = (e) => {
        setDateTimePickerError(false);
        const timeFromInput = e.target.value || '';
        const hoursAsInt = parseInt(timeFromInput.substring(0, 2), 10);
        if (hoursAsInt >= 9 && hoursAsInt <= 17) {
            setTime(timeFromInput);
        } else {
            setDateTimePickerError(true);
        }
    }

    const bookedOrNotWithValidTime = () => {
        const dateTime = new Date(`${date}T${time}`);
        if (dateTime instanceof Date && !isNaN(dateTime)) {
            bookedOrNot(id, dateTime.toISOString(), user?.id);
            setDateTimePickerIsOpen(false);
        } else {
            setDateTimePickerError(true);
        }
    }

    const {address, price, sqft, bedroom, bathroom, kitchen, amenity, pets} = house;

    const firstHouseImage = houseImages && houseImages.find((houseImage) => {
        return houseImage?.listing_id?.toString() === id?.toString();
    });

    function handleEdit() {
        setShowEdit(true)
        window.scrollTo({
            top: 0
        })
        fetch(`/listings/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
            setFormData({
                price: data.price,
                address: data.address,
                sqft: data.sqft,
                bedroom: data.bedroom,
                bathroom: data.bathroom,
                kitchen: data.kitchen,
                amenity: data.amenity,
                pets: true,
                user_id: data.user_id
            })
        })
    }

    function handleRemove() {
        setShowModal(true)
    }

    function handleRemoveConfirm() {
        fetch(`/listings/${id}`, {
            method: "DELETE"
        })
        .then(() => {})
        .then(() => {
            console.log('Delete successful')
            setShowModal(false)
            navigate('/listings')
        })
    }

    function handleRemoveCancel() {
        setShowModal(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editListing(formData);
        setFormData({
            price: '',
            address: '',
            sqft: '',
            bedroom: '',
            bathroom: '',
            kitchen: '',
            amenity: '',
            pets: true,
            user_id: user?.id,
        });
        setShowEdit(false)
        window.scrollTo({
            top: 0
        })
    };

    const cancelEdit = () => {
        setShowEdit(false)
        window.scrollTo({
            top: 0
        })
    }

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

    function editListing(updatedListing) {
        fetch(`${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedListing)
        })
        .then((resp) => resp.json())
        .then((data) => console.log(data), console.log(updatedListing))
    }

    return (
        <div>
            {showEdit ? (
                <div>
                    <div className="container">
                        <h2>Edit Listing:</h2>
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
                                <button className="submit-button">Update Listing</button>
                            </div>
                        </form>
                        <button onClick={cancelEdit} className="submit-button">Remove Changes</button>
                    </div>
                </div>
            ) : (
            <div className="details">
                <section>
                    <Link to={`/listings/${id}/images`}>
                        <img className="detail-image" src={firstHouseImage?.file} alt={id} />
                    </Link>
                    <h4>{`$ ${price}`}</h4>
                    <p>{address}</p>
                    <p>Sq. Ft: {sqft}</p>
                    <p>Bedrooms: {bedroom}</p>
                    <p>Bathrooms: {bathroom}</p>
                    <p>Kitchen: {kitchen}</p>
                    <p>Amenity: {amenity}</p>
                    <p>Pets allowed: {pets?.toString()}</p>
                    {signedIn &&
                        <button className="submit-button" onClick={() => {
                            if (isBooked) {
                                bookedOrNot(id);
                            } else {
                                setDateTimePickerIsOpen(true)        
                            }
                        }}>
                            {isBooked ? 'Remove From Booking' : 'Add To Booking'}
                        </button>
                    }
                    { dateTimePickerIsOpen && (
                        <div className="date-time-picker">
                            {dateTimePickerError && (
                                <div className="error">Please input a valid date and time, between 9am to 5pm.</div>
                            )}
                            <label htmlFor="booking-date">Booking time (date and time):</label>
                            <input type="date" id="booking-date" name="booking-date" onChange={handleDateChange} />
                            <input type="time" id="booking-time" name="booking-time" onChange={handleTimeChange} />
                            <button className="submit-button" type="submit" disabled={dateTimePickerError} onClick={() => bookedOrNotWithValidTime()}>Submit</button>
                            <button className="submit-button" onClick={() => setDateTimePickerIsOpen(false)}>Cancel</button>
                        </div>
                    )}
                    <Link to='/listings'><button className="submit-button">Back to Listings</button></Link>
                    <Link to='/bookings'><button className="submit-button">Back to Bookings</button></Link>
                    {isOwner && signedIn ? (<div>
                        <button onClick={handleRemove} className="submit-button">Remove Listing</button>
                        {showModal && (
                            <ConfirmationModal
                                message={"Are you sure you want to remove this listing?"}
                                onConfirm={handleRemoveConfirm}
                                onCancel={handleRemoveCancel}
                            />
                        )}
                        <button onClick={handleEdit} className="submit-button">Edit Listing</button>
                    </div>) : (<></>) }
                </section>
                <section>
                    <h2>About</h2>
                    <p>paragraph here about the apartment</p>
                </section>
                <section>
                    <h2>Highlights</h2>
                    <h4>Listing Features</h4>
                        <ul>
                            <li>Listing type: house, apartment, condo</li>
                            <li>Exterior: </li>
                            <li>Parking: yes or no</li>
                            <li>Heat and Water Included: yes or no</li>
                        </ul>
                    <h4>Community Features</h4>
                        <ul>
                            <li>Amenity: {amenity}</li>
                            <li>Security: </li>
                            <li>Fitness center:</li>
                        </ul>
                </section>
                <section>
                    <h2>Fees</h2>
                    <ul>
                        <li>One Month Advance: $ {price}</li>
                        <li>One Month Security Depost: $ {price}</li>
                        <li>Application Fee: $ 100.00</li>
                        <li>Lease Options: 12 months and 24 months available</li>
                    </ul>
                </section>
                <section>
                    <h2>Public Transportation</h2>
                    <ul>
                        <li>Train/Subways: </li>
                        <li>Nearby Airports: </li>
                    </ul>
                </section>
            </div>)}
        </div>
    );
}

export default HouseDetails;