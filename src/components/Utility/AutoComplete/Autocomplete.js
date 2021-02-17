import React, { useState } from "react";
import "./autocomplete.css";
import "../../UI/Booking/booking.css"

const AutoComplete = (props) => {
  return (
    <div className="autocomplete">
      <input
        className="booking__form-input"
        autoComplete="off"
        list="destinations"
        type="text"
        placeholder="DESTINATION"
        name="destination"
        value={props.destination || ""}
        onChange={props.onChangeHandler}
      />
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
    </div>
  );
};

export default AutoComplete;
