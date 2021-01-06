import React, { useState, useEffect } from "react";
import "./booking.css";
import backgroundImage from "./background.jpg";
import flightClient from "../../../api/flight-client";

const Booking = () => {
  const [trip, setTrip] = useState({});

  // useEffect(() => {}, []);

  return (
    flightClient({
      query: "Stockholm",
      countryName: "UK",
      localCurrency: "GBP",
      locale: "en-GB",
    }),
    (
      <div
        className="booking"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="booking__form-container">
          <h3>WHERE DO YOU WANT TO GO?</h3>
          <form className="booking__form">
            {/* TODO: Add inputs for dates */}
            <input placeholder="ORIGIN?" />
            <input placeholder="DESTINATION?" />
            <input placeholder="DEPARTURE DATE" />
            <input placeholder="RETURN DATE" />
            <button className="booking__form-button">SEND IT</button>
          </form>
        </div>
      </div>
    )
  );
};

export default Booking;
