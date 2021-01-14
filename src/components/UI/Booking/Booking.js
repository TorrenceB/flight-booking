import React, { useState, useEffect } from "react";
import "./booking.css";
import backgroundImage from "./background.jpg";
import flightClient from "../../../api/flight-client";
import Autocomplete from "../../Utility/AutoComplete/Autocomplete";

const Booking = () => {
  const [trip, setTrip] = useState({
    origin: "",
    destination: "",
  });

  const [suggestions, setSuggestions] = useState([]);

  let onChangeHandler = (e) => {
    flightClient({ query: e.target.value, setSuggestions: setSuggestions });
    setTrip((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  let onClickHandler = (e) => {
    e.preventDefault();
    // flightClient({
    //   query: trip.destination,
    // });
    setTrip({
      origin: "",
      destination: "",
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
          {/* ToDo: Refactor inputs into single component */}
          <input
            autoComplete="off"
            list="origins"
            type="text"
            placeholder="ORIGIN?"
            name="origin"
            value={trip.origin || ""}
            onChange={onChangeHandler}
          />
          {/* Todo: Find better alternative 
              for implementing an autosuggest. 
              datalist element has bad support...
          */}
          <datalist id="origins">
            {suggestions.length !== 0
              ? suggestions["Places"].map((suggestion) => {
                  return (
                    <option
                      key={suggestion.PlaceId}
                      value={suggestion.PlaceName}
                    ></option>
                  );
                })
              : ""}
          </datalist>
          <input
            autoComplete="off"
            list="destinations"
            type="text"
            placeholder="DESTINATION?"
            name="destination"
            value={trip.destination || ""}
            onChange={onChangeHandler}
          />
          <datalist id="destinations">
            {suggestions.length !== 0
              ? suggestions["Places"].map((suggestion) => {
                  return (
                    <option
                      key={suggestion.PlaceId}
                      value={suggestion.PlaceName}
                    ></option>
                  );
                })
              : ""}
          </datalist>
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
