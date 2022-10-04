/** @format */

import React from "react"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import CloseIcon from "@mui/icons-material/Close"

const AddPassengerDetails = (props) => {
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Using Grid in Modal
        </Modal.Title>
        <span onClick={props.onHide}>
          <CloseIcon />
        </span>
      </Modal.Header>
      <Modal.Body className='show-grid'>
        <Container>
          <Row></Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddPassengerDetails
