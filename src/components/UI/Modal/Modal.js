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

        {props.tripResults.map((trip, index) => {
          return (
            <div className="row" key={index}>
              <div className="col">
                <h4>Allegiant</h4>
              </div>
              <div className="col">
                <h4>${trip.price}</h4>
              </div>
              <div className="col">
                <h4>{`${trip.isFlightDirect}`}</h4>
              </div>
              <div className="col">
                <button>Select Flight</button>
              </div>
            </div>
          );
        })}
      </Modal>
    </div>
  );
};

export default TripResultModal;
