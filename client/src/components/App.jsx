import React, { useEffect, useState } from "react";
import { Switch, Route, Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

function App() {
  const [houses, setHouses] = useState([])
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    fetch('http://localhost:5555/listings')
      .then((resp) => resp.json())
      .then((data) => setHouses(data))
      .catch((error) => console.error("Error fetching listings", error));

      fetch('http://localhost:5555/bookings')
      .then((resp) => resp.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching bookings", error));
  }, [])

  const bookedOrNot = (id, dateTime, userId) => {
    const houseIsBooked = bookings.find((housetoBook) => housetoBook.listingId === id);
    if (houseIsBooked) {
      fetch(`http://localhost:5555/bookings/${houseIsBooked.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application.json'
        }
      })
      .then(() => {
        const newBooking = bookings.filter((housetoBook) => id !== housetoBook.listingId);
        setBookings([...newBooking]);
      })
      .catch((error) => console.error('Error removing house from bookings', error));
    } else {
      fetch('http://localhost:5555/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({date_time: dateTime, listing_id: id, user_id: userId}),
      })
      .then((resp) => resp.json())
      .then((bookingResponse) => {
        setBookings([...bookings, bookingResponse]);
      })
      .catch((error) => console.error('Error adding listing to booking', error))
    }
  };

  const checkIfBooked = (id) => {
    return bookings.find((housetoBook) => housetoBook.listingId === id)
  }

  return (
    <div className="app">
      <NavBar />
      <Outlet context={{
        houses: houses,
        setHouses: setHouses,
        bookings: bookings,
        setBookings: setBookings,
        bookedOrNot: bookedOrNot,
        checkIfBooked: checkIfBooked,
      }}/>
      <Footer />
    </div>
  )
};

export default App;