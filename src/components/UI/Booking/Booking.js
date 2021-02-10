import React, { useState, useCallback } from "react";
import "./booking.css";
import backgroundImage from "./background.jpg";
import flightClient, { callFlightClient } from "../../../api/flight-client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "../../Utility/AutoComplete/Autocomplete";

const Booking = () => {
  const [trip, setTrip] = useState({
    destination: "",
    placeId: "",
    departureDate: null,
  });

  // Todo: Experiment with separating date state
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

  // const callResponse = callFlightClient({
  //   endpoint: "",
  //   params: {},
  // });
  // setSuggestions(callResponse);

  const fetchSuggestions = useCallback(
    debounce((query) => {
      // This will be a promise!
      const callResponse = callFlightClient({
        endpoint: "/autosuggest/v1.0/US/USD/en-US/",
        params: {
          query: query,
        },
      });

      callResponse.then((data) => {
        const transformedSuggestions = data.Places.map((d) => ({
          destination: d.PlaceName,
          placeId: d.PlaceId,
        }));
        setSuggestions(transformedSuggestions);
      });
    }, 2000),
    []
  );

  const fetchQuotes = () => {
    /* 
      Todo: Add dropdown calendar to departure field,
      format appropriately to match requirements 
      of endpoint parameter.
     */
    const callResponse = callFlightClient({
      endpoint: `/browsequotes/v1.0/US/USD/en-US/SFO-sky/${trip.placeId}/2021-03-10`,
      params: {},
    });

    console.log("Call Response: ", callResponse);
    // return callResponse;
  };

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
    fetchSuggestions(e.target.value);
    setTrip((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      placeId: selectedPlace?.placeId,
    }));
  };

  let onClickHandler = (e) => {
    e.preventDefault();
    fetchQuotes();
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
              className="booking__form-input"
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
                ? suggestions.map((suggestion) => {
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
            <DatePicker
              selected={trip.departureDate}
              placeholderText="DEPARTURE DATE"
              /* 
                Todo: Fix styling of custom input
                 to match with Destination input
              */
              customInput={
                <input
                  className="booking__form-input"
                  style={{
                    padding: "6.7%",
                  }}
                />
              }
            />
            {/* <input placeholder="RETURN DATE" /> */}
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
