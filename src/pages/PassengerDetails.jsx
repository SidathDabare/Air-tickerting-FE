/** @format */

import React, { useEffect, useState } from "react"
import { Button, Container } from "react-bootstrap"
import StepComponent from "../components/StepComponent"
import MyNavbar from "../components/MyNavbar"
import SummeryContainer from "../components/SummeryContainer"
import Accordion from "react-bootstrap/Accordion"
import Footer from "../components/Footer"
import AddIcon from "@mui/icons-material/Add"
import "../style/PassengerDetails.css"
import { MenuItem, TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { format } from "date-fns"
import {
  getAmadeusToken,
  getTime,
  setBookedTicket,
  setPassengerDetailsAction,
} from "../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import PassengerDetailsEdit from "../components/PassengerDetailsEdit"
import ClearIcon from "@mui/icons-material/Clear"
import Moment from "moment"
import { Col, Row } from "react-bootstrap"
import ConnectingAirportsOutlinedIcon from "@mui/icons-material/ConnectingAirportsOutlined"
import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp"
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader"

const PassengerDetails = () => {
  const ticket = useSelector(
    (state) => state.selectedTicketReducer.selectedTicket
  )
  const passengerDetails = useSelector(
    (state) => state.passengerDetailsReducer.passengerDetails
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [makeBooking, setMakeBooking] = useState(null)
  const [selectTicket, setSelectTicket] = useState(null)
  const [passengers, setPassengers] = useState([])
  const [showPassengerDetails, setShowPassengerDetails] = useState(false)
  const [error, setError] = useState(false)
  const [disable, setDisable] = useState(false)
  const [loader, setLoader] = useState(false)

  const [title, setTitle] = useState("MALE")
  const [firstName, setFirstName] = useState("John")
  const [lastName, setLastName] = useState("Doe")
  const [birthday, setBirthDay] = useState("1990-04-13")
  const [email, setEmail] = useState("john@email.com")
  const [countryCode, setCountryCode] = useState("39")
  const [phoneNumber, setPhoneNumber] = useState("3154154151")
  const [passport, setPassport] = useState("P15151515")
  const [birthPlace, setBirthPlace] = useState("Italy")

  const traveler = {
    id: passengerDetails.length + 1,
    dateOfBirth: birthday,
    name: {
      firstName: firstName,
      lastName: lastName,
    },
    gender: title,
    contact: {
      emailAddress: email,
      phones: [
        {
          deviceType: "MOBILE",
          countryCallingCode: countryCode,
          number: phoneNumber,
        },
      ],
    },
    documents: [
      {
        documentType: "PASSPORT",
        birthPlace: birthPlace,
        issuanceLocation: "Madrid",
        issuanceDate: "2015-04-14",
        number: passport,
        expiryDate: "2025-04-14",
        issuanceCountry: "ES",
        validityCountry: "ES",
        nationality: "ES",
        holder: true,
      },
    ],
  }

  const addPassengerDetails = (e) => {
    e.preventDefault()
    dispatch(setPassengerDetailsAction(traveler))
    setShowPassengerDetails(!showPassengerDetails)
  }

  // const makeTicketBooking = async () => {
  //   navigate(`/payment`)
  // }
  const makeTicketBooking = async () => {
    let token = await getAmadeusToken()
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    }
    try {
      let res = await fetch(
        `${process.env.REACT_APP_AMADEUS_URL}/v1/booking/flight-orders`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            data: {
              type: "flight-offers-pricing",
              flightOffers: [ticket],
              travelers: [...passengerDetails],
              remarks: {
                general: [
                  {
                    subType: "GENERAL_MISCELLANEOUS",
                    text: "ONLINE BOOKING FROM INCREIBLE VIAJES",
                  },
                ],
              },
              ticketingAgreement: {
                option: "DELAY_TO_CANCEL",
                delay: "6D",
              },
              contacts: [
                {
                  addresseeName: {
                    firstName: "PABLO",
                    lastName: "RODRIGUEZ",
                  },
                  companyName: "INCREIBLE VIAJES",
                  purpose: "STANDARD",
                  phones: [
                    {
                      deviceType: "LANDLINE",
                      countryCallingCode: "34",
                      number: "480080071",
                    },
                    {
                      deviceType: "MOBILE",
                      countryCallingCode: "33",
                      number: "480080072",
                    },
                  ],
                  emailAddress: "support@increibleviajes.es",
                  address: {
                    lines: ["Calle Prado, 16"],
                    postalCode: "28014",
                    cityName: "Madrid",
                    countryCode: "ES",
                  },
                },
              ],
            },
          }),
        }
      )
      if (res.ok) {
        let data = await res.json()
        console.log(data)
        setLoader(false)
        if (data.warnings) {
          setMakeBooking(false)
        } else {
          setMakeBooking(true)
        }
        dispatch(setBookedTicket(data))
        navigate(`/payment`)
      } else {
        setLoader(true)
        setError(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (passengerDetails.length >= ticket.travelerPricings.length) {
      setDisable(false)
    } else {
      setDisable(true)
    }
    setSelectTicket(ticket)
    setPassengers([...passengerDetails])
    //console.log(selectTicket)
    console.log(passengerDetails.length)
    console.log(passengers.length)
  }, [ticket, selectTicket, passengerDetails, disable])

  return (
    <div>
      {loader ? (
        <Container>
          <Loader />
        </Container>
      ) : (
        ""
      )}
      <MyNavbar />
      <Container>
        <SummeryContainer />
        <StepComponent ticketSelect={true} passenger={true} />
        <div className='add-details-div'>
          <div className='add-passeger-div px-3'>
            <h5 className='text-light'>Passenger List</h5>
            <button
              //disabled={disable === true ? true : false}
              className={
                disable === true ? "add-passenger-btn bg-info" : "d-none"
              }
              onClick={() => setShowPassengerDetails(!showPassengerDetails)}>
              <span className='align-items-center'>
                {showPassengerDetails ? <ClearIcon /> : <AddIcon />}
              </span>
              <span className='ml-2'>Add passenger details</span>
            </button>
          </div>

          <div
            className={
              showPassengerDetails ? "show-add-passenger-details" : "d-none"
            }>
            <div className='px-2 passenger-add-details'>
              <div className='col-12 py-1 mt-1'>
                <h5 className='mb-0'>Passenger Details</h5>
              </div>
              <div className='col-12 py-2 mt-1'>
                <TextField
                  className='col-12 col-xs-6 col-md-4  passeneger-details-input px-1'
                  label='Title'
                  select
                  size='small'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}>
                  <MenuItem value='MALE'>Mr</MenuItem>
                  <MenuItem value='FEMALE'>Miss</MenuItem>
                </TextField>
              </div>
              <div className='col-12 py-2 mt-1 passeneger-details-section02'>
                <TextField
                  size='small'
                  id='outlined-basic'
                  label='Firstname'
                  value={firstName}
                  variant='outlined'
                  className='col-6 col-xs-6 col-md-4 px-1 mb-3'
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  size='small'
                  id='outlined-basic'
                  value={lastName}
                  label='Lastname'
                  variant='outlined'
                  className='col-6 col-xs-6 col-md-4 px-1 mb-3'
                  onChange={(e) => setLastName(e.target.value)}
                />

                <DatePicker
                  size='small'
                  className='col-6 col-xs-6 col-md-4 px-1 mb-3'
                  label='Birthday'
                  variant='outlined'
                  value={birthday}
                  onChange={(newValue) => {
                    setBirthDay(format(newValue, "yyyy-MM-dd"))
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size='small'
                      className='col-6 col-xs-6 col-md-4 px-1'
                    />
                  )}
                />

                <TextField
                  size='small'
                  id='outlined-basic'
                  value={email}
                  label='Email'
                  variant='outlined'
                  className='col-6 col-xs-6 col-md-4 px-1 mb-3'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className='col-6 col-xs-6 col-md-4 px-1 mb-3'>
                  <TextField
                    size='small'
                    id='outlined-basic'
                    label='Country'
                    value={countryCode}
                    variant='outlined'
                    className='col-4 pr-1'
                    onChange={(e) => setCountryCode(e.target.value)}
                  />
                  <TextField
                    size='small'
                    id='outlined-basic'
                    label='Number'
                    value={phoneNumber}
                    variant='outlined'
                    className='col-8'
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className='col-12 py-1 mt-1'>
                <h5 className='mb-0'>Passport Details</h5>
              </div>
              <div className='col-12 py-2 mt-1 d-inline-block'>
                <TextField
                  size='small'
                  id='outlined-basic'
                  label='Passport number'
                  value={passport}
                  variant='outlined'
                  className='col-6 col-xs-6 col-md-4 px-1 mb-3'
                  onChange={(e) => setPassport(e.target.value)}
                />
                <TextField
                  size='small'
                  id='outlined-basic'
                  value={birthPlace}
                  label='Birth place'
                  variant='outlined'
                  className='col-6 col-xs-6 col-md-4 px-1 mb-3'
                  onChange={(e) => setBirthPlace(e.target.value)}
                />
                <Button
                  type='submit'
                  className='col-12 col-xs-6 col-md-4 px-1 mb-3'
                  onClick={addPassengerDetails}>
                  Add Details
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Accordion>
          {passengers ? (
            passengers.map((passenger, index) => (
              <PassengerDetailsEdit
                passenger={passenger}
                index={index}
                key={index}
                setDisable={setDisable}
              />
            ))
          ) : (
            <div>No data</div>
          )}
        </Accordion>
        <div>
          {ticket ? (
            <>
              <div className='d-flex justify-content-center mt-2 passenger-flight-list-header1 py-2'>
                <FlightTakeoffSharpIcon />
                <h6 className='mb-0 mx-2'>Outbound,</h6>
              </div>

              <Col xs={12} className='bg-light text-dark passenger-detail-item'>
                <Row className='d-flex justify-content-between align-items-center section01 pt-1 pb-3'>
                  <div className='pl-3'>
                    <small className='font-weight-bold'>
                      {ticket.id}
                      <span> </span>
                    </small>
                    <small>
                      {Moment(
                        ticket.itineraries[0].segments[0].departure.at
                      ).format("MMM Do YY")}{" "}
                    </small>
                  </div>
                  <div className='d-flex align-items-center'>
                    {ticket.itineraries[0].segments.map((segment, i) => (
                      <div key={i} className='px-1 mr-2'>
                        <span>
                          <img
                            className='carrier-img'
                            src={`https://content.airhex.com/content/logos/airlines_${segment.carrierCode}_18_16_t.png?background=fffff`}
                            alt=''
                          />
                        </span>
                        <small className='font-weight-bold'>
                          <span className='ml-2'>{segment.carrierCode} </span>{" "}
                          <span>{segment.number}</span>
                        </small>
                      </div>
                    ))}
                  </div>
                </Row>
                <Row
                  xs={12}
                  className='d-flex justify-content-between align-items-center px-3 mt-4 pb-3'>
                  <div xs={3} className='w-25'>
                    <p>
                      {ticket.itineraries[0].segments[0].departure.iataCode}
                    </p>
                    <h4>
                      {Moment(
                        ticket.itineraries[0].segments[0].departure.at
                      ).format("HH:mm")}
                    </h4>
                  </div>
                  <div xs={6} className='w-50'>
                    <div className='text-center'>
                      <small>{getTime(ticket.itineraries[0].duration)}</small>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                      <div className='line'></div>
                      <ConnectingAirportsOutlinedIcon />
                      <div className='line'></div>
                    </div>
                    <div className='text-center'>
                      <small className='connection'>
                        {ticket.itineraries[0].segments.length} connection
                      </small>
                    </div>
                  </div>
                  <div xs={3} className='w-25 text-right'>
                    <p>
                      {
                        ticket.itineraries[0].segments[
                          ticket.itineraries[0].segments.length - 1
                        ].arrival.iataCode
                      }
                    </p>
                    <h4>
                      {Moment(
                        ticket.itineraries[0].segments[
                          ticket.itineraries[0].segments.length - 1
                        ].arrival.at
                      ).format("HH:mm")}
                    </h4>
                  </div>
                </Row>
              </Col>
              {ticket.itineraries[1] ? (
                <>
                  <div className='d-flex justify-content-center mt-2 passenger-flight-list-header1 py-2'>
                    <FlightTakeoffSharpIcon />
                    <h6 className='mb-0 mx-2'>Intbound,</h6>
                  </div>
                  <Col
                    xs={12}
                    className='bg-light text-dark passenger-detail-item'>
                    <Row className='d-flex justify-content-between align-items-center section01 pt-1 pb-3'>
                      <div className='pl-3'>
                        <small className='font-weight-bold'>
                          {ticket.id}
                          <span> </span>
                        </small>
                        <small>
                          {Moment(
                            ticket.itineraries[1].segments[0].departure.at
                          ).format("MMM Do YY")}{" "}
                        </small>
                      </div>
                      <div className='d-flex align-items-center'>
                        {ticket.itineraries[1].segments.map((segment, i) => (
                          <div key={i} className='px-1 mr-2'>
                            <span>
                              <img
                                className='carrier-img'
                                src={`https://content.airhex.com/content/logos/airlines_${segment.carrierCode}_18_16_t.png?background=fffff`}
                                alt=''
                              />
                            </span>
                            <small className='font-weight-bold'>
                              <span className='ml-2'>
                                {segment.carrierCode}{" "}
                              </span>{" "}
                              <span>{segment.number}</span>
                            </small>
                          </div>
                        ))}
                      </div>
                    </Row>
                    <Row
                      xs={12}
                      className='d-flex justify-content-between align-items-center px-3 mt-4 pb-3'>
                      <div xs={3} className='w-25'>
                        <p>
                          {ticket.itineraries[1].segments[0].departure.iataCode}
                        </p>
                        <h4>
                          {Moment(
                            ticket.itineraries[1].segments[0].departure.at
                          ).format("HH:mm")}
                        </h4>
                      </div>
                      <div xs={6} className='w-50'>
                        <div className='text-center'>
                          <small>
                            {getTime(ticket.itineraries[1].duration)}
                          </small>
                        </div>
                        <div className='d-flex justify-content-center align-items-center'>
                          <div className='line'></div>
                          <ConnectingAirportsOutlinedIcon />
                          <div className='line'></div>
                        </div>
                        <div className='text-center'>
                          <small className='connection'>
                            {ticket.itineraries[1].segments.length} connection
                          </small>
                        </div>
                      </div>
                      <div xs={3} className='w-25 text-right'>
                        <p>
                          {
                            ticket.itineraries[1].segments[
                              ticket.itineraries[1].segments.length - 1
                            ].arrival.iataCode
                          }
                        </p>
                        <h4>
                          {Moment(
                            ticket.itineraries[1].segments[
                              ticket.itineraries[1].segments.length - 1
                            ].arrival.at
                          ).format("HH:mm")}
                        </h4>
                      </div>
                    </Row>
                  </Col>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
          <div className='d-flex justify-content-end mt-2'>
            <Button
              variant='info'
              onClick={() => {
                makeTicketBooking()
                setLoader(true)
              }}
              className='d-flex align-items-center'>
              <span className='mr-2 font-weight-bold'>
                Confirm details to Continue
              </span>
              <FlightTakeoffSharpIcon />
            </Button>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  )
}

export default PassengerDetails
