import React from "react";
import Modal from "react-modal";
import ModalListTile from "../ModalListTile/ModalListTile";

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
            <ModalListTile
              key={index}
              colOneText={"Allegiant"}
              colTwoText={`$${trip.price}`}
              colThreeText={`${trip.isFlightDirect}`}
              buttonText={"Select Flight"}
            />
          );
        })}
      </Modal>
    </div>
  );
};

export default TripResultModal;
