import React, { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

function HouseDetails(){
    const { houses, checkIfBooked, bookedOrNot, bookings, setBookings } = useOutletContext();
    const { id } = useParams();

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

    const house = houses.find((house) => house.id.toString() === id);
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
            bookedOrNot(id, dateTime.toISOString(), 1);
        } else {
            setDateTimePickerError(true);
        }
    }

    const {img, address, price} = house;
    return (
        <div className="details">
            <img src={img} alt={address} />
            <h4>{`$ ${price}`}</h4>
            <p>{address}</p>
            <button className="submit-button" onClick={() => setDateTimePickerIsOpen(true)}>
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
                    <button type="submit" disabled={dateTimePickerError} onClick={() => bookedOrNotWithValidTime()}>Submit</button>
                    <button className="closeIcon" onClick={() => setDateTimePickerIsOpen(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default HouseDetails;