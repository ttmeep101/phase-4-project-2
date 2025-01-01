import React, { useState } from "react";
import { Link, useOutletContext, useParams, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import ConfirmationModal from "./ConfirmationModal";

function HouseDetails(){
    const { houses, setHouses, checkIfBooked, bookedOrNot, houseImages } = useOutletContext();
    const { user, signedIn } = useUser();
    const { id } = useParams();
    const [isOwner, setIsOwner] = useState(false)
    const navigate = useNavigate()

    const isBooked = checkIfBooked(id);
    const [dateTimePickerIsOpen, setDateTimePickerIsOpen] = useState(false);
    const [dateTimePickerError, setDateTimePickerError] = useState(false);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [showModal, setShowModal] = useState(false)

    fetch(`/check`)
    .then((resp) => resp.json())
    .then((data) => {
        const curUserId = data.id
        fetch(`/listings/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
            if(curUserId?.toString() === data.user_id?.toString()) {
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

    const {address, price, sqft, bedroom, bathroom, kitchen, amenity,
        pets, about, type, parking, heat_water,
        security, train, airport} = house;

    const firstHouseImage = houseImages && houseImages.find((houseImage) => {
        return houseImage?.listing_id?.toString() === id?.toString();
    });

    function handleRemove() {
        setShowModal(true);
    }

    function handleRemoveConfirm() {
        fetch(`/listings/${id}`, {
            method: "DELETE"
        })
        .then(() => {})
        .then(() => {
            const oldHouses = houses.filter((house) => house?.id?.toString() !== id?.toString());
            setHouses([...oldHouses]);
            setShowModal(false);
            window.scrollTo({top: 0}); 
            navigate('/listings');
        })
    }

    function handleRemoveCancel() {
        setShowModal(false);
    }

    return (
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
                <button className="submit-button" onClick={() => {window.scrollTo({top: 0}); navigate('/listings')}}>Back to Listings</button>
                <button className="submit-button" onClick={() => {window.scrollTo({top: 0}); navigate('/bookings')}}>Back to Bookings</button>
                {isOwner && signedIn && (
                    <>
                        <button onClick={handleRemove} className="submit-button">Remove Listing</button>
                        <button onClick={() => {window.scrollTo({top: 0}); navigate(`/listings/${id}/edit`)}} className="submit-button">Edit Listing</button>
                        {showModal && (
                            <ConfirmationModal
                                message={"Are you sure you want to remove this listing?"}
                                onConfirm={handleRemoveConfirm}
                                onCancel={handleRemoveCancel}
                            />
                        )}
                    </>
                )}
            </section>
            <section>
                <h2>About</h2>
                <p>{about}</p>
            </section>
            <section>
                <h2>Highlights</h2>
                <h4>Listing Features</h4>
                    <ul>
                        <li>Listing type: {type}</li>
                        <li>Parking: {parking?.toString()}</li>
                        <li>Heat and Water Included: {heat_water?.toString()}</li>
                    </ul>
                <h4>Community Features</h4>
                    <ul>
                        <li>Amenity: {amenity}</li>
                        <li>Security: {security}</li>
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
                <h2>Transportation</h2>
                <ul>
                    <li>Public Transportation: {train}</li>
                    <li>Nearby Airports: {airport}</li>
                </ul>
            </section>
        </div>
    );
}

export default HouseDetails;