import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Datetime from "react-datetime";

function AddEventModal({ isOpen, onClose, onEventAdded }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [googleMeetURL, setGoogleMeetURL] = useState(""); // Ajout du state pour l'URL Google Meet
  // farouk thanks for the help

  const onSubmit = (event) => {
    event.preventDefault();
    onEventAdded({
      title,
      start,
      end,
      googleMeetURL, // Inclure l'URL Google Meet dans l'objet passé à onEventAdded
    });
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un événement

</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="mb-3 form-control"
            placeholder="Titre de l'événement"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <label>date de début</label>
            <Datetime
              className="mb-3 form-control"
              value={start}
              onChange={(date) => setStart(date)}
            />
          </div>
          <div>
            <label>date de fin</label>
            <Datetime
              className="mb-3 form-control"
              value={end}
              onChange={(date) => setEnd(date)}
            />
          </div>
          {/* Champ d'entrée pour l'URL Google Meet */}
          <input
            type="text"
            className="mb-3 form-control"
            placeholder="Google Meet URL"
            value={googleMeetURL}
            onChange={(e) => setGoogleMeetURL(e.target.value)}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          fermer
        </Button>
        <Button variant="primary" onClick={onSubmit}>
        enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEventModal;
