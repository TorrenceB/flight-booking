import React, { useState, useEffect } from "react";
import "./booking.css";
import backgroundImage from "./background.jpg";
import flightClient from "../../../api/flight-client";

const Booking = () => {
  const [trip, setTrip] = useState({
    origin: "",
    destination: "",
  });

  let onChangeHandler = (e) => {
    setTrip((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(trip);
  };

  let onClickHandler = (e) => {
    e.preventDefault();
    flightClient({
      query: trip.destination,
      countryName: "UK",
      localCurrency: "GBP",
      locale: "en-GB",
    });
    trip.origin = "";
    trip.destination = "";
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
          <input
            type="text"
            placeholder="ORIGIN?"
            name="origin"
            value={trip.origin || ""}
            onChange={onChangeHandler}
          />
          <input
            type="text"
            placeholder="DESTINATION?"
            name="destination"
            value={trip.destination || ""}
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
