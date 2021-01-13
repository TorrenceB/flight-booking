import React, { useState } from "react";
import "./autocomplete.css";

const Autocomplete = () => {
  const [suggestions, setSuggestions] = useState(["Apples", "Oranges"]);

  return (
    <div className="autocomplete">
      <ul className="autocomplete__list-items">
        {suggestions.map((suggestion, index) => {
          return <li className="autocomplete__item" key={index}>{suggestion}</li>;
        })}
      </ul>
    </div>
  );
};

export default Autocomplete;
