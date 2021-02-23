import React, { useState, useEffect } from "react";
import "./booking.css";
import backgroundImage from "./background.jpg";
import { callFlightClient } from "../../../api/flight-client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AutoSuggestions from "../../Utility/AutoSuggest/AutoSuggest";

const Booking = () => {
  const [trip, setTrip] = useState({
    origin: "",
    destination: "",
    originPlaceId: "",
    departurePlaceId: "",
    departureDate: null,
  });

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    console.log("Suggestions:", suggestions);
    console.log("Trip: ", trip);
  });

  const fetchQuotes = () => {
    const callResponse = callFlightClient({
      endpoint: `/browsequotes/v1.0/US/USD/en-US/${trip.originPlaceId}/${trip.departurePlaceId}/${trip.departureDate}`,
      params: {},
    });

    console.log("Call Response: ", callResponse);
    callResponse.then((data) => {
      // Do something with data
    });
  };

  let onClickHandler = (e) => {
    e.preventDefault();
    fetchQuotes();
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
          <AutoSuggestions
            value={trip.origin}
            placeholder="Origin"
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            onChange={(e) => {
              let selectedPlace =
                suggestions.length >= 1
                  ? suggestions.find((suggestion) => {
                      if (suggestion.placeName === e.target.value) {
                        return true;
                      } else {
                        return false;
                      }
                    })
                  : "";
              console.log("Selected Place: ", selectedPlace);
              setTrip((prevState) => ({
                ...prevState,
                origin: e.target.value,
                originPlaceId: selectedPlace?.placeId,
                /* Todo: Pass selected
                      placeId from (autosuggest) child to
                      (booking) parent.
                      */
              }));
            }}
          />
          <AutoSuggestions
            value={trip.destination}
            placeholder="Destination"
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            onChange={(e) => {
              setTrip((prevState) => ({
                ...prevState,
                destination: e.target.value,
              }));
            }}
          />
          <DatePicker
            placeholderText="DEPARTURE DATE"
            dateFormat="MMMM d, yyyy"
            selected={Date.parse(trip.departureDate)}
            onChange={(date) =>
              setTrip((prevState) => ({
                ...prevState,
                departureDate: date.toISOString().slice(0, 10),
              }))
            }
            /* 
                Todo: Fix styling of custom input
                to match with Destination input
                Todo: Fix calendar to display below departure date. 
              */
            customInput={
              <input
                className="booking__form-input"
                style={{
                  marginTop: "2%",
                  marginLeft: "3%",
                  marginRight: "5%",
                  padding: "7.5%",
                }}
              />
            }
          />
          <button className="booking__form-button" onClick={onClickHandler}>
            SEND IT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
