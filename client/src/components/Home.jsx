import React from "react";
import { Link } from 'react-router-dom';  
import NavBar from "./NavBar";

function Home() {
  return (
    <div className="home">
      <NavBar />
      <h1>Welcome to Renter!</h1>
      <p>Some text here</p>
      <div>
        <label htmlFor="search">Search Listings</label>
        <input
            type="text"
            id='search'
            placeholder="Type an address..."
            // value={search}
            // onChange={handleChangeSearch}
        ></input>
      </div>
      {/* <Link to='/listings'>Explore available Listings</Link> */}
    </div>
  );
}

export default Home;