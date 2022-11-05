/** @format */

import React, { useEffect, useState } from "react"
import { format, parseISO } from "date-fns"

import Modal from "react-bootstrap/Modal"
import CloseIcon from "@mui/icons-material/Close"
import { getTime } from "../redux/actions"
import WhereToVoteOutlinedIcon from "@mui/icons-material/WhereToVoteOutlined"
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined"
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive"
import Moment from "moment"
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
          <Modal.Body className='col-12 mx-auto d-flex flex-column justify-content-center'>
            {ticket.map((item, i) => (
              <div
                key={i}
                className='col-12 col-xs-12 col-md-8 d-flex connection-item'>
                <div className='col-2 d-flex justify-content-center align-items-center'>
                  <img
                    className='connection-carrier-img'
                    src={`${process.env.REACT_APP_AIRLINE_LOGO_URL}/airlines_${item.carrierCode}_18_16_t.png?background=fffff`}
                    alt=''
                  />
                </div>
                <div className='col-3 px-0'>
                  <p className='mb-1'>{item.departure.iataCode} </p>
                  <h5>{Moment(item.departure.at).format("HH:mm")} </h5>
                </div>
                <div className='col-4 d-flex flex-column'>
                  <div className='col-12 d-flex justify-content-center align-items-center px-0'>
                    <AirplanemodeActiveIcon className='AirplanemodeActiveIcon' />
                    <div className='single-line'></div>
                    <div className='circle'></div>
                  </div>
                  <div className='col-12 d-flex justify-content-center text-secondary'>
                    <small style={{ marginTop: "-28px", fontSize: "12px" }}>
                      {getTime(item.duration)}
                    </small>
                  </div>
                </div>

                <div className='col-3 px-0 text-right'>
                  <p className='mb-1'>{item.arrival.iataCode}</p>
                  <h5>{Moment(item.arrival.at).format("HH:mm")} </h5>
                </div>
              </div>
              // <div
              //   key={i}
              //   className='d-flex align-items-center connection-item'>
              //   <div className='d-flex flex-column align-items-center mx-auto px-1 connection-item-section-01'>
              //     {" "}
              //     <img
              //       className='carrier-img'
              //       src={`${process.env.REACT_APP_AIRLINE_LOGO_URL}/airlines_${item.carrierCode}_18_16_t.png?background=fffff`}
              //       alt=''
              //     />{" "}
              //     <h5 className='mt-2'>{item.departure.iataCode}</h5>
              //   </div>
              //   <div className='d-flex flex-column connection-item-section-02'>
              //     <div className='d-flex align-items-center justify-content-between mx-auto px-2'>
              //       <div className='lines'></div>
              //       <FlightTakeoffOutlinedIcon className='px-1' />
              //       <div className='lines'></div>
              //     </div>
              //     <div className='d-flex justify-content-center text-secondary'>
              //       <small style={{ marginTop: "-5px", fontSize: "12px" }}>
              //         {getTime(item.duration)}
              //       </small>
              //     </div>
              //   </div>
              // </div>
            ))}
            {/* <div className='d-flex flex-column align-items-center text-success'>
              <span style={{ marginTop: "-10px" }}>
                <WhereToVoteOutlinedIcon />
              </span>
              <h5 className='mb-1 mt-1'>
                {ticket[ticket.length - 1].arrival.iataCode}
              </h5>{" "}
            </div> */}
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
