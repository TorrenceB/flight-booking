import React, { useState, useCallback } from "react";
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
    placeId: "",
    departureDate: null,
  });

  const fetchQuotes = () => {
    const callResponse = callFlightClient({
      endpoint: `/browsequotes/v1.0/US/USD/en-US/SFO-sky/${trip.placeId}/${trip.departureDate}`,
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
            <AutoSuggestions
              value={trip.origin}
              placeholder="Origin"
              onChange={(e) => {
                setTrip((prevState) => ({
                  ...prevState,
                  origin: e.target.value,
                  /* Todo: Pass selected
                    placeId from (autosuggest) child to
                    (booking) parent.
                  */
                  // placeId: suggestions?.placeId,
                }));
              }}
            />
            <AutoSuggestions
              value={trip.destination}
              placeholder="Destination"
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
                  /* Todo: Parse returned Date object
                      to value that's accepted by endpoint.
                      date.parse(//something)
                  */
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
            {/* <input className="booking__form-input" placeholder="RETURN DATE" /> */}
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
