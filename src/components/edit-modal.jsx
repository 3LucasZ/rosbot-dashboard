import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        <i class="bi bi-pencil-square"></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Widget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>
              {"Topic: "}
              <input
                type="text"
                value={props.widget.name}
                onChange={(e) => props.handlers.onEditTopic(props.widget, e)}
              />
            </label>
            <br />
            <label>
              {"Type: "}
              <input
                type="text"
                value={props.widget.datatype}
                onChange={(e) => props.handlers.onEditDatatype(props.widget, e)}
              />
            </label>
            <br />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              props.handlers.onSaveTopic(props.widget);
              handleClose();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
