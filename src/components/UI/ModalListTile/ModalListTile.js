import React from "react";

import "../ModalListTile/modallisttile.css";

const ModalListTile = (props) => {
  return (
    <div className="row">
      <div className="col">
        <h4>{props.colOneText}</h4>
      </div>
      <div className="col">
        <h4>{props.colTwoText}</h4>
      </div>
      <div className="col">
        <h4>{props.colThreeText}</h4>
      </div>
      <div className="col">
        <button>{props.buttonText}</button>
      </div>
    </div>
  );
};

export default ModalListTile;
