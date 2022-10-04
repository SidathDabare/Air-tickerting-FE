/** @format */

import React, { useEffect, useState } from "react"
import { Button, Container, Modal, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "../style/FlightItemModel.css"
import Moment from "moment"

import CloseIcon from "@mui/icons-material/Close"
import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp"
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive"
import CheckIcon from "@mui/icons-material/Check"
import SmsFailedIcon from "@mui/icons-material/SmsFailed"
import FirstPageIcon from "@mui/icons-material/FirstPage"
import { useSelector } from "react-redux"
import { getAmadeusToken } from "../redux/actions"

const FlightItemModel = (props) => {
  const ticket = useSelector(
    (state) => state.selectedTicketReducer.selectedTicket
  )

  const navigate = useNavigate()

  const [selectTicket, setSelectTicket] = useState(null)
  const [available, setAvailable] = useState(false)
  const [error, setError] = useState(false)

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
  const checkTicketAvailable = async () => {
    let token = await getAmadeusToken()
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    }

    try {
      let res = await fetch(
        `https://test.api.amadeus.com/v1/shopping/flight-offers/pricing`,
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
        if (data.warnings) {
          setAvailable(false)
        } else {
          setAvailable(true)
        }
      } else {
        setError(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setSelectTicket(ticket)
    //console.log(selectTicket)
  }, [ticket, selectTicket])
  //const changeTicket = (ticket) => setSelectTicket(ticket)
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          <h4>Flight details</h4>
        </Modal.Title>
        <span onClick={props.onHide}>
          <CloseIcon />
        </span>
      </Modal.Header>
      <Modal.Body className='show-grid'>
        <div className='depature-details'>
          <h5>Departure Details</h5>
        </div>
        {props.listitem.itineraries[0] &&
          props.listitem.itineraries[0].segments.map((segment, i) => (
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
                    Total duration: <span>{getTime(segment.duration)} </span>
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
                <div xs={12} className='mt-2 px-0 d-flex'>
                  <div className='col-6 d-flex px-0'>
                    <div className='col-3 px-0'>
                      <p className='mb-1'>{segment.departure.iataCode} </p>
                      <h5>{Moment(segment.departure.at).format("HH:mm")} </h5>
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
                  <div className='col-6 d-flex px-0'>
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
        {props.listitem.itineraries[1] && (
          <div className='depature-details'>
            <h5>Arrival Details</h5>
          </div>
        )}

        {props.listitem.itineraries[1] &&
          props.listitem.itineraries[1].segments.map((segment, i) => (
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
                    Total duration: <span>{getTime(segment.duration)} </span>
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
                <div xs={12} className='mt-2 px-0 d-flex'>
                  <div className='col-6 d-flex px-0'>
                    <div className='col-3 px-0'>
                      <p className='mb-1'>{segment.departure.iataCode} </p>
                      <h5>{Moment(segment.departure.at).format("HH:mm")} </h5>
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
                  <div className='col-6 d-flex px-0'>
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
        {available ? (
          <Button
            variant='dark'
            className={available ? "d-flex align-items-center" : "d-none"}>
            <span className='mr-2 text-success font-weight-bold'>
              Ticket is available
            </span>

            <CheckIcon className='text-success' />
          </Button>
        ) : (
          <Button
            variant='dark'
            className={error ? "d-flex align-items-center" : "d-none"}>
            <span className='mr-2 text-warning font-weight-bold'>
              Ticket is not available
            </span>
            <SmsFailedIcon className='text-warning' />
          </Button>
        )}

        <Button
          variant='warning'
          className='d-flex align-items-center'
          onClick={() => {
            checkTicketAvailable()
          }}>
          <span className='mr-2 font-weight-bold'>Check Availability..?</span>
        </Button>
        {available ? (
          <Button
            variant='warning'
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
            variant='warning'
            onClick={() => {
              props.onHide()
              navigate(`/`)
            }}
            className='d-flex align-items-center'>
            <span className='mr-2 font-weight-bold'>Edit Search</span>
            <FirstPageIcon />
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default FlightItemModel
