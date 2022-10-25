/** @format */

import React, { useEffect, useState } from "react"
import { format, parseISO } from "date-fns"

import Modal from "react-bootstrap/Modal"
import CloseIcon from "@mui/icons-material/Close"
import { getTime } from "../redux/actions"
import WhereToVoteOutlinedIcon from "@mui/icons-material/WhereToVoteOutlined"
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined"
import "../style/ConnectionComponent.css"
import { useSelector } from "react-redux"
import moment from "moment"
import Loader from "./Loader"
import { Button } from "react-bootstrap"

const ConnectionComponents = (props) => {
  const ticket = useSelector(
    (state) => state.selectedTicketSegmentsReducer.selectedTicketSegments
  )
  //console.log(props.listitem)
  const [selectTicket, setSelectTicket] = useState([])
  //console.log(item)
  useEffect(() => {
    //setSelectTicket([...ticket])
  }, [ticket])
  return (
    <>
      {ticket[0] ? (
        <Modal
          {...props}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered
          className='col-12'>
          <Modal.Header>
            <Modal.Title id='contained-modal-title-vcenter'>
              <span>From {ticket[0].departure.iataCode}</span>
              <span> to {ticket[ticket.length - 1].arrival.iataCode}</span>
              <span className='ml-3 text-truncate'>
                <small style={{ fontSize: "14px" }}>
                  at{" "}
                  {moment(ticket[0].departure.at).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                </small>
              </span>
            </Modal.Title>
            <span onClick={props.onHide}>
              <CloseIcon />
            </span>
          </Modal.Header>{" "}
          <Modal.Body className='col-11 mx-auto d-flex justify-content-center px-4'>
            {ticket.map((item, i) => (
              <div key={i} className='d-flex align-items-center'>
                <div className='d-flex flex-column align-items-center mx-auto px-1'>
                  {" "}
                  <img
                    className='carrier-img'
                    src={`${process.env.REACT_APP_AIRLINE_LOGO_URL}/airlines_${item.carrierCode}_18_16_t.png?background=fffff`}
                    alt=''
                  />{" "}
                  <h5 className='mt-2'>{item.departure.iataCode}</h5>
                </div>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center justify-content-between mx-auto px-2'>
                    <div className='lines'></div>
                    <FlightTakeoffOutlinedIcon className='px-1' />
                    <div className='lines'></div>
                  </div>
                  <div className='d-flex justify-content-center text-secondary'>
                    <small style={{ marginTop: "-5px", fontSize: "12px" }}>
                      {getTime(item.duration)}
                    </small>
                  </div>
                </div>
              </div>
            ))}
            <div className='d-flex flex-column align-items-center text-success'>
              <span style={{ marginTop: "-10px" }}>
                <WhereToVoteOutlinedIcon />
              </span>
              <h5 className='mb-1 mt-1'>
                {ticket[ticket.length - 1].arrival.iataCode}
              </h5>{" "}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </>
  )
}

export default ConnectionComponents
