/** @format */

import React, { useState } from "react"
import "../style/PaymentPage.css"
import { Button, Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import Footer from "../components/Footer"
import MyNavbar from "../components/MyNavbar"
import StepComponent from "../components/StepComponent"
import SummeryContainer from "../components/SummeryContainer"
import StripeContainer from "../components/StripeContainer"
import ConnectingAirportsOutlinedIcon from "@mui/icons-material/ConnectingAirportsOutlined"
import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp"
import { Col, Row } from "react-bootstrap"
import Moment from "moment"

const PaymentPage = () => {
  const bookedTicket = useSelector(
    (state) => state.bookedTicketReducer.bookedTicket
  )
  //console.log(bookedTicket.data.flightOffers[0].price.total)

  const [showItem, setShowItem] = useState(false)
  const [payment, setPayment] = useState(false)

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
  return (
    <>
      <MyNavbar />
      <Container>
        <SummeryContainer />
        <StepComponent
          ticketSelect={true}
          passenger={true}
          option={true}
          payment={payment}
        />
        <div className='col-12 d-flex py-3 payment-page-main'>
          <div
            className={
              showItem ? "d-none" : "col-6 col-xs-6 col-md-8 bg-light py-3"
            }
            style={{ height: "auto" }}>
            <div>
              <div className='px-1 passenger-flight-list-header1 py-1'>
                {" "}
                <h5 className='ml-2'>Passengers</h5>
              </div>

              {bookedTicket.data.travelers.map((traveler, i) => (
                <div key={i} className='px-1 pt-1 border-bottom'>
                  <h6>
                    <span>{traveler.id}. </span>
                    <span>{traveler.gender === "MALE" ? "Mr" : "Mrs"} </span>
                    <span>{traveler.name.firstName} </span>
                    <span>{traveler.name.lastName}</span>
                  </h6>
                </div>
              ))}
            </div>

            <div>
              <div>
                {bookedTicket.data.flightOffers[0] ? (
                  <>
                    <div className='d-flex justify-content-center mt-2 passenger-flight-list-header1 py-2'>
                      <FlightTakeoffSharpIcon />
                      <h6 className='mb-0 mx-2'>Outbound,</h6>
                    </div>

                    <Col xs={12} className='bg-light text-dark'>
                      <Row className='d-flex justify-content-between align-items-center section01 pt-1 pb-3'>
                        <div className='pl-3'>
                          <small className='font-weight-bold'>
                            {bookedTicket.data.flightOffers[0].id}
                            <span> </span>
                          </small>
                          <small>
                            {Moment(
                              bookedTicket.data.flightOffers[0].itineraries[0]
                                .segments[0].departure.at
                            ).format("MMM Do YY")}{" "}
                          </small>
                        </div>
                        <div className='d-flex align-items-center'>
                          {bookedTicket.data.flightOffers[0].itineraries[0].segments.map(
                            (segment, i) => (
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
                            )
                          )}
                        </div>
                      </Row>
                      <Row
                        xs={12}
                        className='d-flex justify-content-between align-items-center px-3 mt-4 pb-3'>
                        <div xs={3} className='w-25'>
                          <p>
                            {
                              bookedTicket.data.flightOffers[0].itineraries[0]
                                .segments[0].departure.iataCode
                            }
                          </p>
                          <h4>
                            {Moment(
                              bookedTicket.data.flightOffers[0].itineraries[0]
                                .segments[0].departure.at
                            ).format("HH:mm")}
                          </h4>
                        </div>
                        <div xs={6} className='w-50'>
                          <div className='text-center'>
                            {/* <small>
                              {getTime(
                                bookedTicket.data.flightOffers[0].itineraries[0]
                                  .segments[0].duration
                              )}
                            </small> */}
                          </div>
                          <div className='d-flex justify-content-center align-items-center'>
                            <div className='line'></div>
                            <ConnectingAirportsOutlinedIcon />
                            <div className='line'></div>
                          </div>
                          <div className='text-center'>
                            <small className='connection'>
                              {
                                bookedTicket.data.flightOffers[0].itineraries[0]
                                  .segments.length
                              }{" "}
                              connection
                            </small>
                          </div>
                        </div>
                        <div xs={3} className='w-25 text-right'>
                          <p>
                            {
                              bookedTicket.data.flightOffers[0].itineraries[0]
                                .segments[
                                bookedTicket.data.flightOffers[0].itineraries[0]
                                  .segments.length - 1
                              ].arrival.iataCode
                            }
                          </p>
                          <h4>
                            {Moment(
                              bookedTicket.data.flightOffers[0].itineraries[0]
                                .segments[
                                bookedTicket.data.flightOffers[0].itineraries[0]
                                  .segments.length - 1
                              ].arrival.at
                            ).format("HH:mm")}
                          </h4>
                        </div>
                      </Row>
                    </Col>
                    {bookedTicket.data.flightOffers[0].itineraries[1] ? (
                      <>
                        <div className='d-flex justify-content-center mt-2 passenger-flight-list-header1 py-2'>
                          <FlightTakeoffSharpIcon />
                          <h6 className='mb-0 mx-2'>Intbound,</h6>
                        </div>
                        <Col xs={12} className='bg-light text-dark'>
                          <Row className='d-flex justify-content-between align-items-center section01 pt-1 pb-3'>
                            <div className='pl-3'>
                              <small className='font-weight-bold'>
                                {bookedTicket.data.flightOffers[0].id}
                                <span> </span>
                              </small>
                              <small>
                                {Moment(
                                  bookedTicket.data.flightOffers[0]
                                    .itineraries[1].segments[0].departure.at
                                ).format("MMM Do YY")}{" "}
                              </small>
                            </div>
                            <div className='d-flex align-items-center'>
                              {bookedTicket.data.flightOffers[0].itineraries[1].segments.map(
                                (segment, i) => (
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
                                )
                              )}
                            </div>
                          </Row>
                          <Row
                            xs={12}
                            className='d-flex justify-content-between align-items-center px-3 mt-4 pb-3'>
                            <div xs={3} className='w-25'>
                              <p>
                                {
                                  bookedTicket.data.flightOffers[0]
                                    .itineraries[1].segments[0].departure
                                    .iataCode
                                }
                              </p>
                              <h4>
                                {Moment(
                                  bookedTicket.data.flightOffers[0]
                                    .itineraries[1].segments[0].departure.at
                                ).format("HH:mm")}
                              </h4>
                            </div>
                            <div xs={6} className='w-50'>
                              <div className='text-center'>
                                <small>
                                  {/* {getTime(
                                    bookedTicket.data.flightOffers[0]
                                      .itineraries[1].duration
                                  )} */}
                                </small>
                              </div>
                              <div className='d-flex justify-content-center align-items-center'>
                                <div className='line'></div>
                                <ConnectingAirportsOutlinedIcon />
                                <div className='line'></div>
                              </div>
                              <div className='text-center'>
                                <small className='connection'>
                                  {
                                    bookedTicket.data.flightOffers[0]
                                      .itineraries[1].segments.length
                                  }{" "}
                                  connection
                                </small>
                              </div>
                            </div>
                            <div xs={3} className='w-25 text-right'>
                              <p>
                                {
                                  bookedTicket.data.flightOffers[0]
                                    .itineraries[1].segments[
                                    bookedTicket.data.flightOffers[0]
                                      .itineraries[1].segments.length - 1
                                  ].arrival.iataCode
                                }
                              </p>
                              <h4>
                                {Moment(
                                  bookedTicket.data.flightOffers[0]
                                    .itineraries[1].segments[
                                    bookedTicket.data.flightOffers[0]
                                      .itineraries[1].segments.length - 1
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
                  <div>No data</div>
                )}
                {/* <div className='d-flex justify-content-end mt-2'>
                  <Button
                    variant='danger'
                    onClick={() => {
                      makeTicketBooking()
                    }}
                    className='d-flex align-items-center'>
                    <span className='mr-2 font-weight-bold'>
                      Confirm details to Continue
                    </span>
                    <FlightTakeoffSharpIcon />
                  </Button>
                </div> */}
              </div>
            </div>
          </div>
          <div
            className={
              showItem
                ? "col-12 bg-light py-3"
                : "col-6 col-xs-6 col-md-4 bg-light py-3"
            }
            style={{ height: "auto" }}>
            {/* <h6>The Spatula Store</h6> */}
            {showItem ? (
              <div className='show-stripe-container'>
                <div className='col-12 col-md-6'>
                  <StripeContainer setPayment={setPayment} />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h3>
                    <span>
                      {bookedTicket.data.flightOffers[0].price.currency}
                    </span>
                    <span>
                      {" "}
                      {parseInt(bookedTicket.data.flightOffers[0].price.total)}
                    </span>
                  </h3>
                </div>
                <div>
                  <Button
                    className='m-auto btn-block'
                    onClick={() => setShowItem(true)}>
                    Purchase Ticket
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default PaymentPage
