import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useUser } from "./UserContext";

function App() {
  const { user, signedIn } = useUser();
  const [houses, setHouses] = useState([])
  const [bookings, setBookings] = useState([])
  const [houseImages, setHouseImages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/listings')
      .then((resp) => resp.json())
      .then(async (data) => {
        setHouses(data);
      })
      .catch((error) => console.error("Error fetching listings", error));

      fetch(`http://localhost:5555/listing-images`)
        .then(resp => resp.json()).then((data) => {
          setHouseImages(data);
        })
        .catch((error) => console.error("Error fetching images", error));
  }, []);

  useEffect(() => {    
    if (signedIn) {
      fetch(`http://localhost:5555/users-bookings/${user?.id}`)
        .then((resp) => resp.json())
        .then((data) => setBookings(data))
        .catch((error) => console.error("Error fetching bookings", error));
    }
  }, [signedIn, user?.id]);

  const bookedOrNot = (id, dateTime, userId) => {
    const houseIsBooked = bookings.find((housetoBook) => {
      return housetoBook.listing_id.toString() === id.toString();
    });
    if (houseIsBooked) {
      fetch(`http://localhost:5555/bookings/${houseIsBooked.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application.json'
        }
      })
      .then(() => {
        const newBooking = bookings.filter((housetoBook) => id.toString() !== housetoBook.listing_id.toString());
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
    return bookings.find((housetoBook) => housetoBook.listing_id.toString() === id.toString())
  }

  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <Outlet context={{
          houses: houses,
          setHouses: setHouses,
          bookings: bookings,
          houseImages: houseImages,
          setHouseImages: setHouseImages,
          setBookings: setBookings,
          bookedOrNot: bookedOrNot,
          checkIfBooked: checkIfBooked,
        }}/>
      </div>
      <Footer />
    </div>
  )
};

export default App;
