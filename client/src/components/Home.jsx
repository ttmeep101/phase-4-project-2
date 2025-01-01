import React from "react";
import { Link } from 'react-router-dom';  
import { useUser } from "./UserContext";

function Home() {
  const { signedIn } = useUser();

  return (
    <div className="home">
      <section className="section-title">
        <h1 className="title">Welcome to Renter</h1>
        <h2>Renting made easy</h2>
      </section>
      <section>
        <h2 className="section-header">Renting Made Simple</h2>
        <p>browse all our listings in one convenient place! 
          Whether you're looking for an apartment, house, or vacation rental, we offer a wide variety of options to fit your needs. 
          With everything in one spot, finding your next rental has never been easier. Explore our listings today and discover the perfect place for you!</p>
        <Link to='/listings'><button className="submit-button">See all listings</button></Link>
      </section>
      <section>
        <h2 className="section-header">Search for Rentals</h2>
        <p>Browse through detailed listings, view high-quality photos, and explore real-time availability— all in one place. 
          Finding your perfect rental has never been easier. Our platform offers a seamless, user-friendly experience with powerful search filters to help you narrow down options based on your needs and preferences. 
          Start your search today and discover your next home with ease!</p>
        <Link to='/listings'><button className="submit-button">Start your rental search</button></Link>
      </section>
      <section>
        <h2 className="section-header">Manage your Bookings</h2>
        <p>Once you are signed in, easily manage your apartment tour bookings with our web application..
          Schedule, reschedule, or cancel tours at your own convenience, all in one place.
          Keep track of upcoming appointments, set reminders, and ensure you never miss a showing.
          Whether you're a renter or a property manager, our web app makes apartment tour booking management seamless and efficient.
        </p>
        <Link to='/bookings'><button className="submit-button">See all my bookings</button></Link>
      </section>
      <section>
        <h2 className="section-header">Manage your Rentals</h2>
        <p>Our platform lets you stay on top of everything—from listing your properties and handling bookings. 
        With streamlined tools for scheduling and viewing reports, you can effortlessly keep your rental business organized and efficient. 
        Take control of your properties and enjoy a hassle-free management experience today!
        </p>
        {!signedIn ? (
          <Link to='/signin'><button className="submit-button">Sign In</button></Link>
        ) : (
          <Link to='/my-listings'><button className="submit-button">See All My Listings</button></Link>
        )}
      </section>
      
    </div>
  );
}

export default Home;