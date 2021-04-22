import React from "react";
import Modal from "react-modal";

import "../Modal/modal.css";

const TripResultModal = (props) => {
  return (
    <div className="modal">
      <Modal isOpen={props.modalIsOpen}>
        <h1 className="modal-header">Trip Results</h1>
        <div className="row">
          <div className="col">
            <h2>{props.origin}</h2>
          </div>
          <div className="col">
            <h2>{props.destination}</h2>
          </div>
          <div className="col">
            <h2>{props.departureDate}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4>{props.carrier}</h4>
          </div>
          <div className="col">
            <h4>${props.price}</h4>
          </div>
          <div className="col">
            <h4>{props.direct}</h4>
          </div>
          <div className="col">
            <button>Select Flight</button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4>Delta Airlines</h4>
          </div>
          <div className="col">
            <h4>$260</h4>
          </div>
          <div className="col">
            <h4>Connecting</h4>
          </div>
          <div className="col">
            <button>Select Flight</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TripResultModal;
