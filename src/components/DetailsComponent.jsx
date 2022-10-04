/** @format */

import React, { useEffect } from "react"
import { useState } from "react"
import { Button, Container, Modal, Row } from "react-bootstrap"
import { useSelector } from "react-redux"

import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive"
import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp"
import Moment from "moment"
import Loader from "./Loader"
import AddPassengerDetails from "./AddPassengerDetails"

const DetailsComponent = () => {
  const userDetails = useSelector((state) => state.userReducer.loggedInUser)
  const ticket = useSelector(
    (state) => state.selectedTicketReducer.selectedTicket
  )

  const [selectTicket, setSelectTicket] = useState(null)
  const [passengerDetails, setPassengerDetails] = useState(null)
  const [modalShow, setModalShow] = useState(false)

  const getTime = (str) => {
    let numbers = str.slice(2, str.length).toLowerCase()
    let firstNumbers = numbers.slice(0, 2)
    let secondNumbers = numbers.slice(2, 4)
    //console.log(firstNumbers)
    return (
      firstNumbers +
      " " +
      (secondNumbers !== "" ? secondNumbers + "m" : secondNumbers + "00m")
    )
  }
  useEffect(() => {
    setSelectTicket(ticket)
  }, [])
  return (
    <Container className='bg-light mt-2 rounded col-12 col-xs-12 col-md-8'>
      {ticket === null ? (
        <div
          className='text-center rounded px-0'
          style={{ backgroundColor: "#002741f0" }}>
          <Loader />
        </div>
      ) : (
        <>
          {ticket &&
            ticket.itineraries &&
            ticket.itineraries[0] &&
            ticket.itineraries.length > 0 && (
              <>
                <div>
                  <div id='contained-modal-title-vcenter d-flex justify-content-between'>
                    <div className='d-flex justify-content-between'>
                      <h4>Ticket details</h4>{" "}
                      <Button
                        variant='primary'
                        onClick={() => setModalShow(true)}>
                        Launch modal with grid
                      </Button>
                      <AddPassengerDetails
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                    </div>
                  </div>
                </div>
                <div className='show-grid'>
                  <div className='col-12 d-flex justify-content-between px-0'>
                    <div className='d-flex col-6 col-xs-6 col-md-6 col-lg-5 px-0 mb-3'>
                      <div className='user-info-left text-left col-4 px-0'>
                        <p className='mb-0'>Full name :</p>
                        <p className='my-0'>
                          <small>Email :</small>
                        </p>
                        <p className='my-0'>
                          <small>Passport no :</small>
                        </p>
                      </div>
                      <div className='user-info-right col-8 px-0 text-right'>
                        <p className='mb-0'>
                          {userDetails.firstName} {userDetails.lastName}
                        </p>
                        <p className='my-0'>
                          <small>{userDetails.email}</small>
                        </p>
                        <p className='my-0'>
                          <small>{userDetails.passport}</small>
                        </p>
                      </div>
                    </div>
                    <div className='col-6 col-xs-6 col-md-6 col-lg-5 text-right pr-0'>
                      <h5 className='my-0'>
                        Price : {ticket.price.currency} {ticket.price.total}
                      </h5>
                      <p className='my-0'>
                        Passenger : {ticket.travelerPricings.length}{" "}
                        {ticket.travelerPricings[0].travelerType}
                      </p>
                      <p className='mb-0'>
                        <small>Baggage 40kg</small>
                      </p>
                    </div>
                  </div>

                  <div className='depature-details rounded'>
                    <h5>Departure Details</h5>
                  </div>
                  {ticket.itineraries[0].segments.map((segment, i) => (
                    <Container key={i} xs={12} className='mb-3'>
                      <Row xs={12} className='d-flex flex-column px-1'>
                        <h5 className='mb-0'>
                          <span>From </span>
                          <span>{segment.departure.iataCode} </span>
                          <span>to </span>
                          <span>{segment.arrival.iataCode} </span>
                        </h5>
                        <p className='mb-0'>
                          <small>
                            Total duration:{" "}
                            <span>{getTime(segment.duration)} </span>
                          </small>
                        </p>
                      </Row>
                      <Row xs={12} className='flex-column mt-2 info-div'>
                        <div xs={12} className='d-flex flex-column'>
                          <small>
                            {Moment(segment.departure.at).format("MMM Do YY")}{" "}
                          </small>
                          <h6>
                            <span>{segment.departure.iataCode} </span>
                            <span>to </span>
                            <span>{segment.arrival.iataCode} </span>
                          </h6>
                        </div>
                        <div xs={12} className='mt-2 px-0 d-flex flex-wrap'>
                          <div className='col-12 col-xs-12 col-md-6 d-flex px-3 border-top pt-1'>
                            <div className='col-3 '>
                              <p className='mb-1'>
                                {segment.departure.iataCode}{" "}
                              </p>
                              <h5>
                                {Moment(segment.departure.at).format("HH:mm")}{" "}
                              </h5>
                            </div>
                            <div className='col-6 d-flex justify-content-center align-items-center px-0'>
                              <AirplanemodeActiveIcon className='AirplanemodeActiveIcon' />
                              <div className='single-line'></div>
                              <div className='circle'></div>
                            </div>
                            <div className='col-3 px-0 text-right'>
                              <p className='mb-1'>{segment.arrival.iataCode}</p>
                              <h5>
                                {Moment(segment.arrival.at).format("HH:mm")}{" "}
                              </h5>
                            </div>
                          </div>
                          <div className='col-12 col-xs-12 col-md-6 d-flex px-0 border-top pt-1'>
                            <div className='col-6 d-flex'>
                              <div className='col-3 d-flex justify-content-around align-items-center pl-0 pt-2'>
                                <img
                                  className='carrier-img-model'
                                  src={`https://content.airhex.com/content/logos/airlines_${segment.carrierCode}_22_27_t.png?background=fffff`}
                                  alt=''
                                />
                              </div>
                              <div className='col-9 px-0'>
                                <small>Flight number</small>
                                <h6>
                                  {segment.carrierCode} {segment.number}
                                </h6>
                              </div>
                            </div>
                            <div className='col-6 text-right'>
                              <small>Aircraft type</small>
                              <h6>Boeing {segment.aircraft.code} </h6>
                            </div>
                          </div>
                        </div>
                      </Row>
                    </Container>
                  ))}
                  {ticket.itineraries[1] && (
                    <>
                      <div className='depature-details rounded'>
                        <h5>Arrival Details</h5>
                      </div>{" "}
                      {ticket.itineraries[1].segments.map((segment, i) => (
                        <Container key={i} xs={12} className='mb-3'>
                          <Row xs={12} className='d-flex flex-column px-1'>
                            <h5 className='mb-0'>
                              <span>From </span>
                              <span>{segment.departure.iataCode} </span>
                              <span>to </span>
                              <span>{segment.arrival.iataCode} </span>
                            </h5>
                            <p className='mb-0'>
                              <small>
                                Total duration:{" "}
                                <span>{getTime(segment.duration)} </span>
                              </small>
                            </p>
                          </Row>
                          <Row xs={12} className='flex-column mt-2 info-div'>
                            <div xs={12} className='d-flex flex-column'>
                              <small>
                                {Moment(segment.departure.at).format(
                                  "MMM Do YY"
                                )}{" "}
                              </small>
                              <h6>
                                <span>{segment.departure.iataCode} </span>
                                <span>to </span>
                                <span>{segment.arrival.iataCode} </span>
                              </h6>
                            </div>
                            <div xs={12} className='mt-2 px-0 d-flex flex-wrap'>
                              <div className='col-12 col-xs-12 col-md-6 d-flex px-3  border-top pt-1'>
                                <div className='col-3 px-0'>
                                  <p className='mb-1'>
                                    {segment.departure.iataCode}{" "}
                                  </p>
                                  <h5>
                                    {Moment(segment.departure.at).format(
                                      "HH:mm"
                                    )}{" "}
                                  </h5>
                                </div>
                                <div className='col-6 d-flex justify-content-center align-items-center px-0'>
                                  <AirplanemodeActiveIcon className='AirplanemodeActiveIcon' />
                                  <div className='single-line'></div>
                                  <div className='circle'></div>
                                </div>
                                <div className='col-3 px-0 text-right'>
                                  <p className='mb-1'>
                                    {segment.arrival.iataCode}
                                  </p>
                                  <h5>
                                    {Moment(segment.arrival.at).format("HH:mm")}{" "}
                                  </h5>
                                </div>
                              </div>
                              <div className='col-12 col-xs-12 col-md-6 d-flex px-0  border-top pt-1'>
                                <div className='col-6 d-flex'>
                                  <div className='col-3 d-flex justify-content-around align-items-center pl-0 pt-2'>
                                    <img
                                      className='carrier-img-model'
                                      src={`https://content.airhex.com/content/logos/airlines_${segment.carrierCode}_22_27_t.png?background=fffff`}
                                      alt=''
                                    />
                                  </div>
                                  <div className='col-9 px-0'>
                                    <small>Flight number</small>
                                    <h6>
                                      {segment.carrierCode} {segment.number}
                                    </h6>
                                  </div>
                                </div>
                                <div className='col-6 text-right'>
                                  <small>Aircraft type</small>
                                  <h6>Boeing {segment.aircraft.code} </h6>
                                </div>
                              </div>
                            </div>
                          </Row>
                        </Container>
                      ))}
                    </>
                  )}
                </div>
                <div>
                  <Button
                    variant='warning'
                    className='d-flex align-items-center'>
                    <span className='mr-2'>Confirm to continue</span>
                    <FlightTakeoffSharpIcon />
                  </Button>
                </div>
              </>
            )}
        </>
      )}
    </Container>
  )
}

export default DetailsComponent
