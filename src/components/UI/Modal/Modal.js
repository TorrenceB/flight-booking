import React from "react";
import Modal from "react-modal";
import ModalListTile from "../ModalListTile/ModalListTile";

import "../Modal/modal.css";

const TripResultModal = (props) => {
  return (
    <div className="modal">
      <Modal isOpen={props.modalIsOpen} onRequestClose={props.onRequestClose}>
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

        {props.tripResults.length > 0 ? (
          props.tripResults.map((trip, index) => {
            return (
              <ModalListTile
                key={index}
                colOneText={trip.carrierName}
                colTwoText={`$${trip.price}`}
                colThreeText={`${trip.isFlightDirect}`}
                buttonText={"Select Flight"}
                onClick={props.onClick}
              />
            );
          })
        ) : (
          <div>
            <h3>There are currently no trips available for selected date</h3>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TripResultModal;
