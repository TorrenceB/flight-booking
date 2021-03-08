import React from "react";
import Autosuggest from "react-autosuggest";
import { callFlightClient } from "../../../api/flight-client";

import "./autosuggest.css";

const AutoSuggestions = (props) => {
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
    if (!value) {
      props.setSuggestions([]);
    }
    
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
      props.setSuggestions(transformedSuggestion);
    });
  }, 2000);

  const getSuggestionValue = (suggestion) => suggestion.placeName;

  const clearSuggestions = () => {
    props.setSuggestions([]);
  };

  const renderSuggestion = (suggestion) => {
    return <div>{suggestion.placeName}</div>;
  };

  const inputProps = {
    placeholder: props.placeholder,
    value: props.value,
    name: props.name,
    onChange: (e, {newValue, method}) => {
      // console.log('New Value: ', newValue);
      props.updateTrip(newValue);

    }
  };

  return (
    <div className="autosuggest">
      <Autosuggest
        suggestions={props.suggestions}
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
