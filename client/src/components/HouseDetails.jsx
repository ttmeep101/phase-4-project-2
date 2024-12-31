import React, { useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";

function HouseDetails(){
    const { houses, checkIfBooked, bookedOrNot, bookings, setBookings, houseImages } = useOutletContext();
    const { id } = useParams();
    // TODO remove this hardcoded user id
    const userId = '1';

    const isBooked = checkIfBooked(id);
    const [dateTimePickerIsOpen, setDateTimePickerIsOpen] = useState(false);
    const [dateTimePickerError, setDateTimePickerError] = useState(false);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    
    const initialData = {
        price: '',
        address: '',
        sqft: '',
        bedroom: '',
        bathroom: '',
        kitchen: '',
        amenity: '',
        img: '',
        pets: false,
    };
    
    const [updatedListing, setUpdatedListing] = useState(initialData);

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
            bookedOrNot(id, dateTime.toISOString(), userId);
            setDateTimePickerIsOpen(false);
        } else {
            setDateTimePickerError(true);
        }
    }

    const {address, price, sqft, bedroom, bathroom, kitchen, amenity, pets} = house;

    const firstHouseImage = houseImages && houseImages.find((houseImage) => {
        return houseImage?.listing_id?.toString() === id?.toString();
    });

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
                <button className="submit-button" onClick={() => {
                    if (isBooked) {
                        bookedOrNot(id);
                    } else {
                        setDateTimePickerIsOpen(true)        
                    }
                }}>
                    {isBooked ? 'Remove From Booking' : 'Add To Booking'}
                </button>
                { dateTimePickerIsOpen && (
                    <div className="date-time-picker">
                        {dateTimePickerError && (
                            <div className="error">Please input a valid date and time, between 9am to 5pm.</div>
                        )}
                        <label htmlFor="booking-date">Booking time (date and time):</label>
                        <input type="date" id="booking-date" name="booking-date" onChange={handleDateChange} />
                        <input type="time" id="booking-time" name="booking-time" onChange={handleTimeChange} />
                        {// TODO replace 1 BELOW WITH USER_ID, userId, user-id, whatever it ends up being called
                        }
                        <button className="submit-button" type="submit" disabled={dateTimePickerError} onClick={() => bookedOrNotWithValidTime()}>Submit</button>
                        <button className="submit-button" onClick={() => setDateTimePickerIsOpen(false)}>Cancel</button>
                    </div>
                )}
                <Link to='/listings'><button className="submit-button">Back to Listings</button></Link>
                <Link to='/bookings'><button className="submit-button">Back to Bookings</button></Link>
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
        </div>
    );
}

export default HouseDetails;