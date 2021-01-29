import React, { useState, useCallback } from "react";
import "./booking.css";
import backgroundImage from "./background.jpg";
import flightClient from "../../../api/flight-client";
import Autocomplete from "../../Utility/AutoComplete/Autocomplete";

const Booking = () => {
  const [trip, setTrip] = useState({
    destination: "",
    placeId: "",
  });
  const [suggestions, setSuggestions] = useState([]);

  const debounce = (callback, rate) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, rate);
    };
  };

  const handler = useCallback(
    debounce(
      (query) =>
        flightClient({
          query: query,
          setSuggestions: setSuggestions,
        }),
      2000
    ),
    []
  );

  let onChangeHandler = (e) => {
    let selectedPlace =
      suggestions.length >= 1
        ? suggestions.find((suggestion) => {
            if (suggestion.destination === e.target.value) {
              return true;
            } else {
              return false;
            }
          })
        : "";
    handler(e.target.value);
    setTrip((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      placeId: selectedPlace?.placeId,
    }));
  };

  let onClickHandler = (e) => {
    e.preventDefault();
    setTrip({
      destination: "",
      destinationPlaceId: "",
    });
    setSuggestions([]);
  };

  return (
    console.log("Trip: ", trip),
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
            {/* ToDo: Refactor inputs into single component */}
            {/* Todo: Find better alternative 
              for implementing an autosuggest. 
              datalist element has bad support...
          */}
            {/* <input
            autoComplete="off"
            list="origins"
            type="text"
            placeholder="ORIGIN?"
            name="origin"
            value={trip.origin || ""}
            onChange={onChangeHandler}
          />
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
          </datalist> */}
            <input
              autoComplete="off"
              list="destinations"
              type="text"
              placeholder="DESTINATION"
              name="destination"
              value={trip.destination || ""}
              onChange={onChangeHandler}
            />
            <datalist id="destinations">
              {suggestions.length !== 0
                ? suggestions.map((suggestion, index) => {
                    // Todo: Suggestions don't drop down when entire country entered
                    return (
                      <option
                        key={suggestion.placeId}
                        value={suggestion.destination}
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
    )
  );
};

export default Booking;
