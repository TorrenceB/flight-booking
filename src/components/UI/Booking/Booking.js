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
      <div className="booking__form-container">
        <h3>WHERE DO YOU WANT TO GO?</h3>
        <form className="booking__form">
          <input placeholder="ORIGIN?" />
          <input placeholder="DESTINATION?" />
          <button className="booking__form-button">SEND IT</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
