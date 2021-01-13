import React, { useState } from "react";
import "./autocomplete.css";

const Autocomplete = ({ id, suggestions }) => {
  return (
    <div className="autocomplete">
      <datalist id={id}></datalist>
    </div>
  );
};

export default Autocomplete;
