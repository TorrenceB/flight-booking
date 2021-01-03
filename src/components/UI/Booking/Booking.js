import React from "react";
import "./booking.css";
import backgroundImage from "./background.jpg";

const Booking = () => {
  return (
    <div
      className="booking"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <h1>Booking Container</h1>
    </div>
  );
};

export default Booking;
