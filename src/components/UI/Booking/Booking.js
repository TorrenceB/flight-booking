import React, { useState, useEffect } from "react";
import "./booking.css";
import backgroundImage from "./background.jpg";
import flightClient from "../../../api/flight-client";

const Booking = () => {
  // const [trip, setTrip] = useState({});
  const [destination, setDestination] = useState("");

  let onChangeHandler = (e) => {
    let destination = "";
    destination = e.target.value;
    setDestination(destination);
    console.log(destination);
  };

  let onClickHandler = (e) => {
    e.preventDefault();
    flightClient({
      query: destination,
      countryName: "UK",
      localCurrency: "GBP",
      locale: "en-GB",
    });
  };

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
          <input
            type="text"
            placeholder="DESTINATION?"
            value={destination}
            onChange={onChangeHandler}
          />
          <input placeholder="DEPARTURE DATE" />
          <input placeholder="RETURN DATE" />
          <button className="booking__form-button" onClick={onClickHandler}>
            SEND IT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
