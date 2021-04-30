import React, { useState, useEffect } from "react";
import "./booking.css";
import backgroundImage from "./background.jpg";
import { callFlightClient } from "../../../api/flight-client";

import "react-datepicker/dist/react-datepicker.css";
import AutoSuggestions from "../../Utility/AutoSuggest/AutoSuggest";
import DatePicker from "react-datepicker";
import TripResultModal from "../Modal/Modal";

const Booking = () => {
  /* Todo: Move state into redux store */
  const [trip, setTrip] = useState({
    origin: "",
    destination: "",
    originPlaceId: "",
    departurePlaceId: "",
    departureDate: null,
  });

  const [suggestions, setSuggestions] = useState([]);
  const [tripResults, setTripResults] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    console.log("Suggestions:", suggestions);
    console.log("Trip: ", trip);
    console.log("Trip results: ", tripResults);
  });

  const fetchQuotes = async () => {
    const carrierResults = [];
    const callResponse = callFlightClient({
      endpoint: `/browsequotes/v1.0/US/USD/en-US/${trip.originPlaceId}/${trip.departurePlaceId}/${trip.departureDate}`,
      params: {},
    });

    await callResponse.then((data) => {
      console.log("Data: ", data);
      const carrierMap = new Map();

      data.Quotes.forEach((quote) => {
        carrierMap.set({}, quote.OutboundLeg.CarrierIds[0]);
        // const carrier = data.Carriers.find((carrier) => {
        //   const matchedCarrier =
        //     carrier.CarrierId === quote.OutboundLeg.CarrierIds[0];
        //   return matchedCarrier;
        // });

        // Get carrier name //
        /* 1.  set key to carrier object
          2.  set value to quote.OutboundLeg.CarrierIds[0]
        */

        const flight = {
          price: quote.MinPrice,
          isFlightDirect: quote.Direct,
          // carrierName: carrier.Name,
        };
        carrierResults.push(flight);
      });
      console.log(carrierMap);
    });
    setTripResults(carrierResults);
  };

  const fetchAirport = (userSelectedValue) => {
    let selectedPlace =
      suggestions.length >= 1
        ? suggestions.find((suggestion) => {
            if (suggestion.placeName === userSelectedValue) {
              return true;
            } else {
              return false;
            }
          })
        : "";

    return selectedPlace;
  };

  const onSelectFlightHandler = () => {
    console.log("Flight selected!");
  };

  const onClickHandler = async (e) => {
    e.preventDefault();
    await fetchQuotes();
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
            name="origin"
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            updateTrip={(placeName) => {
              let currentTrip = fetchAirport(placeName);
              setTrip((prevState) => ({
                ...prevState,
                origin: placeName,
                originPlaceId: currentTrip?.placeId,
              }));
            }}
          />
          <AutoSuggestions
            value={trip.destination}
            placeholder="Destination"
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            updateTrip={(placeName) => {
              let currentTrip = fetchAirport(placeName);
              setTrip((prevState) => ({
                ...prevState,
                destination: placeName,
                departurePlaceId: currentTrip?.placeId,
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
        <TripResultModal
          modalIsOpen={modalIsOpen}
          onRequestClose={closeModal}
          origin={trip.origin}
          destination={trip.destination}
          departureDate={trip.departureDate}
          tripResults={tripResults}
          onClick={onSelectFlightHandler}
        />
      </div>
    </div>
  );
};

export default Booking;
