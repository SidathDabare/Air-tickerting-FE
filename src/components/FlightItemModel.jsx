/** @format */

import React, { useEffect, useState } from "react"
import { Alert, Button, Container, Modal, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "../style/FlightItemModel.css"
import Moment from "moment"
import CloseIcon from "@mui/icons-material/Close"
import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp"
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive"
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"
import FirstPageIcon from "@mui/icons-material/FirstPage"
import TaskAltIcon from "@mui/icons-material/TaskAlt"
import UnpublishedIcon from "@mui/icons-material/Unpublished"
import { useSelector } from "react-redux"
import { getAmadeusToken } from "../redux/actions"
import { getTime } from "../redux/actions"
import { format } from "date-fns"

const FlightItemModel = (props) => {
  const ticket = useSelector(
    (state) => state.selectedTicketReducer.selectedTicket
  )
  //console.log(loggedTopken)
  const navigate = useNavigate()

  const [selectTicket, setSelectTicket] = useState(ticket)
  const [available, setAvailable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")

  // const checkLoggedUser = () => {
  //   if (!loggedTopken) {
  //     navigate("../login")
  //   } else {
  //     console.log("USER LOGGED !!")
  //   }
  // }
  const checkTicketAvailable = async () => {
    //checkLoggedUser()
    let token = await getAmadeusToken()
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    }
    try {
      let res = await fetch(
        `${process.env.REACT_APP_AMADEUS_URL}/v1/shopping/flight-offers/pricing`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            data: {
              type: "flight-offers-pricing",
              flightOffers: [ticket],
            },
          }),
        }
      )
      if (res.ok) {
        let data = await res.json()
        console.log(data)
        setIsLoading(true)
        setAvailable(true)
      } else {
        let data = await res.json()
        if (data.warnings) {
          setAvailable(false)
          setError(true)
          setMessage(data.warnings[0].detail)
          setIsLoading(false)
        } else {
          setError(false)
        }
        if (data.errors) {
          setAvailable(false)
          setError(true)
          setMessage(data.errors[0].detail)
          console.log(data.errors[0].detail)
          setIsLoading(false)
        } else {
          setError(false)
        }
        setError(true)
        setAvailable(false)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setSelectTicket(ticket)
    //console.log(selectTicket)
  }, [ticket, selectTicket, message])
  //const changeTicket = (ticket) => setSelectTicket(ticket)
  return (
    <>
      {selectTicket ? (
        <Modal
          {...props}
          aria-labelledby='contained-modal-title-vcenter'
          className='col-12'>
          <Modal.Header>
            <Modal.Title id='contained-modal-title-vcenter'>
              <h4>Flight details</h4>
            </Modal.Title>
            <span onClick={props.onHide}>
              <CloseIcon />
            </span>
          </Modal.Header>
          <Modal.Body className='show-grid'>
            <div className='depature-details rounded'>
              <h5>Departure Details</h5>
            </div>
            {selectTicket.itineraries[0] &&
              selectTicket.itineraries[0].segments.map((segment, i) => (
                <Container key={i} className='mb-3 col-12'>
                  {/* <Row xs={12} className='d-flex flex-column px-1'>
                <h5 className='mb-0'>
                  <span>From </span>
                  <span>{segment.departure.iataCode} </span>
                  <span>to </span>
                  <span>{segment.arrival.iataCode} </span>
                </h5>
                <p className='mb-0'>
                  <small>
                    Total duration: <span>{getTime(segment.duration)} </span>
                  </small>
                </p>
              </Row> */}
                  <Row className='col-12 flex-column mt-2 info-div mx-auto'>
                    <div className='col-12 d-flex flex-column px-0'>
                      <p className='mb-0'>
                        <small>
                          {format(
                            new Date(segment.departure.at),
                            "MMM do yyyy"
                          )}{" "}
                        </small>

                        <small className='ml-4'>
                          Total duration :{" "}
                          <span>{getTime(segment.duration)} </span>
                        </small>
                      </p>
                      <h6>
                        <p className='mb-0'>
                          <span>{segment.departure.iataCode} </span>
                          <span>to </span>
                          <span>{segment.arrival.iataCode} </span>
                        </p>
                      </h6>
                    </div>

                    <div className='col-12 mt-2 px-0 d-flex info-div-section01'>
                      <div className='col-12 col-xs-12 col-md-6 d-flex px-0 info-div-section01-item01'>
                        <div className='col-3 px-0'>
                          <p className='mb-1'>{segment.departure.iataCode} </p>
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
                          <h5>{Moment(segment.arrival.at).format("HH:mm")} </h5>
                        </div>
                      </div>
                      <div className='col-12 col-xs-12 col-md-6 d-flex px-0 info-div-section01-item02'>
                        <div className='col-6 d-flex'>
                          <div className='col-3 d-flex justify-content-around align-items-center'>
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
                        <div className='col-6'>
                          <small>Aircraft type</small>
                          <h6>Boeing {segment.aircraft.code} </h6>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Container>
              ))}
            {selectTicket.itineraries[1] && (
              <div className='depature-details rounded'>
                <h5>Arrival Details</h5>
              </div>
            )}

            {selectTicket.itineraries[1] &&
              selectTicket.itineraries[1].segments.map((segment, i) => (
                <Container key={i} className='col-12 mb-3'>
                  {/* <Row xs={12} className='d-flex flex-column px-1'>
                <h5 className='mb-0'>
                  <span>From </span>
                  <span>{segment.departure.iataCode} </span>
                  <span>to </span>
                  <span>{segment.arrival.iataCode} </span>
                </h5>
                <p className='mb-0'>
                  <small>
                    Total duration: <span>{getTime(segment.duration)} </span>
                  </small>
                </p>
              </Row> */}
                  <Row className='col-12 flex-column mt-2 info-div mx-auto'>
                    <div className='col-12 d-flex flex-column px-0'>
                      <p className='mb-0'>
                        <small>
                          {format(
                            new Date(segment.departure.at),
                            "MMM do yyyy"
                          )}{" "}
                        </small>

                        <small className='ml-4'>
                          Total duration :{" "}
                          <span>{getTime(segment.duration)} </span>
                        </small>
                      </p>
                      <h6>
                        <p className='mb-0'>
                          <span>{segment.departure.iataCode} </span>
                          <span>to </span>
                          <span>{segment.arrival.iataCode} </span>
                        </p>
                      </h6>
                    </div>

                    <div className='col-12 mt-2 px-0 d-flex info-div-section01'>
                      <div className='col-12 col-x-12 col-md-6 d-flex px-0 '>
                        <div className='col-3 px-0'>
                          <p className='mb-1'>{segment.departure.iataCode} </p>
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
                          <h5>{Moment(segment.arrival.at).format("HH:mm")} </h5>
                        </div>
                      </div>
                      <div className='col-12 col-x-12 col-md-6 d-flex px-0 info-div-section02'>
                        <div className='col-6 d-flex'>
                          <div className='col-3 d-flex justify-content-around align-items-center'>
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
                        <div className='col-6'>
                          <small>Aircraft type</small>
                          <h6>Boeing {segment.aircraft.code} </h6>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Container>
              ))}
          </Modal.Body>
          <Modal.Footer>
            {/* {available ? (
          <Button
            variant='info'
            onClick={() => {
              props.onHide()
              navigate(`/passenger-details`)
            }}
            className='d-flex align-items-center'>
            <span className='mr-2 font-weight-bold'>
              Continue to Passengers
            </span>
            <FlightTakeoffSharpIcon />
          </Button>
        ) : (
          <Button
            variant='info'
            onClick={() => {
              props.onHide()
              navigate(`/`)
            }}
            className='d-flex align-items-center'>
            <span className='mr-2 font-weight-bold'>New Search</span>
            <FirstPageIcon />
          </Button>
        )} */}
            {message ? (
              <Alert variant='danger mx-auto'>
                {message}
                <PriorityHighIcon className='ml-1' />
              </Alert>
            ) : (
              ""
            )}
            <div className='col-12 d-flex justify-content-end px-0 py-1'>
              {available ? (
                <>
                  <Button
                    variant='transparent'
                    className={
                      available ? "d-flex align-items-center" : "d-none"
                    }>
                    <span className='mr-2 text-success font-weight-bold'>
                      Ticket is available
                    </span>

                    <TaskAltIcon className='text-success' />
                  </Button>
                  <Button
                    variant='info'
                    onClick={() => {
                      props.onHide()
                      navigate(`/passenger-details`)
                    }}
                    className='d-flex align-items-center'>
                    <span className='mr-2 font-weight-bold'>
                      Click to continue
                    </span>
                    <FlightTakeoffSharpIcon />
                  </Button>
                </>
              ) : message ? (
                <>
                  <Button
                    variant='transparent'
                    // className={error ? "d-flex align-items-center" : "d-none"}
                    className='d-flex align-items-center'>
                    <span className='mr-2 text-danger font-weight-bold'>
                      Ticket is not available
                    </span>
                    <UnpublishedIcon className='text-danger' />
                  </Button>
                  <Button
                    variant='info'
                    onClick={() => {
                      props.onHide()
                      navigate(`/`)
                    }}
                    className='d-flex align-items-center'>
                    <span className='mr-2 font-weight-bold'>New Search</span>
                    <FirstPageIcon />
                  </Button>
                </>
              ) : (
                ""
              )}
            </div>

            <Button
              variant='info'
              className='d-flex align-items-center py-2'
              onClick={() => {
                checkTicketAvailable()
              }}>
              <span className='mr-2 font-weight-bold'>
                Check Availability..?
              </span>
            </Button>
            {/* {available ? (
          <Button
            variant='info'
            onClick={() => {
              props.onHide()
              navigate(`/passenger-details`)
            }}
            className='d-flex align-items-center'>
            <span className='mr-2 font-weight-bold'>
              Continue to Passengers
            </span>
            <FlightTakeoffSharpIcon />
          </Button>
        ) : (
          <Button
            variant='info'
            onClick={() => {
              props.onHide()
              navigate(`/`)
            }}
            className='d-flex align-items-center'>
            <span className='mr-2 font-weight-bold'>New Search</span>
            <FirstPageIcon />
          </Button>
        )} */}
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </>
  )
}

export default FlightItemModel
