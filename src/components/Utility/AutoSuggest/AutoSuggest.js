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

  const fetchSuggestions = debounce(({ value }) => {
    const callResponse = callFlightClient({
      endpoint: "/autosuggest/v1.0/US/USD/en-US/",
      params: {
        query: value,
      },
    });

    callResponse.then((data) => {
      const transformedSuggestion = data.Places.map((place) => ({
        placeName: place.PlaceName,
        placeId: place.PlaceId,
      }));
      setSuggestions(transformedSuggestion);
    });
  }, 2000);

  const getSuggestionValue = (suggestion) => suggestion.placeName;

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  const renderSuggestion = (suggestion) => {
    return <div>{suggestion.placeName}</div>;
  };

  const inputProps = {
    placeholder: props.placeholder,
    value: props.value,
    onChange: props.onChange,
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
