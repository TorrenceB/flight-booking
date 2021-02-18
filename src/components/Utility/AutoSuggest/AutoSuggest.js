import React, { useState, useCallback } from "react";
import Autosuggest from "react-autosuggest";
import { callFlightClient } from "../../../api/flight-client";

import "./autosuggest.css";

const AutoSuggestions = (props) => {
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

  const fetchSuggestions = useCallback(
    debounce((query) => {
      // This will be a promise!
      const callResponse = callFlightClient({
        endpoint: "/autosuggest/v1.0/US/USD/en-US/",
        params: {
          query: query,
        },
      });

      console.log(callResponse);

      callResponse.then((data) => {
        const transformedSuggestions = data.Places.map((d) => ({
          placeName: d.PlaceName,
          placeId: d.PlaceId,
        }));
        setSuggestions(transformedSuggestions);
      });
    }, 2000),
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
    fetchSuggestions(e.target.value);
    props.setTrip((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      placeId: selectedPlace?.placeId,
    }));
  };

  const getSuggestionValue = (suggestion) => suggestion.placeName;

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  const renderSuggestion = (suggestion) => {
    return <span>{suggestion.placeName}</span>;
  };

  const inputProps = {
    placeholder: props.placeholder,
    value: props.value,
    onChange: onChangeHandler,
  };

  return (
    <div className="autosuggest">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={fetchSuggestions}
        onSuggestionsClearRequested={clearSuggestions}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
};

export default AutoSuggestions;
