import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Footer />
    </div>
  )
};

export default App;
