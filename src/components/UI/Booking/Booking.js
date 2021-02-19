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

  // const debounce = (callback, rate) => {
  //   let timer;
  //   return (...args) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       callback(...args);
  //     }, rate);
  //   };
  // };

  // const callResponse = callFlightClient({
  //   endpoint: "",
  //   params: {},
  // });
  // setSuggestions(callResponse);

  // const fetchSuggestions = useCallback(
  //   debounce((query) => {
  //     // This will be a promise!
  //     const callResponse = callFlightClient({
  //       endpoint: "/autosuggest/v1.0/US/USD/en-US/",
  //       params: {
  //         query: query,
  //       },
  //     });

  //     callResponse.then((data) => {
  //       const transformedSuggestions = data.Places.map((d) => ({
  //         placeName: d.PlaceName,
  //         placeId: d.PlaceId,
  //       }));
  //       setSuggestions(transformedSuggestions);
  //     });
  //   }, 2000),
  //   []
  // );

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

  // let onChangeHandler = (e) => {
  //   let selectedPlace =
  //     suggestions.length >= 1
  //       ? suggestions.find((suggestion) => {
  //           if (suggestion.destination === e.target.value) {
  //             return true;
  //           } else {
  //             return false;
  //           }
  //         })
  //       : "";
  //   fetchSuggestions(e.target.value);
  //   setTrip((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //     placeId: selectedPlace?.placeId,
  //   }));
  // };

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
            <AutoSuggestions
              value={trip.origin}
              placeholder="Origin"
              /* Pass function from parent to 
                child to update parent state.
                Set trip state will be done here.
              */
              onChange={(e) => {
                setTrip((prevState) => ({
                  ...prevState,
                  origin: e.target.value,
                }));
              }}
            />
            {/* <input
              className="booking__form-input"
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
                ? suggestions.map((suggestion) => {
                    return (
                      <option
                        key={suggestion.placeId}
                        value={suggestion.placeName}
                      ></option>
                    );
                  })
                : ""}
            </datalist> */}
            {/* <input
              className="booking__form-input"
              autoComplete="off"
              list="destinations"
              type="text"
              placeholder="DESTINATION"
              name="destination"
              value={trip.destination || ""}
              onChange={onChangeHandler}
            /> */}
            {/* Todo: Empty out suggestions array when user
                makes selection
              */}
            {/* <datalist id="destinations">
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
            </datalist> */}
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

// Goal:
// Provide a list with all start times.

// const example = {
//   trips: [
//     {
//       location: "New York",
//       time: [
//         {
//           start: "07:00",
//           end: "08:00",
//         },
//         {
//           start: "09:00",
//           end: "10:00",
//         },
//       ],
//     },
//     {
//       location: "Seattle",
//       time: [
//         {
//           start: "07:40",
//           end: "08:30",
//         },
//         {
//           start: "09:10",
//           end: "10:20",
//         },
//       ],
//     },
//   ],
// };

// initialize new list for only start times

// ['07:00', '09:00', '07:40', '09:10']

// iterateObj([123]);

// const getStartTimes = ({ obj }) => {
//   const arr = [];
//   const test = obj.trips.map((trip) => {
//     const times = trip.time.map((t) => {
//       // t = timeObj
//       const startTime = t.start;
//       arr.push(startTime);
//     });
//   });

//   return {arr};
// };

// const getEndTimes = () => {};

// const list = [];
// iterateObj({arr: list, obj: example})

// iterateObj({ arr: [], obj: example });
